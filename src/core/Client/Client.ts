import Key from "../Key/Key";
import store from "redux/store";
import { IPacket } from "core/Connection/def";
import Message from "Classes/Message/Message";
import RelayHost from "Classes/Host/RelayHost";
import { checkIncomingMessage } from "./incoming_packets";
// import { checkDeliveringMessageState } from "./delivering_packets";

export default class Client {
  private _recieving_packets: IPacket[] = [];
  /**
   * updates the status of delivering packets
   * whos is pending to be delivered
   */
  // public updateDeliverPendingPacket(
  //   id: string,
  //   position: number,
  //   count: number,
  //   status: PacketSendStatus
  // ) {
  //   // check if the delivering packet belongs to any message state
  //   // if true, appends the packet state to message state
  //   // otherwise creates a new message state and appends the packet
  //   // to it
  //   let delivering_state = this._delivering_packets_status.find(
  //     (record) => record.id === id
  //   );
  //   if (!delivering_state) {
  //     delivering_state = {
  //       id,
  //       count,
  //       packets: [{ position, status }],
  //     };
  //     const result = checkDeliveringMessageState(delivering_state);
  //     // if result = false, then all packets send results are not
  //     // received. so we push the state to delivering packets status
  //     // and wait for other packets result to be recevied
  //     if (!result) {
  //       this._delivering_packets_status.push(delivering_state);
  //     }
  //   } else {
  //     delivering_state.packets.push({ position, status });
  //     const result = checkDeliveringMessageState(delivering_state);
  //     // if result = true, then the message status is approved and we
  //     // won't receive any packet status from hosts
  //     if (result) {
  //       this._delivering_packets_status =
  //         this._delivering_packets_status.filter((record) => {
  //           if (!delivering_state) return record;
  //           if (delivering_state.id === record.id) return null;
  //           return record;
  //         });
  //     }
  //   }
  // }
  /**
   * listens to any packet is received
   */
  public async packetReceived(packet: IPacket) {
    // check if packet belongs to any incoming message, append it to that
    // message, otherwise creates a new incoming message and appends it
    // to the new message
    this._recieving_packets.push(packet);
    await checkIncomingMessage(packet.id);
  }
  public getReceivingPacketsById(id: string) {
    return this._recieving_packets.filter((record) => record.id === id);
  }
  public removeReservedPacketsById(id: string) {
    this._recieving_packets = this._recieving_packets.filter(
      (record) => record.id !== id
    );
  }
  /**
   * send message to a client node
   */
  public sendMessage(message: Message, address: Key) {
    const hosts = store.getState().hosts;
    const relay_hosts = hosts
      .filter((host) => (host.type === "RELAY" ? host : null))
      .map((host) => host as RelayHost);
    if (relay_hosts.length > 0) {
      relay_hosts[0].sendMessageToClient(message, address);
    }
  }
}
