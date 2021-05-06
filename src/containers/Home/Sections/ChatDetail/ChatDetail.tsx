import React from "react";
import { useSelector } from "react-redux";
import {
  selectConversationMessages,
  selectedConversation,
} from "redux/types/selectors";
import Header from "./Components/Header/Header";
import NoConversationSelected from "./Components/NoConversationSelected/NoConversationSelected";
import NoMessage from "./Components/NoMessage/NoMessage";
import ReceivedMessageRow from "./Components/ReceivedMessageRow/ReceivedMessageRow";
import SendBox from "./Components/SendBox/SendBox";
import SentMessageRow from "./Components/SentMessageRow/SentMessageRow";
import "./styles.css";
const ChatDetail = () => {
  const selected_conversation_index = useSelector(selectedConversation);
  const messages = useSelector(selectConversationMessages);
  if (selected_conversation_index === undefined) {
    return <NoConversationSelected />;
  }

  const renderMessageList = () => {
    if (messages.length === 0) {
      return <NoMessage />;
    }
    return messages.map((message, index) => {
      if (message.box_type === "RECEIVED") {
        return (
          <ReceivedMessageRow
            key={index}
            text={message.content}
            sent_at={message.date}
          />
        );
      }
      if (message.box_type === "SENT") {
        return (
          <SentMessageRow
            key={index}
            text={message.content}
            sent_at={message.date}
            status={message.status}
          />
        );
      }
      return null;
    });
  };
  return (
    <div className="chat-detail">
      <Header name="ahmad sharabi" last_online={Date.now()} />
      <div className="chat-detail__message-list">{renderMessageList()}</div>
      <SendBox />
    </div>
  );
};

export default ChatDetail;
