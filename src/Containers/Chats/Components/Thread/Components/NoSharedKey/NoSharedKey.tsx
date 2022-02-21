import { AuthContext } from "AuthContextProvider";
import { ContactsContext } from "DataContext/ContactsContextProvider";
import { useRelatedHosts } from "DataContext/HostsContextProvider";
import { useContext } from "react";
import Button from "Ui-Kit/Button/Button";
import Key from "Utils/Key";
import { sendMessage } from "Utils/message";

const NoSharedKey = () => {
  const { activeContact, updateContact } = useContext(ContactsContext);
  const { key, address } = useContext(AuthContext);
  const relatedHosts = useRelatedHosts(activeContact?.value);
  async function generateSharedKey() {
    if (!activeContact) return;
    const sharedKey = Key.generateFreshKey();
    activeContact.value.shared_private_key = sharedKey.getPrivateKey();
    await sendMessage(activeContact.value, key, address, sharedKey.getPrivateKey(), relatedHosts, "shared_key");
    updateContact(activeContact);
  }
  return (
    <div className="bg-gray flex-1 w-full justify-center items-center flex">
      <div
        className=" bg-primary rounded-md flex justify-center items-center py-4 text-center row"
        style={{ minHeight: 140, width: "90%", maxWidth: 550 }}
      >
        <div className="col-xs-12 my-4">
          you don't have any shared key with this contact. create a new one before sending any message
        </div>
        <div className="col-xs-12 mt-2">
          <Button onClick={generateSharedKey}>generate shared key</Button>
        </div>
      </div>
    </div>
  );
};

export default NoSharedKey;
