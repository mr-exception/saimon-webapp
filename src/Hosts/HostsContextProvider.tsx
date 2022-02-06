import { createContext, useState } from "react";
import { toast } from "react-toastify";
import { IHost } from "Structs/Host";

export interface IHostsContext {
  hosts: IHost[];
  addHost: (value: IHost) => void;
  removeHost: (address: string) => void;
}

export const HostsContext = createContext<IHostsContext>({
  hosts: [],
  addHost: (value: IHost) => {},
  removeHost: (address: string) => {},
});

export const HostsContextProvider: React.FC<{ children: any }> = ({ children }) => {
  const [hosts, setHosts] = useState<IHost[]>([]);
  function addHost(value: IHost): void {
    setHosts([...hosts, value]);
    toast.success("registered to host successfully!");
  }
  function removeHost(address: string): void {
    setHosts(hosts.filter((host) => host.url !== address));
  }
  return <HostsContext.Provider value={{ hosts, addHost, removeHost }}>{children}</HostsContext.Provider>;
};
