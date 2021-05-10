import Key from "../Key/Key";
import store from "redux/store";
import { IPacket, PacketSendStatus } from "core/Connection/def";
import Message from "Classes/Message/Message";
import {
  storeDeliveringPacketStatus,
  storeIncomingPacket,
} from "redux/actions/client";

export default class Client {
  public static updateDeliverPendingPacket(
    id: string,
    position: number,
    count: number,
    status: PacketSendStatus
  ) {
    store.dispatch(storeDeliveringPacketStatus(id, position, status, count));
  }
  public static packetReceived(packet: IPacket) {
    store.dispatch(storeIncomingPacket(packet));
  }
  /**
   * send message to a client node
   */
  public static sendMessage(message: Message, address: Key) {
    const hosts = store.getState().hosts;
    if (hosts.length > 0) {
      hosts[0].sendMessageToClient(message, address);
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
