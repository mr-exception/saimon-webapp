import Key from "../Key/Key";
import store from "Redux/store";
import Message from "Classes/Message/Message";

export default class Client {
  /**
   * send message to a client node
   */
  public sendMessage(message: Message, address: Key) {
    const { worker, contacts } = store.getState();
    const contact = contacts.find((record) => record.id === message.contact_id);

    if (!contact) return;

    const host_ids = contact.relay_host_ids;

    // sends message content, address and avialable host ids to worker
    worker.emit("packets.send", {
      content: message.content,
      address: address.getPublicKey(),
      host_ids,
    });
  }
}
