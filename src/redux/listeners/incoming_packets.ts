import Contact from "Classes/Contact/Contact";
import Message, { IIncomingMessagePackets } from "Classes/Message/Message";
import Key from "core/Key/Key";
import { resetIncomingPackets } from "redux/actions/client";
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
  let contact = contacts.find((contact) => contact.public_key === address);
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
const checkIncomingMessage = async (
  incoming_packet_list: IIncomingMessagePackets
): Promise<boolean> => {
  const { app_key, storage } = store.getState();
  if (!app_key) {
    return false;
  }
  if (incoming_packet_list.packets.length === incoming_packet_list.count) {
    const contact = await checkForContact(incoming_packet_list.address);

    const source_key = contact.key;
    const content = incoming_packet_list.packets
      .map((packet) => {
        return source_key.decryptPublic(
          app_key.decryptPrivate(packet.payload).toString()
        );
      })
      .reduce((prev, cur) => Buffer.concat([prev, cur]));
    const message = new Message({
      id: 0,
      network_id: incoming_packet_list.id,
      contact_id: contact.id,
      public_key: contact.public_key,
      box_type: "RECEIVED",
      status: "DELIVERED",
      date: Date.now(),
      content,
    });
    message.store(storage);
    store.dispatch(addMessage(message));
    return true;
  }
  return false;
};

/**
 * checks if a message is received, first of all
 * gathers all packets and checks if there a
 * enough packet to create a message
 */
const handle = async (messages: IIncomingMessagePackets[]) => {
  const count = messages.length;
  messages = messages.filter(async (message) => {
    const result = await checkIncomingMessage(message);
    return result ? null : message;
  });
  if (count !== messages.length) store.dispatch(resetIncomingPackets(messages));
};
export default handle;
