import Key from "../Key/Key";
import store from "redux/store";
import { IDeliverPacketStatus, IPacket, SendStatus } from "core/Connection/def";
import { addMessage, updateMessage } from "redux/actions/conversations";
import { v4 as uuidV4 } from "uuid";
import Message from "Classes/Message/Message";
import Contact from "Classes/Contact/Contact";

export default class Client {
  private static income_pending_packets: IPacket[] = [];
  private static devlier_pending_packets: IDeliverPacketStatus[] = [];

  public static updateDeliverPendingPacket(
    id: string,
    position: number,
    count: number,
    status: SendStatus
  ) {
    let found = false;
    this.devlier_pending_packets = this.devlier_pending_packets.map(
      (packet) => {
        if (packet.id === id && packet.position === position) {
          packet.status = status;
        }
        found = true;
        return packet;
      }
    );
    if (!found) {
      this.devlier_pending_packets.push({ id, position, status });
    }
    this.checkDeliverStatus(id, count);
  }
  private static checkDeliverStatus(id: string, count: number) {
    const packet_status = this.devlier_pending_packets.filter(
      (status) => status.id === id
    );
    if (packet_status.length !== count) {
      // we need all packet status to decide what happend to message
      return;
    }
    // get message from state
    const messages = store.getState().selected_conversation_messages;
    const message = messages.find((m) => m.network_id === id);
    if (!message) {
      throw new Error("message entity not found");
    }
    let hasDelivered = false;
    let hasError = false;
    let hasReserved = false;
    packet_status.forEach((status) => {
      switch (status.status) {
        case "DELIVERED":
          hasDelivered = true;
          break;
        case "FAILED":
          hasError = true;
          break;
        case "RESERVED":
          hasReserved = true;
          break;
      }
    });
    if (hasError) {
      store.dispatch(updateMessage(message.id, "FAILED"));
      return;
    }
    if (hasReserved) {
      store.dispatch(updateMessage(message.id, "SENT"));
      return;
    }
    if (hasDelivered) {
      store.dispatch(updateMessage(message.id, "DELIVERED"));
      return;
    }
  }
  // public async disconnectByConnectionId(connection_id: number) {
  //   this.hosts.forEach((host) => {
  //     if (host.id === connection_id) {
  //       // host.emitDisconnect();
  //     }
  //   });
  // }
  public static packetReceived(packet: IPacket) {
    this.income_pending_packets.push(packet);
    this.checkPackets(packet.id, packet.count);
  }
  // /**
  //  * send message to a client node
  //  */
  public static sendMessage(message: Message, address: Key) {
    const hosts = store.getState().hosts;
    if (hosts.length > 0) {
      hosts[0].sendMessageToClient(message, address);
    }
  }
  /**
   * checks if a message is received
   */
  private static checkPackets(id: string, count: number) {
    const reduxState = store.getState();
    const key = reduxState.app_key;
    const contacts = reduxState.contacts;
    if (!key) {
      throw new Error("application key not provided");
    }
    const packets = this.income_pending_packets
      .filter((packet) => {
        if (packet.id !== id) return null;
        return packet;
      })
      .sort((pa, pb) => pa.position - pb.position);
    if (packets.length === count) {
      const source_key = Key.generateKeyByPublicKey(packets[0].src);
      const message_buffer = packets
        .map((packet) => {
          return source_key.decryptPublic(
            key.decryptPrivate(packet.payload).toString()
          );
        })
        .reduce((prev, cur) => Buffer.concat([prev, cur]));
      this.income_pending_packets = this.income_pending_packets.filter(
        (packet) => (packet.id === id ? null : packet)
      );

      // find contact
      let contact = contacts.find(
        (cnt) => cnt.public_key === source_key.getPublicKeyNormalized()
      );
      if (!contact) {
        contact = new Contact({
          first_name: "unknown",
          last_name: "unknow",
          public_key: source_key.getPublicKeyNormalized(),
          id: 0,
        });
        contact.store();
      }
      const message = new Message(
        {
          id: 0,
          network_id: uuidV4(),
          contact_id: contact.id,
          public_key: contact.public_key,
          content: message_buffer,
          box_type: "RECEIVED",
          date: Date.now(),
          status: "DELIVERED",
        },
        "DELIVERED"
      );
      store.dispatch(addMessage(message));
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
