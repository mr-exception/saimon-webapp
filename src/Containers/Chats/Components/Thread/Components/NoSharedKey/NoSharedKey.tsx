import { registerChannel } from "API/Channels";
import { AuthContext } from "AuthContextProvider";
import { ContactsContext } from "DataContext/ContactsContextProvider";
import { useRelatedHosts } from "DataContext/HostsContextProvider";
import { useContext, useState } from "react";
import Button from "Ui-Kit/Button/Button";
import Key from "Utils/Key";
import { v4 as uuidV4 } from "uuid";
import { createAxiosConfig } from "Structs/Host";

const NoSharedKey = () => {
  const { activeContact } = useContext(ContactsContext);
  const { address } = useContext(AuthContext);
  // const { addChannel } = useContext(ChannelsContext);
  const relatedHosts = useRelatedHosts(activeContact?.value);

  const [registering, setRegistering] = useState(false);
  async function register() {
    if (!activeContact) return;
    setRegistering(true);
    try {
      const universal_id = uuidV4();
      const sharedKey = Key.generateFreshKey();
      await registerChannel(
        universal_id,
        sharedKey.getPrivateKey(),
        activeContact.value.address,
        createAxiosConfig(address, relatedHosts[0])
      );
      await registerChannel(
        universal_id,
        sharedKey.getPrivateKey(),
        address,
        createAxiosConfig(address, relatedHosts[0])
      );
      // addChannel({
      //   key: sharedKey.getPrivateKey(),
      //   member: address,
      //   universal_id,
      // });
    } catch (error) {
      console.log(error);
    } finally {
      setRegistering(false);
    }
  }
  return (
    <div className="bg-gray flex-1 w-full justify-center items-center flex">
      <div
        className=" bg-primary rounded-md flex justify-center items-center py-4 text-center row"
        style={{ minHeight: 140, width: "90%", maxWidth: 550 }}
      >
        <div className="col-xs-12 my-4">
          you don't have any shared key with this contact. create a new channel
          before sending any message
        </div>
        <div className="col-xs-12 mt-2">
          <Button
            loading={registering}
            onClick={register}
            style={{ minWidth: 210 }}
          >
            register new channel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NoSharedKey;
