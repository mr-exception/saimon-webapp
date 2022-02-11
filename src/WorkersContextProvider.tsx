import { createContext } from "react";

export interface IWorkersContext {
  hostsWorker: Worker;
}

export const WorkersContext = createContext<IWorkersContext>({
  hostsWorker: new Worker("/workers/hosts.js"),
});

export const WorkersContextProvider: React.FC<{ children: any; hostsWorker: Worker }> = ({ children, hostsWorker }) => {
  return (
    <WorkersContext.Provider
      value={{
        hostsWorker,
      }}
    >
      {children}
    </WorkersContext.Provider>
  );
};
