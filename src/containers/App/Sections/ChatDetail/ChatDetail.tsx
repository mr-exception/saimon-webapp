import React from "react";
import Header from "./Components/Header/Header";
import ReceivedMessageRow from "./Components/ReceivedMessageRow/ReceivedMessageRow";
import SentMessageRow from "./Components/SentMessageRow/SentMessageRow";
import "./styles.css";
const ChatDetail = () => {
  return (
    <div className="chat-detail">
      <Header name="ahmad sharabi" last_online={Date.now()} />
      <div className="chat-detail__message-list">
        <SentMessageRow
          text="Esse consectetur id voluptate ea proident. Voluptate amet do reprehenderit proident culpa ullamco pariatur nisi reprehenderit quis anim proident. Ipsum cillum dolore ea elit incididunt. Fugiat anim adipisicing eu ea reprehenderit nisi culpa Lorem in minim nisi qui proident occaecat. Aliqua magna ipsum commodo sit quis cillum ullamco."
          sent_at={Date.now()}
          status="SENT"
        />
        <ReceivedMessageRow
          text="Esse consectetur id voluptate ea proident. Voluptate amet do reprehenderit proident culpa ullamco pariatur nisi reprehenderit quis anim proident. Ipsum cillum dolore ea elit incididunt. Fugiat anim adipisicing eu ea reprehenderit nisi culpa Lorem in minim nisi qui proident occaecat. Aliqua magna ipsum commodo sit quis cillum ullamco."
          sent_at={Date.now()}
        />
      </div>
    </div>
  );
};

export default ChatDetail;
