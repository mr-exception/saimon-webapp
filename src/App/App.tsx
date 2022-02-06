import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import MenuItem from "./Components/MenuItem/MenuItem";
import Contacts from "./Images/Contacts";
import Hosts from "./Images/Hosts";
import Profile from "./Images/Profile";
import Setting from "./Images/Setting";
import Styles from "./styles.module.css";
import { ModalsContextProvider } from "Modals/ModalsContextProvider";
import ModalContainer from "Modals/ModalContainer";
import { HostsContextProvider } from "Hosts/HostsContextProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface IProps {
  children: any;
}
const App: React.FC<IProps> = ({ children }: IProps) => {
  const history = useHistory();
  const [activeSection, setActiveSection] = useState<"chats" | "hosts" | "profile" | "setting">("chats");
  return (
    <div className={Styles.app}>
      <div className={Styles.container}>
        <div className={Styles.toolbar}>
          <MenuItem
            IconComponent={Contacts}
            caption="chats"
            onClick={() => {
              history.push("/");
              setActiveSection("chats");
            }}
            isActive={activeSection === "chats"}
          />
          <MenuItem
            IconComponent={Hosts}
            caption="hosts"
            onClick={() => {
              history.push("/hosts");
              setActiveSection("hosts");
            }}
            isActive={activeSection === "hosts"}
          />
          <MenuItem
            IconComponent={Profile}
            caption="profile"
            onClick={() => {
              history.push("/profile");
              setActiveSection("profile");
            }}
            isActive={activeSection === "profile"}
          />
          <MenuItem
            IconComponent={Setting}
            caption="setting"
            onClick={() => {
              history.push("/setting");
              setActiveSection("setting");
            }}
            isActive={activeSection === "setting"}
          />
        </div>
        <HostsContextProvider>
          <ModalsContextProvider>
            <div className={Styles.children}>{children}</div>
            <ModalContainer />
          </ModalsContextProvider>
        </HostsContextProvider>
      </div>
      <ToastContainer
        bodyStyle={{ maxWidth: "90%", wordBreak: "break-all" }}
        position="top-center"
        autoClose={0}
        limit={3}
        newestOnTop={true}
        theme="colored"
        draggable={false}
        closeOnClick={false}
      />
    </div>
  );
};

export default App;
