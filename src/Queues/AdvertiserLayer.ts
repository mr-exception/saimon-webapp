import { AxiosError } from "axios";
import AdvertisorHost from "Classes/Host/AdvertisorHost";
import { storeConnectionState } from "redux/actions/client";
import store from "redux/store";
let interval: NodeJS.Timeout;

const handleHeartBeat = async (hostId: number) => {
  const { contacts, advertiser_queue } = store.getState();
  const host = store
    .getState()
    .hosts.find((host) => host.id === hostId) as AdvertisorHost;
  if (!host) {
    console.log("host not found");
    return;
  }
  const result = await host.isLive();
  if (result) {
    store.dispatch(storeConnectionState(host.id, "CONNECTED"));
    contacts.forEach((contact) => {
      advertiser_queue.push({
        type: "FETCH",
        host_id: hostId,
        address: contact.key.getPublicKeyNormalized(),
      });
    });
  } else {
    store.dispatch(storeConnectionState(host.id, "NETWORK_ERROR"));
  }
};
const handleFetchProfile = async (hostId: number, address: string) => {
  const host = store
    .getState()
    .hosts.find((host) => host.id === hostId) as AdvertisorHost;
  if (!host) return;

  const contact = store
    .getState()
    .contacts.find(
      (contact) => contact.key.getPublicKeyNormalized() === address
    );
  if (!contact) return;
  const result = await host.fetchClient(address);
  if (result) {
    console.log(result);
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
      await handleHeartBeat(job.host_id);
      queue.push(job);
    }
    if (job.type === "FETCH" && !!job.address) {
      await handleFetchProfile(job.host_id, job.address);
      queue.push(job);
    }
  }, 2500);
};
export const finish = () => {
  clearInterval(interval);
};
