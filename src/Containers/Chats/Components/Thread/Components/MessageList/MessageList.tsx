import { fetchPackets } from "API/Packets";
import { AuthContext } from "AuthContextProvider";
import { HostsContext } from "DataContext/HostsContextProvider";
import { ThreadsContext } from "DataContext/ThreadsContextProvider";
import { useContext, useEffect, useState } from "react";
import { packetsToMessages } from "Structs/Message";
import Key from "Utils/Key";
import Styles from "./styles.module.css";
const MessageList = () => {
  const { activeThread } = useContext(ThreadsContext);
  const { address } = useContext(AuthContext);
  const { hosts } = useContext(HostsContext);
  const [messages, setMessages] = useState<string[]>([]);
  useEffect(() => {
    if (!activeThread) return;
    const key = Key.generateKeyByPrivateKey(activeThread.value.key);
    fetchPackets(
      { thread: activeThread.value.universal_id },
      {
        address,
        secret: hosts[0].value.secret,
        baseUrl: hosts[0].value.url + "/api",
      }
    ).then(async (packets) => {
      const result = packetsToMessages(packets, key);
      setMessages(result.map((record) => record.data));
    });
  }, [activeThread, address, hosts]);
  return (
    <div className={Styles.messageList}>
      {messages.map((message, index) => (
        <div key={index} style={{ flex: 1, height: 40 }}>
          {message}
        </div>
      ))}
    </div>
  );
};

export default MessageList;
