import React from "react";
import MenuItem from "./Components/MenuItem/MenuItem";
import "./styles.css";
import { useHistory } from "react-router";
import Modals from "Modals/Modals";
const App: React.FC<IAppProps> = ({ children }: IAppProps) => {
  const history = useHistory();
  return (
    <div className="app">
      <div className="app__container">
        <div className="app__container__toolbar">
          <MenuItem
            icon="/Images/contact.svg"
            caption="chats"
            onClick={() => {
              history.push("/");
            }}
          />
          <MenuItem
            icon="Images/hosts.svg"
            caption="hosts"
            onClick={() => {
              history.push("/hosts");
            }}
          />
          <MenuItem
            icon="Images/profile.svg"
            caption="profile"
            onClick={() => {
              history.push("/profile");
            }}
          />
          <MenuItem
            icon="/Images/setting.svg"
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
