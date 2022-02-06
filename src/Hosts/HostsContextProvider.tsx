import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { IHost } from "Structs/Host";
import { getHostsFromDB, insertHostInDB } from "Utils/storage";

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
  async function addHost(value: IHost): Promise<void> {
    await insertHostInDB(value);
    setHosts([...hosts, value]);
    toast.success("registered to host successfully!");
  }
  function removeHost(address: string): void {
    setHosts(hosts.filter((host) => host.url !== address));
  }
  useEffect(() => {
    getHostsFromDB().then((value) => {
      setHosts(value);
    });
  }, []);
  return <HostsContext.Provider value={{ hosts, addHost, removeHost }}>{children}</HostsContext.Provider>;
};
