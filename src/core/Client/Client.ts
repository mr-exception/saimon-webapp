import Key from "../Key/Key";
import store from "redux/store";
import { IPacket, PacketSendStatus } from "core/Connection/def";
import Message, {
  IIncomingMessagePackets,
  IDeliveringMessageState,
} from "Classes/Message/Message";
import RelayHost from "Classes/Host/RelayHost";
import { checkIncomingMessage } from "./incoming_packets";
import { checkDeliveringMessageState } from "./delivering_packets";

export default class Client {
  private static _recieving_messages: IIncomingMessagePackets[] = [];
  private static _delivering_packets_status: IDeliveringMessageState[] = [];
  /**
   * updates the status of delivering packets
   * whos is pending to be delivered
   */
  public static updateDeliverPendingPacket(
    id: string,
    position: number,
    count: number,
    status: PacketSendStatus
  ) {
    // check if the delivering packet belongs to any message state
    // if true, appends the packet state to message state
    // otherwise creates a new message state and appends the packet
    // to it
    let delivering_state = this._delivering_packets_status.find(
      (record) => record.id === id
    );
    if (!delivering_state) {
      delivering_state = {
        id,
        count,
        packets: [{ position, status }],
      };
      const result = checkDeliveringMessageState(delivering_state);
      // if result = false, then all packets send results are not
      // received. so we push the state to delivering packets status
      // and wait for other packets result to be recevied
      if (!result) {
        this._delivering_packets_status.push(delivering_state);
      }
    } else {
      delivering_state.packets.push({ position, status });
      const result = checkDeliveringMessageState(delivering_state);
      // if result = true, then the message status is approved and we
      // won't receive any packet status from hosts
      if (result) {
        this._delivering_packets_status =
          this._delivering_packets_status.filter((record) => {
            if (!delivering_state) return record;
            if (delivering_state.id === record.id) return null;
            return record;
          });
      }
    }
  }
  /**
   * listens to any packet is received
   */
  public static async packetReceived(packet: IPacket) {
    // check if packet belongs to any incoming message, append it to that
    // message, otherwise creates a new incoming message and appends it
    // to the new message
    let incoming_message = this._recieving_messages.find(
      (record) => packet.id === record.id
    );
    if (!incoming_message) {
      incoming_message = {
        id: packet.id,
        count: packet.count,
        address: Key.normalizeKey(packet.src),
        packets: [packet],
      };
      // checks if message is completely received, if true, stores the message
      // and prevents from pushing it to the receiving list (it was a single packet message)
      const result = await checkIncomingMessage(incoming_message);
      if (!result) {
        this._recieving_messages.push(incoming_message);
      }
    } else {
      // pushes the packet into found receiving message
      incoming_message.packets.push(packet);
      const result = await checkIncomingMessage(incoming_message);
      if (result) {
        this._recieving_messages = this._recieving_messages.filter((record) => {
          if (!incoming_message) return record;
          if (incoming_message.id === record.id) return null;
          return record;
        });
      }
    }
  }
  /**
   * send message to a client node
   */
  public static sendMessage(message: Message, address: Key) {
    const hosts = store.getState().hosts;
    const relay_hosts = hosts
      .filter((host) => (host.type === "RELAY" ? host : null))
      .map((host) => host as RelayHost);
    if (relay_hosts.length > 0) {
      relay_hosts[0].sendMessageToClient(message, address);
    }
  }
  // /**
  //  * handle connection states
  //  */
  // public handleConnectionStates(
  //   connection: Connection,
  //   state: ConnectionStatus
  // ) {
  //   if (state === "CONNECTED") {
  //     this._connections.push(connection);
  //     console.log("connected to " + connection.getAddress());
  //   }
  //   if (state === "DISCONNECTED") {
  //     this.removeConnection(connection);
  //     console.log("disconnected");
  //   }
  //   this.onConnectionStates$.next({
  //     address: connection.getAddress(),
  //     connection_id: connection.getId(),
  //     state,
  //   });
  // }
  // /**
  //  * removes a connection from connection list
  //  */
  // private removeConnection(connection: Connection) {
  //   connection.close();
  //   this._connections = this._connections.filter((cnn) =>
  //     cnn.getId() === connection.getId() ? null : cnn
  //   );
  // }
  // /**
  //  * gets clients connection states from all connections
  //  */
  // public async getClientStates(
  //   client_addreses: string[]
  // ): Promise<IClientStateInConnection[]> {
  //   const results = await Promise.all(
  //     this._connections.map(async (connection) => {
  //       try {
  //         const result = await connection.getClientsState(client_addreses);
  //         return result.map((res: IClientState) => ({
  //           ...res,
  //           connection_id: connection.getId(),
  //         }));
  //       } catch (error) {
  //         return [];
  //       }
  //     })
  //   );
  //   const states: IClientStateInConnection[] = results.flat();
  //   return states;
  // }
  // /**
  //  * subscribes to a list of addresses
  //  */
  // public async subscribeToClientState(client_addresses: string[]) {
  //   await Promise.all(
  //     this._connections.map((connection) =>
  //       connection.subscribeToClientsState(client_addresses)
  //     )
  //   );
  // }
  // /**
  //  * unsubscribes to a list of addresses
  //  */
  // public async unsubscribeToClientState(client_addresses: string[]) {
  //   await Promise.all(
  //     this._connections.map((connection) =>
  //       connection.unsubscribeToClientsState(client_addresses)
  //     )
  //   );
  // }
  // /**
  //  * returns client public key
  //  */
  // public getPublicKey(): string {
  //   return this.key.getPublicKey();
  // }
  // /**
  //  * returns address
  //  */
  // public getAddress(): string {
  //   return Key.normalizeKey(this.key.getPublicKey());
  // }
  // public getClientState(
  //   connection_id: string,
  //   address: string
  // ): IClientStateInConnection | undefined {
  //   return this._clients_state.find(
  //     (client_state) =>
  //       connection_id === client_state.connection_id &&
  //       address === client_state.address
  //   );
  // }
  // public updateClientState(state: IClientStateInConnection) {
  //   const found = this.getClientState(state.connection_id, state.address);
  //   if (!found) {
  //     this._clients_state.push(state);
  //     return;
  //   }
  //   this._clients_state = this._clients_state.map((client_state) => {
  //     if (client_state.connection_id !== state.connection_id) {
  //       return client_state;
  //     }
  //     if (client_state.address !== state.address) {
  //       return client_state;
  //     }
  //     return state;
  //   });
  // }
}
