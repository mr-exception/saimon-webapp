import React from "react";
import ChatDetail from "./Sections/ChatDetail/ChatDetail";
import ChatList from "./Sections/ChatList/ChatList";
import "./styles.css";
const Home = () => {
  return (
    <div className="row">
      <ChatList />
      <ChatDetail />
    </div>
  );
};

export default Home;
