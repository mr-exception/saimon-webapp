import React from "react";
import Conversation from "./Components/Conversation/Conversation";
import "./styles.css";
const ChatList = () => {
  const list: IConversationProps[] = [
    { name: "john doe", last_message: "this is a test message" },
    { name: "john doe", last_message: "this is a test message" },
    { name: "john doe", last_message: "this is a test message" },
    { name: "john doe", last_message: "this is a test message" },
    { name: "john doe", last_message: "this is a test message" },
    { name: "john doe", last_message: "this is a test message" },
    { name: "john doe", last_message: "this is a test message" },
  ];
  return (
    <div className="chat-list">
      {list.map((conversation) => (
        <Conversation
          name={conversation.name}
          last_message={conversation.last_message}
        />
      ))}
    </div>
  );
};

export default ChatList;
