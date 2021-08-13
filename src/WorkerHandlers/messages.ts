import Contact from "Classes/Contact/Contact";
import Key from "Classes/Key/Key";
import store from "Redux/store";
import { addContact } from "Redux/actions/contacts";
import Message, { IMessageContent } from "Classes/Message/Message";
import { IReportMessage } from "Classes/Queue/def";
import { addHost } from "Redux/actions/hosts";
import Host from "Classes/Host/Host";
import { addMessage } from "Redux/actions/conversations";

const calculateHostIds = (currentIds: number[], newIds: number[]): number[] => {
  const results: number[] = [];

  currentIds.forEach((id) => {
    if (!results.includes(id)) {
      results.push(id);
    }
  });
  newIds.forEach((id) => {
    if (!results.includes(id)) {
      results.push(id);
    }
  });

  return results;
};
/**
 * checks if there is any contact with this address in the storage and store
 * if it does not exists then we create a new unknown contact with the
 * given address
 * if it exists then we return the found contact
 */
const checkForContact = async (
  address: string,
  host_ids: number[]
): Promise<Contact> => {
  const { contacts } = store.getState();
  let contact = contacts.find((contact) => contact.getAddress() === address);
  if (!contact) {
    contact = new Contact({
      id: 0,
      first_name: "unknown",
      last_name: "unknown",
      public_key: Key.normalizeKey(address),
      advertiser_host_ids: [],
      relay_host_ids: calculateHostIds([], host_ids),
    });
    await contact.store();
    store.dispatch(addContact(contact));
  } else {
    contact.relay_host_ids = calculateHostIds(contact.relay_host_ids, host_ids);
    contact.update();
  }
  return contact;
};

export default function handle() {
  const { worker } = store.getState();
  worker
    .on<{
      address: string;
      content: IMessageContent;
      id: string;
      host_ids: number[];
    }>("messages.receive")
    .subscribe({
      next: async ({ address, content, id, host_ids }) => {
        const { hosts, app_key } = store.getState();
        if (!app_key) return;
        const contact = await checkForContact(address, host_ids);
        if (content.type === "REPORT") {
          const report = JSON.parse(
            JSON.stringify(content.payload)
          ) as IReportMessage;
          report.hosts.forEach(async (host_record) => {
            let host = hosts.find(
              (record) => record.address === host_record.address
            );
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
          network_id: id,
          contact_id: contact.id,
          public_key: contact.public_key,
          box_type: "RECEIVED",
          status: "DELIVERED",
          date: Date.now(),
          content: JSON.stringify(content),
          packets: "[]",
        });
        message.store();
        store.dispatch(addMessage(message));
        // send the notification
        Notification.requestPermission(async (status) => {
          console.debug(`notification permission status: `, status);
          if (status === "granted") {
            try {
              const reg = await navigator.serviceWorker.getRegistration();
              if (!reg) throw new Error("not registered");
              switch (content.type) {
                case "TEXT":
                  reg.showNotification(contact.name, {
                    body: content.payload,
                    icon: "/logo192.png",
                    badge: "/logo192.png",
                  });
                  break;
                case "FILE":
                  reg.showNotification(contact.name, {
                    body: "file",
                    icon: "/logo192.png",
                    badge: "/logo192.png",
                  });
                  break;
                case "IMAGE":
                  reg.showNotification(contact.name, {
                    body: "image",
                    icon: "/logo192.png",
                    badge: "/logo192.png",
                  });
                  break;
                case "MOVIE":
                  reg.showNotification(contact.name, {
                    body: "movie",
                    icon: "/logo192.png",
                    badge: "/logo192.png",
                  });
                  break;
                case "AUDIO":
                  reg.showNotification(contact.name, {
                    body: "audio",
                    icon: "/logo192.png",
                    badge: "/logo192.png",
                  });
                  break;
              }
            } catch (error) {
              console.error(error);
            }
          }
        });
      },
    });
}
