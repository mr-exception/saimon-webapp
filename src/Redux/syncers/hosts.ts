import Host from "Classes/Host/Host";
import Key from "Classes/Key/Key";
import { Dispatch } from "react";
import { resetHosts } from "Redux/actions/hosts";
import { ActionType } from "Redux/types/actions";

const syncer = (
  hosts: Host[],
  dispatch: Dispatch<ActionType>,
  app_key: Key
) => {
  if (hosts.length === 0) {
    // there is no host to sync
    return;
  }
  if (
    app_key.getPublicKeyNormalized() ===
    hosts[0].client_key.getPublicKeyNormalized()
  ) {
    // app key is not changed
    return;
  }
  hosts = hosts.map((host) => {
    host.client_key = app_key;
    return host;
  });
  dispatch(resetHosts(hosts));
};

export default syncer;
