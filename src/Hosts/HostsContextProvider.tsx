import { IndexableType } from "dexie";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { IHost } from "Structs/Host";
import { deleteHostFromDB, getHostsFromDB, insertHostInDB } from "Utils/storage";

export interface IHostsContext {
  hosts: { value: IHost; id: IndexableType }[];
  addHost: (value: IHost) => void;
  removeHost: (id: IndexableType) => void;
}

export const HostsContext = createContext<IHostsContext>({
  hosts: [],
  addHost: (value: IHost) => {},
  removeHost: (id: IndexableType) => {},
});

export const HostsContextProvider: React.FC<{ children: any }> = ({ children }) => {
  const [hosts, setHosts] = useState<{ value: IHost; id: IndexableType }[]>([]);
  async function addHost(value: IHost): Promise<void> {
    const id = await insertHostInDB(value);
    setHosts([...hosts, { value, id }]);
    toast.success("registered to host successfully!");
  }
  async function removeHost(id: IndexableType) {
    await deleteHostFromDB(id);
    setHosts(await getHostsFromDB());
  }
  useEffect(() => {
    getHostsFromDB().then((value) => {
      setHosts(value);
    });
  }, []);
  return <HostsContext.Provider value={{ hosts, addHost, removeHost }}>{children}</HostsContext.Provider>;
};
