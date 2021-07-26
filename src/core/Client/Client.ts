import Key from "../Key/Key";
import store from "redux/store";
import Message from "Classes/Message/Message";
import RelayHost from "Classes/Host/RelayHost";

export default class Client {
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
