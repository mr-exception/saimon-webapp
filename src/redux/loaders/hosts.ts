import Host from "Classes/Host/Host";
import Key from "core/Key/Key";
import { Dispatch } from "redux";
import { addHosts } from "redux/actions/hosts";
import { ActionType } from "redux/types/actions";
import Storage from "storage/Storage";

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
          const host = new Host(rec, app_key);
          host.connect();
          resolve(host);
        })
    )
  );
  dispatch(addHosts(hosts));
};

export default load;
