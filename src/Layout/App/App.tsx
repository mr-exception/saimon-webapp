import React from "react";
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
  return (
    <div className={Styles.app}>
      <div className={Styles.container}>
        <div className={Styles.toolbar}>
          <MenuItem
            IconComponent={Contacts}
            caption="chats"
            onClick={() => {
              history.push("/");
            }}
          />
          <MenuItem
            IconComponent={Hosts}
            caption="hosts"
            onClick={() => {
              history.push("/hosts");
            }}
          />
          <MenuItem
            IconComponent={Profile}
            caption="profile"
            onClick={() => {
              history.push("/profile");
            }}
          />
          <MenuItem
            IconComponent={Setting}
            caption="setting"
            onClick={() => {
              history.push("/setting");
            }}
          />
        </div>
        <div className={Styles.children + " row"}>{children}</div>
      </div>
      <Modals />
    </div>
  );
};

export default App;
