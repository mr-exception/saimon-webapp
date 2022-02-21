import { ContactsContext } from "DataContext/ContactsContextProvider";
import { useContext } from "react";
import Header from "./Components/Header/Header";
import MessageList from "./Components/MessageList/MessageList";
import NoSharedKey from "./Components/NoSharedKey/NoSharedKey";
import NoThread from "./Components/NoThread/NoThread";
import SendBox from "./Components/SendBox/SendBox";
const Thread = () => {
  const { activeContact } = useContext(ContactsContext);
  if (!activeContact) {
    return <NoThread />;
  }
  return (
    <div className="w-full flex-1 flex flex-col bg-gray">
      <Header />
      {activeContact.value.shared_private_key !== "N/A" ? <MessageList /> : <NoSharedKey />}
      {activeContact.value.shared_private_key !== "N/A" && <SendBox />}
    </div>
  );
};

export default Thread;
