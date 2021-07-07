import Contact from "Classes/Contact/Contact";
import Message from "Classes/Message/Message";
import Key from "core/Key/Key";
import { addContact } from "redux/actions/contacts";
import { addMessage } from "redux/actions/conversations";
import store from "redux/store";

/**
 * checks if there is any contact with this address in the storage and store
 * if it does not exists then we create a new unknown contact with the
 * given address
 * if it exists then we return the found contact
 */
const checkForContact = async (address: string): Promise<Contact> => {
  const { contacts } = store.getState();
  let contact = contacts.find((contact) => contact.getAddress() === address);
  if (!contact) {
    contact = new Contact({
      id: 0,
      first_name: "unknown",
      last_name: "unknown",
      public_key: Key.normalizeKey(address),
      advertiser_host_ids: [],
      relay_host_ids: [],
    });
    await contact.store();
    store.dispatch(addContact(contact));
  }
  return contact;
};
/**
 * checks for an incoming message object in store. it all packets are recevied,
 * then creates a message object and puts in storage, then returns true
 * otherwise just returns false
 */
export const checkIncomingMessage = async (id: string): Promise<boolean> => {
  const { app_key, storage, client } = store.getState();
  if (!app_key) {
    return false;
  }
  const packets = client.getReceivingPacketsById(id);
  if (packets.length === 0) {
    return false;
  }
  const packets_actual_count = packets[0].count;
  if (packets_actual_count !== packets.length) {
    return false;
  }
  const contact = await checkForContact(packets[0].src);
  const source_key = contact.key;
  const buffer = packets
    .map((packet) => {
      return source_key.decryptPublic(
        app_key.decryptPrivate(packet.payload).toString()
      );
    })
    .reduce((prev, cur) => Buffer.concat([prev, cur]));

  const content = buffer.toString();
  const message = new Message({
    id: 0,
    network_id: packets[0].id,
    contact_id: contact.id,
    public_key: contact.public_key,
    box_type: "RECEIVED",
    status: "DELIVERED",
    date: Date.now(),
    content: content,
  });
  client.removeReservedPacketsById(id);
  message.store(storage);
  store.dispatch(addMessage(message));
  return true;
};
