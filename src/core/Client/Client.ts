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
