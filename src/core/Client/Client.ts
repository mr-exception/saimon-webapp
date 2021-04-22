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
  constructor(private key: Key) {
    console.log(key.getPublicKey());
  }
  public onMessage$ = new Subject<Buffer>();
  private pending_packets: IPacket[] = [];
  /**
   * connect to host node
   */
  public async connect(server_url: string, packet_size: number) {
    const connection = new Connection(server_url, packet_size, this.key);
    connection.connect();
    // subscribe to connection state
    connection.subscribeToConnectionStatus((state) =>
      this.handleConnectionStates(connection, state)
    );
    // subscribe to reciecing packets
    connection.onPacketReceived((packet: IPacket) => {
      this.pending_packets.push(packet);
      this.checkPackets(packet.id, packet.count);
    });
    // subscribe to ttd informations
    connection.onPacketGot((ttd: IPacketTTD) => {
      console.log(`packet delivered in ${ttd.time}ms`);
    });
    connection.subscribeToClientStateChange((state: IClientState) => {
      console.log(state);
    });
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
      const message = packets
        .map((packet) => {
          return this.key.decryptPrivate(packet.payload);
        })
        .reduce((prev, cur) => Buffer.concat([prev, cur]));

      this.pending_packets = this.pending_packets.filter((packet) =>
        packet.id === id ? null : packet
      );
      this.onMessage$.next(message);
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
}
