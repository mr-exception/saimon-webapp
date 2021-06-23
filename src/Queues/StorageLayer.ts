import StorageHost from "Classes/Host/StorageHost";
import configs from "confg";
import { storeConnectionState } from "redux/actions/client";
import store from "redux/store";
let interval: NodeJS.Timeout;

const handleHeartBeat = async (host: StorageHost) => {
  const result = await host.isLive();
  if (result) {
    store.dispatch(storeConnectionState(host.id, "CONNECTED"));
  } else {
    store.dispatch(storeConnectionState(host.id, "NETWORK_ERROR"));
  }
};

// const handleFetchProfile = async (host: StorageHost, contact: Contact) => {
//   try {
//     const result = await host.fetchClient(contact.key.getPublicKeyNormalized());
//     contact.first_name = result.client.first_name;
//     contact.last_name = result.client.last_name;

//     const hostIsAdded =
//       contact.advertiser_host_ids.find((id) => id === host.id) !== undefined;
//     if (!hostIsAdded) {
//       contact.advertiser_host_ids.push(host.id);
//     }

//     await contact.update();
//     store.dispatch(updateContact(contact));
//   } catch (error) {
//     console.log(error);
//   }
// };

export const start = () => {
  const queue = store.getState().storage_queue;
  interval = setInterval(async () => {
    const job = queue.pull();
    if (!job) {
      return;
    }
    if (job.type === "HEART_BEAT") {
      await handleHeartBeat(job.host);
      queue.push(job);
    }
    // if (job.type === "FETCH" && !!job.contact) {
    //   await handleFetchProfile(job.host, job.contact);
    //   queue.push(job);
    // }
  }, configs.layer_intervals.storage_host);
};

export const finish = () => {
  clearInterval(interval);
};
