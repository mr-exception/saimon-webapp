import { useContext, useState } from "react";
import TextInput from "Ui-Kit/Inputs/TextInput/TextInput";
import { MdSend } from "react-icons/md";
import { ContactsContext } from "DataContext/ContactsContextProvider";
import { AuthContext } from "AuthContextProvider";
import { sendMessage } from "Utils/message";
import { HostsContext } from "DataContext/HostsContextProvider";
import { ThreadsContext } from "DataContext/ThreadsContextProvider";

const SendBox = () => {
  const [text, setText] = useState<string>();

  const { key, address } = useContext(AuthContext);
  const { activeThread } = useContext(ThreadsContext);
  const { hosts } = useContext(HostsContext);
  // async function send() {
  //   if (!activeThread) return;
  //   if (!text) return;
  //   try {
  //     const relatedHosts = hosts.filter((host) =>
  //       activeContact.value.hosts.map((record) => record.hostId).includes(host.id)
  //     );
  //     console.log("sending");
  //     await sendMessage(
  //       activeContact.value,
  //       key,
  //       address,
  //       text,
  //       relatedHosts.map((record) => record.value),
  //       "text"
  //     );
  //     console.log("sent");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  return (
    <div
      className="w-full border-t-2 border-gray-lighter border-solid flex"
      style={{ minHeight: 50 }}
    >
      <div style={{ flex: 11 }} className="flex justify-center items-center">
        <TextInput value={text} onChange={setText} style={{ width: "100%" }} />
      </div>
      <div
        style={{ flex: 1, minWidth: 50 }}
        className="flex justify-center items-center"
      >
        <MdSend
          size={35}
          className="cursor-pointer hover:text-base"
          // onClick={send}
        />
      </div>
    </div>
  );
};

export default SendBox;
