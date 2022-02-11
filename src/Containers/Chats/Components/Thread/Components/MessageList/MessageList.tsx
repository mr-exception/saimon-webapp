import { fetchPackets } from "API/Packets";
import { AuthContext } from "AuthContext/AuthContextProvider";
import { ContactsContext } from "DataContext/ContactsContextProvider";
import { HostsContext } from "DataContext/HostsContextProvider";
import { useContext, useEffect, useState } from "react";
import Styles from "./styles.module.css";
const MessageList = () => {
  const { activeContact } = useContext(ContactsContext);
  const { address } = useContext(AuthContext);
  const { hosts } = useContext(HostsContext);
  const [messages, setMessages] = useState<string[]>([]);
  useEffect(() => {
    if (!activeContact) return;
    fetchPackets(
      { thread: activeContact.value.address },
      { address, secret: hosts[0].value.secret, baseUrl: hosts[0].value.url + "/api" }
    ).then((data) => {
      setMessages(data.map((record) => record.data));
    });
  }, [activeContact, address, hosts]);
  return (
    <div className={Styles.messageList}>
      {messages.map((message) => (
        <div style={{ flex: 1, height: 40 }}>{message}</div>
      ))}
    </div>
  );
};

export default MessageList;
