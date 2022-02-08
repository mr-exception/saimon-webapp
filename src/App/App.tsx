import React, { useContext, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import MenuItem from "./Components/MenuItem/MenuItem";
import Contacts from "./Images/Contacts";
import Hosts from "./Images/Hosts";
import Profile from "./Images/Profile";
import Setting from "./Images/Setting";
import Styles from "./styles.module.css";
import { ModalsContextProvider } from "Modals/ModalsContextProvider";
import ModalContainer from "Modals/ModalContainer";
import { HostsContextProvider } from "DataContext/HostsContextProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "AuthContext/AuthContextProvider";
import InitForm from "./Components/InitForm/InitForm";
import AuthStep from "./Components/AuthStep/AuthStep";
import { ContactsContextProvider } from "DataContext/ContactsContextProvider";

interface IProps {
  children: any;
}
const App: React.FC<IProps> = ({ children }: IProps) => {
  const { address, password } = useContext(AuthContext);
  const [passedAuth, setPassedAuth] = useState(false);
  const history = useHistory();
  const href = useLocation().pathname;
  let activeSection: "chats" | "hosts" | "profile" | "setting" = "chats";
  switch (href) {
    case "/":
      activeSection = "chats";
      break;
    case "/hosts":
      activeSection = "hosts";
      break;
    case "/profile":
      activeSection = "profile";
      break;
    case "/setting":
      activeSection = "setting";
      break;
  }

  if (address === "N/A") {
    return (
      <div className={Styles.app}>
        <div className={Styles.container + " bg-secondary"}>
          <InitForm />
        </div>
      </div>
    );
  }
  if (password !== "N/A" && !passedAuth) {
    return (
      <div className={Styles.app}>
        <div className={Styles.container + " bg-secondary"}>
          <AuthStep passed={() => setPassedAuth(true)} />
        </div>
      </div>
    );
  }

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
            isActive={activeSection === "chats"}
          />
          <MenuItem
            IconComponent={Hosts}
            caption="hosts"
            onClick={() => {
              history.push("/hosts");
            }}
            isActive={activeSection === "hosts"}
          />
          <MenuItem
            IconComponent={Profile}
            caption="profile"
            onClick={() => {
              history.push("/profile");
            }}
            isActive={activeSection === "profile"}
          />
          <MenuItem
            IconComponent={Setting}
            caption="setting"
            onClick={() => {
              history.push("/setting");
            }}
            isActive={activeSection === "setting"}
          />
        </div>
        <HostsContextProvider>
          <ContactsContextProvider>
            <ModalsContextProvider>
              <div className={Styles.children}>{children}</div>
              <ModalContainer />
            </ModalsContextProvider>
          </ContactsContextProvider>
        </HostsContextProvider>
      </div>
      <ToastContainer
        bodyStyle={{ maxWidth: "90%", wordBreak: "break-all" }}
        position="top-center"
        autoClose={3500}
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
