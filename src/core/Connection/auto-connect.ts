import Host from "Classes/Host/Host";
import RelayHost from "Classes/Host/RelayHost";

export const autoConnect = (hosts: Host[]): void => {
  hosts.forEach((host) => {
    if (host.disabled) return; // user doesn't want this host to connect
    if (host instanceof RelayHost) {
      (host as RelayHost).connect();
    }
  });
};
