import Contact from "Classes/Contact/Contact";
import AdvertisorHost from "Classes/Host/AdvertisorHost";
import { storeConnectionState } from "redux/actions/client";
import { updateContact } from "redux/actions/contacts";
import store from "redux/store";
let interval: NodeJS.Timeout;

const handleHeartBeat = async (host: AdvertisorHost) => {
  const { contacts, advertiser_queue } = store.getState();
  const result = await host.isLive();
  if (result) {
    store.dispatch(storeConnectionState(host.id, "CONNECTED"));
    contacts.forEach((contact) => {
      advertiser_queue.push({
        type: "FETCH",
        host,
        contact,
      });
    });
  } else {
    store.dispatch(storeConnectionState(host.id, "NETWORK_ERROR"));
  }
};
const handleFetchProfile = async (host: AdvertisorHost, contact: Contact) => {
  try {
    const result = await host.fetchClient(contact.key.getPublicKeyNormalized());
    contact.first_name = result.client.first_name;
    contact.last_name = result.client.last_name;
    await contact.update();
    store.dispatch(updateContact(contact));
  } catch (error) {
    console.log(error);
  }
};

export const start = () => {
  const queue = store.getState().advertiser_queue;
  interval = setInterval(async () => {
    const job = queue.pull();
    if (!job) {
      return;
    }
    if (job.type === "HEART_BEAT") {
      await handleHeartBeat(job.host);
      queue.push(job);
    }
    if (job.type === "FETCH" && !!job.contact) {
      await handleFetchProfile(job.host, job.contact);
      queue.push(job);
    }
  }, 2500);
};
export const finish = () => {
  clearInterval(interval);
};
