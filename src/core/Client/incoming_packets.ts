import Contact from "Classes/Contact/Contact";
import Host from "Classes/Host/Host";
import Message, { IMessageContent } from "Classes/Message/Message";
import { IReportMessage } from "Classes/Queue/def";
import Key from "core/Key/Key";
import { addContact } from "redux/actions/contacts";
import { addMessage } from "redux/actions/conversations";
import { addHost } from "redux/actions/hosts";
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
  const { app_key, client, hosts } = store.getState();
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
  const contentObject = JSON.parse(content) as IMessageContent;
  if (contentObject.type === "REPORT") {
    const report = JSON.parse(
      JSON.stringify(contentObject.payload)
    ) as IReportMessage;
    report.hosts.forEach(async (host_record) => {
      let host = hosts.find((record) => record.address === host_record.address);
      if (!host) {
        host = new Host(
          {
            id: 0,
            address: host_record.address,
            advertise_period: host_record.ad_price,
            type: host_record.type,
            protocol: host_record.protocol,
            name: host_record.name,
            score: host_record.score,
            disabled: true,
          },
          app_key
        );
        console.log("added new host based on reports");
        await host.store();
        store.dispatch(addHost(host));
      }
      switch (host.type) {
        case "RELAY":
          if (!contact.relay_host_ids.includes(host.id)) {
            contact.relay_host_ids.push(host.id);
            await contact.update();
          }
          break;
        case "ADVERTISER":
          if (!contact.advertiser_host_ids.includes(host.id)) {
            contact.advertiser_host_ids.push(host.id);
            await contact.update();
          }
          break;
      }
    });
    return true;
  }
  const message = new Message({
    id: 0,
    network_id: packets[0].id,
    contact_id: contact.id,
    public_key: contact.public_key,
    box_type: "RECEIVED",
    status: "DELIVERED",
    date: Date.now(),
    content: content,
    packets: "[]",
  });
  client.removeReservedPacketsById(id);
  message.store();
  store.dispatch(addMessage(message));
  return true;
};
