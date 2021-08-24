import { getHeartBeat } from "Apis/HeartBeat";
import { editHost } from "Redux/actions/hosts";
import store from "Redux/store";

export default class HostBeats {
  private static interval?: NodeJS.Timeout;
  // export const handle = (hosts: Host[], dispatch: Dispatch) => {
  //   const checking_hosts = hosts.filter((host) => !host.disabled);
  //   console.log(checking_hosts.map((rec) => rec.id));
  // };

  public static start(): void {
    this.interval = setInterval(() => {
      const hosts = store.getState().hosts;
      hosts.forEach(async (host) => {
        try {
          const sent_date = Date.now();
          await getHeartBeat(host.address);
          const tta = Date.now() - sent_date;
          console.log(tta);
          host.setTTA(tta);
          store.dispatch(editHost(host));
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
