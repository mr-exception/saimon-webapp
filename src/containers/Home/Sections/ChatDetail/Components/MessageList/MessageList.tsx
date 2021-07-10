import React from "react";
import { useRef } from "react";
import SentMessageRow from "./SentMessageRow/SentMessageRow";
import ReceivedMessageRow from "./ReceivedMessageRow/ReceivedMessageRow";
import { IMessageListProps } from "./def";
import "./styles.css";

const MessageList: React.FC<IMessageListProps> = ({
  messages,
}: IMessageListProps) => {
  const messageList = useRef<HTMLDivElement>(null);
  return (
    <div className="message-list" ref={messageList}>
      {messages.map((message) => {
        if (message.box_type === "SENT") {
          return <SentMessageRow key={message.id} message={message} />;
        } else {
          return <ReceivedMessageRow key={message.id} message={message} />;
        }
      })}
    </div>
  );
};

export default MessageList;
