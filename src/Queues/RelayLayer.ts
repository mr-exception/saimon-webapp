import RelayHost from "Classes/Host/RelayHost";
import configs from "confg";
import { storeConnectionState } from "redux/actions/client";
import store from "redux/store";
let interval: NodeJS.Timeout;

const handleHeartBeat = async (host: RelayHost) => {
  const result = await host.isLive();
  if (result) {
    store.dispatch(storeConnectionState(host.id, "CONNECTED"));
  } else {
    store.dispatch(storeConnectionState(host.id, "NETWORK_ERROR"));
  }
};

export const start = () => {
  const queue = store.getState().relay_queue;
  interval = setInterval(async () => {
    const job = queue.pull();
    if (!job) {
      return;
    }
    if (job.type === "HEART_BEAT") {
      await handleHeartBeat(job.host);
      queue.push(job);
    }
  }, configs.layer_intervals.relay_host);
};

export const finish = () => {
  clearInterval(interval);
};
