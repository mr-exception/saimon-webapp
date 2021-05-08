import Host from "Classes/Host/Host";
import { ConnectionStatus } from "core/Connection/def";
import Key from "core/Key/Key";
import { Dispatch } from "redux";
import { storeConnectionState } from "redux/actions/client";
import { addHosts } from "redux/actions/hosts";
import { ActionType } from "redux/types/actions";
import Storage from "storage/Storage";

const load = async (
  app_key: Key,
  storage: Storage,
  dispatch: Dispatch<ActionType>
) => {
  const host_records = await storage.getHosts();
  const hosts = host_records.map((rec) => {
    const host = new Host(rec, app_key, storage);
    host.connectionStatusChanged = (state: ConnectionStatus) => {
      console.log(state);
      if (!host.id) return;
      dispatch(storeConnectionState(host.id, state));
    };
    return host;
  });
  dispatch(addHosts(hosts));
};

export default load;
