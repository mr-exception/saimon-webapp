import { Subject } from "rxjs";
import Connection from "../Connection/Connection";
import {
  ConnectionStatus,
  IClientState,
  IClientStateInConnection,
  IPacket,
  IPacketTTD,
} from "../Connection/def";
import Key from "../Key/Key";

export default class Client {
  private _connections: Connection[] = [];
  public onConnectionStates$ = new Subject<{
    address: string;
    connection_id: string;
    state: ConnectionStatus;
  }>();
  private _clients_state: IClientStateInConnection[] = [];
  constructor(private key: Key) {}
  public onMessage$ = new Subject<{ address: string; content: Buffer }>();
  private pending_packets: IPacket[] = [];
  /**
   * connect to host node
   */
  public async connect(server_url: string, packet_size: number) {
    const connection = new Connection(server_url, packet_size, this.key, this);
    try {
      await connection.connect();
      this.handleConnectionStates(connection, "CONNECTED");

      // subscribe to connection state
      connection.subscribeToConnectionStatus((state) => {
        this.handleConnectionStates(connection, state);
      });
      // subscribe to ttd informations
      connection.onPacketGot((ttd: IPacketTTD) => {
        console.log(`packet delivered in ${ttd.time}ms`);
      });
    } catch (error) {
      this.handleConnectionStates(connection, "NETWORK_ERROR");
    }
    return connection;
  }
  public async disconnectByConnectionId(connection_id: string) {
    this._connections.forEach((cnn) => {
      if (cnn.getId() === connection_id) {
        cnn.emitDisconnect();
      }
    });
  }
  public packetReceived(packet: IPacket) {
    this.pending_packets.push(packet);
    this.checkPackets(packet.id, packet.count);
  }
  /**
   * send message to a client node
   */
  public sendMessage(data: Buffer, address: Key) {
    this._connections.forEach((connection) => {
      connection.sendMessageToClient(data, address);
    });
  }
  /**
   * checks if a message is received
   */
  private checkPackets(id: string, count: number) {
    const packets = this.pending_packets
      .filter((packet) => {
        if (packet.id !== id) return null;
        return packet;
      })
      .sort((pa, pb) => pa.position - pb.position);
    if (packets.length === count) {
      const source_key = Key.generateKeyByPublicKey(packets[0].src);
      const message = packets
        .map((packet) => {
          return source_key.decryptPublic(
            this.key.decryptPrivate(packet.payload).toString()
          );
        })
        .reduce((prev, cur) => Buffer.concat([prev, cur]));
      this.pending_packets = this.pending_packets.filter((packet) =>
        packet.id === id ? null : packet
      );
      this.onMessage$.next({
        content: message,
        address: source_key.getPublicKeyNormalized(),
      });
    }
  }
  /**
   * handle connection states
   */
  public handleConnectionStates(
    connection: Connection,
    state: ConnectionStatus
  ) {
    if (state === "CONNECTED") {
      this._connections.push(connection);
      console.log("connected to " + connection.getAddress());
    }
    if (state === "DISCONNECTED") {
      this.removeConnection(connection);
      console.log("disconnected");
    }
    this.onConnectionStates$.next({
      address: connection.getAddress(),
      connection_id: connection.getId(),
      state,
    });
  }
  /**
   * removes a connection from connection list
   */
  private removeConnection(connection: Connection) {
    connection.close();
    this._connections = this._connections.filter((cnn) =>
      cnn.getId() === connection.getId() ? null : cnn
    );
  }
  /**
   * gets clients connection states from all connections
   */
  public async getClientStates(
    client_addreses: string[]
  ): Promise<IClientStateInConnection[]> {
    const results = await Promise.all(
      this._connections.map(async (connection) => {
        try {
          const result = await connection.getClientsState(client_addreses);
          return result.map((res: IClientState) => ({
            ...res,
            connection_id: connection.getId(),
          }));
        } catch (error) {
          return [];
        }
      })
    );
    const states: IClientStateInConnection[] = results.flat();
    return states;
  }
  /**
   * subscribes to a list of addresses
   */
  public async subscribeToClientState(client_addresses: string[]) {
    await Promise.all(
      this._connections.map((connection) =>
        connection.subscribeToClientsState(client_addresses)
      )
    );
  }
  /**
   * unsubscribes to a list of addresses
   */
  public async unsubscribeToClientState(client_addresses: string[]) {
    await Promise.all(
      this._connections.map((connection) =>
        connection.unsubscribeToClientsState(client_addresses)
      )
    );
  }
  /**
   * returns client public key
   */
  public getPublicKey(): string {
    return this.key.getPublicKey();
  }
  /**
   * returns address
   */
  public getAddress(): string {
    return Key.normalizeKey(this.key.getPublicKey());
  }
  public getClientState(
    connection_id: string,
    address: string
  ): IClientStateInConnection | undefined {
    return this._clients_state.find(
      (client_state) =>
        connection_id === client_state.connection_id &&
        address === client_state.address
    );
  }
  public updateClientState(state: IClientStateInConnection) {
    const found = this.getClientState(state.connection_id, state.address);
    if (!found) {
      this._clients_state.push(state);
      return;
    }
    this._clients_state = this._clients_state.map((client_state) => {
      if (client_state.connection_id !== state.connection_id) {
        return client_state;
      }
      if (client_state.address !== state.address) {
        return client_state;
      }
      return state;
    });
  }
}
