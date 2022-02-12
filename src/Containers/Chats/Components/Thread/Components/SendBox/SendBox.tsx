import { useContext, useState } from "react";
import TextInput from "Ui-Kit/Inputs/TextInput/TextInput";
import { MdSend } from "react-icons/md";
import { sendPacket } from "API/Packets";
import { HostsContext } from "DataContext/HostsContextProvider";
import { ContactsContext } from "DataContext/ContactsContextProvider";
import { AuthContext } from "AuthContextProvider";
import { sendMessage } from "API/Message";
import Key from "Utils/Key";

const SendBox = () => {
  const [text, setText] = useState<string>();

  const { address, key } = useContext(AuthContext);
  const { activeContact } = useContext(ContactsContext);
  const { hosts } = useContext(HostsContext);
  async function send() {
    if (!activeContact) return;
    if (!text) return;
    try {
      const dst_key = Key.generateKeyByPublicKey(activeContact.value.hosts[0].public_key);
      const encrypted = dst_key.encryptPublic(key.encryptPrivate(text));
      const plain = key.decryptPublic(key.decryptPrivate(encrypted).toString()).toString();
      console.log(plain);
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
