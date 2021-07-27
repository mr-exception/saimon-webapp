import Key from "../Key/Key";
import store from "redux/store";
import Message from "Classes/Message/Message";

export default class Client {
  /**
   * send message to a client node
   */
  public sendMessage(message: Message, address: Key) {
    const { sending_zeus, contacts } = store.getState();
    const contact = contacts.find((record) => record.id === message.contact_id);

    if (!contact) return;

    const host_ids = contact.relay_host_ids;

    // sends message content, address and avialable host ids to worker
    sending_zeus.postMessage({
      content: message.content,
      address: address.getPublicKey(),
      host_ids,
    });

    // const relay_hosts = hosts
    //   .filter((host) => (host.type === "RELAY" ? host : null))
    //   .map((host) => host as RelayHost);
    // if (relay_hosts.length > 0) {
    //   relay_hosts[0].sendMessageToClient(message, address);
    // }
  }
}
