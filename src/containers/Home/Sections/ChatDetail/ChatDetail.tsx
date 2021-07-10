import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useSelector } from "react-redux";
import {
  selectConversationMessages,
  selectedContact,
} from "redux/types/selectors";
import Header from "./Components/Header/Header";
import MessageList from "./Components/MessageList/MessageList";
import NoConversationSelected from "./Components/NoConversationSelected/NoConversationSelected";
import NoMessage from "./Components/NoMessage/NoMessage";
import SendBox from "./Components/SendBox/SendBox";
import "./styles.css";
const ChatDetail = () => {
  const selected_contact = useSelector(selectedContact);
  const messages = useSelector(selectConversationMessages);

  const messageList = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!!messageList.current) {
      messageList.current.scrollTo(0, messageList.current.scrollHeight);
    }
  }, [messages]);

  if (selected_contact === undefined) {
    return <NoConversationSelected />;
  }
  return (
    <div className="chat-detail">
      <Header contact={selected_contact} last_online={Date.now()} />
      {messages.length === 0 && <NoMessage />}
      {messages.length > 0 && <MessageList messages={messages} />}
      <SendBox />
    </div>
  );
};

export default ChatDetail;
