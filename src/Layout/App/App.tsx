import React from "react";
import MenuItem from "./Components/MenuItem/MenuItem";
import HostIcon from "img/hosts.svg";
import ContcatsIcon from "img/contact.svg";
import ProfileIcon from "img/profile.svg";
import SettingIcon from "img/setting.svg";
import "./styles.css";
import { useHistory } from "react-router";
import Modals from "Modals/Modals";
const App: React.FC<IAppProps> = ({ children }: IAppProps) => {
  const history = useHistory();
  return (
    <div className="app">
      <div className="app__container border-secondary">
        <div className="app__container__toolbar bg-secondary">
          <MenuItem
            icon={ContcatsIcon}
            caption="chats"
            onClick={() => {
              history.push("/");
            }}
          />
          <MenuItem
            icon={HostIcon}
            caption="hosts"
            onClick={() => {
              history.push("/hosts");
            }}
          />
          <MenuItem
            icon={ProfileIcon}
            caption="profile"
            onClick={() => {
              history.push("/profile");
            }}
          />
          <MenuItem
            icon={SettingIcon}
            caption="setting"
            onClick={() => {
              history.push("/setting");
            }}
          />
        </div>
        <div className="app__container__children">{children}</div>
      </div>
      <Modals />
    </div>
  );
};

export default App;
