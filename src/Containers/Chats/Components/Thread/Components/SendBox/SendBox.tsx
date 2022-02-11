import { useContext, useState } from "react";
import TextInput from "Ui-Kit/Inputs/TextInput/TextInput";
import { MdSend } from "react-icons/md";
import { sendPacket } from "API/Packets";
import { HostsContext } from "DataContext/HostsContextProvider";
import { ContactsContext } from "DataContext/ContactsContextProvider";
import { AuthContext } from "AuthContextProvider";

const SendBox = () => {
  const [text, setText] = useState<string>();

  const { address } = useContext(AuthContext);
  const { activeContact } = useContext(ContactsContext);
  const { hosts } = useContext(HostsContext);
  async function send() {
    if (!activeContact) return;
    if (!text) return;
    try {
      await sendPacket(
        {
          dst: activeContact.value.address,
          data: text,
          position: 0,
          msg_count: 1,
          msg_id: "e05ffde0-cb9b-48e5-b9c9-f9cb81bae8d9",
        },
        { address, baseUrl: hosts[0].value.url + "/api", secret: hosts[0].value.secret }
      );
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="w-full border-t-2 border-gray-lighter border-solid flex" style={{ minHeight: 50 }}>
      <div style={{ flex: 11 }} className="flex justify-center items-center">
        <TextInput value={text} onChange={setText} style={{ width: "100%" }} />
      </div>
      <div style={{ flex: 1, minWidth: 50 }} className="flex justify-center items-center">
        <MdSend size={35} className="cursor-pointer hover:text-base" onClick={send} />
      </div>
    </div>
  );
};

export default SendBox;
