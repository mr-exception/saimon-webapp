import React from "react";
import { useRef } from "react";
import { useSelector } from "react-redux";
import {
  selectConversationMessages,
  selectedContact,
} from "redux/types/selectors";
import Header from "./Components/Header/Header";
import NoConversationSelected from "./Components/NoConversationSelected/NoConversationSelected";
import NoMessage from "./Components/NoMessage/NoMessage";
import ReceivedMessageRow from "./Components/ReceivedMessageRow/ReceivedMessageRow";
import SendBox from "./Components/SendBox/SendBox";
import SentMessageRow from "./Components/SentMessageRow/SentMessageRow";
import "./styles.css";
const ChatDetail = () => {
  const selected_contact = useSelector(selectedContact);
  const messages = useSelector(selectConversationMessages);

  const messageList = useRef<HTMLDivElement>(null);
  if (selected_contact === undefined) {
    return <NoConversationSelected />;
  }

  const renderMessageList = () => {
    return messages.map((message, index) => {
      if (message.getMessageType() !== "TEXT") return null;
      if (message.box_type === "RECEIVED") {
        return (
          <ReceivedMessageRow
            key={index}
            text={message.text}
            sent_at={message.date}
          />
        );
      }
      if (message.box_type === "SENT") {
        return (
          <SentMessageRow
            key={index}
            text={message.text}
            sent_at={message.date}
            status={message.status}
          />
        );
      }
      return null;
    });
  };
  if (!!messageList.current) {
    messageList.current.scrollTo({ top: 999999 });
  }
  return (
    <div className="chat-detail">
      <Header contact={selected_contact} last_online={Date.now()} />
      {messages.length === 0 && <NoMessage />}
      {messages.length > 0 && (
        <div className="chat-detail__message-list" ref={messageList}>
          {renderMessageList()}
        </div>
      )}
      <SendBox />
    </div>
  );
};

export default ChatDetail;
