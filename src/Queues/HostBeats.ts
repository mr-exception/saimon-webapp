import { getHeartBeat } from "Apis/HeartBeat";
import RelayHost from "Classes/Host/RelayHost";
import { updateHost } from "Redux/actions/hosts";
import store from "Redux/store";

export default class HostBeats {
  private static interval?: NodeJS.Timeout;

  public static start(): void {
    this.interval = setInterval(() => {
      const hosts = store.getState().hosts;
      hosts.forEach(async (host) => {
        try {
          // calcuate the TTA to host node (time to answer)
          const sent_date = Date.now();
          await getHeartBeat(host.address);
          const tta = Date.now() - sent_date;
          host.setTTA(tta);
          store.dispatch(updateHost(host));
          // now we know that there is healthy connection to host node
          console.log(host.state);
          if (!host.isDisconnected()) return;
          // if host node is not disabled and its status is network error
          // or disconnected. client must connect to host node again
          if (!host.disabled) {
            if (host.type === "RELAY" && host.protocol === "LIVE") {
              await (host as RelayHost).connect();
            }
          }
        } catch (error) {
          console.log(error);
        }
      });
    }, 5000);
  }
  public static finish(): void {
    if (!!this.interval) clearInterval(this.interval);
  }
}
