import React, { useState } from "react";
import MenuItem from "./Components/MenuItem/MenuItem";
import Styles from "./styles.module.css";
import { useHistory } from "react-router";
import Modals from "Modals/Modals";
import Contacts from "Images/Contacts";
import Hosts from "Images/Hosts";
import Profile from "Images/Profile";
import Setting from "Images/Setting";
const App: React.FC<IAppProps> = ({ children }: IAppProps) => {
  const history = useHistory();
  const [activeSection, setActiveSection] = useState<
    "chats" | "hosts" | "profile" | "setting"
  >("chats");
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
        <div className={Styles.children}>{children}</div>
      </div>
      <Modals />
    </div>
  );
};

export default App;
