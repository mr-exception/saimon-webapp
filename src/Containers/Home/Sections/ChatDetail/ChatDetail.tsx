import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useSelector } from "react-redux";
import {
  selectContacts,
  selectConversationMessages,
  selectedContactId,
} from "Redux/types/selectors";
import Header from "./Components/Header/Header";
import MessageList from "./Components/MessageList/MessageList";
import NoConversationSelected from "./Components/NoConversationSelected/NoConversationSelected";
import NoMessage from "./Components/NoMessage/NoMessage";
import NoRoute from "./Components/NoRoute/NoRoute";
import SendBox from "./Components/SendBox/SendBox";
import "./styles.css";

const Container: React.FC<{ children: any }> = ({ children }) => {
  return <div className="col-md-8 h-full">{children}</div>;
};

const ChatDetail = () => {
  const contacts = useSelector(selectContacts);
  const selected_contact_id = useSelector(selectedContactId);
  const selected_contact = contacts.find(
    (contact) => contact.id === selected_contact_id
  );

  const messages = useSelector(selectConversationMessages);
  const messageList = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!!messageList.current) {
      messageList.current.scrollTo(0, messageList.current.scrollHeight);
    }
  }, [messages]);

  if (!selected_contact) {
    return (
      <Container>
        <NoConversationSelected />
      </Container>
    );
  }

  if (selected_contact.relay_host_ids.length === 0) {
    return (
      <Container>
        <NoRoute contact={selected_contact} />
      </Container>
    );
  }
  return (
    <Container>
      <div className="col-md-12 flex flex-col h-full px-0">
        <Header contact={selected_contact} />
        {messages.length === 0 && <NoMessage />}
        {messages.length > 0 && <MessageList messages={messages} />}
        <SendBox />
      </div>
    </Container>
  );
};

export default ChatDetail;
