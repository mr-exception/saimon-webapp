import AdvertiserHost from "Classes/Host/AdvertiserHost";
import Host from "Classes/Host/Host";
import RelayHost from "Classes/Host/RelayHost";
import StorageHost from "Classes/Host/StorageHost";
import Key from "core/Key/Key";
import { Dispatch } from "redux";
import { addHosts } from "redux/actions/hosts";
import { ActionType } from "redux/types/actions";
import Storage from "storage/Storage";
import store from "../store";

const load = async (
  app_key: Key,
  storage: Storage,
  dispatch: Dispatch<ActionType>
) => {
  const host_records = await storage.getHosts();
  const hosts = await Promise.all(
    host_records.map(
      (rec) =>
        new Promise<Host>(async (resolve, reject) => {
          if (rec.type === "RELAY") {
            const host = new RelayHost(rec, app_key);
            host.connect();
            resolve(host);
          }
          if (rec.type === "ADVERTISER") {
            const host = new AdvertiserHost(rec, app_key);
            const queue = store.getState().advertiser_queue;
            queue.push({
              type: "HEART_BEAT",
              host,
            });
            resolve(host);
          }
          if (rec.type === "STORAGE") {
            const host = new StorageHost(rec, app_key);
            const queue = store.getState().storage_queue;
            queue.push({
              type: "HEART_BEAT",
              host,
            });
            resolve(host);
          }
          const host = new Host(rec, app_key);
          resolve(host);
        })
    )
  );
  dispatch(addHosts(hosts));
};

export default load;
