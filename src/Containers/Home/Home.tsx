import React from "react";
import ChatDetail from "./Sections/ChatDetail/ChatDetail";
import ChatList from "./Sections/ChatList/ChatList";
import "./styles.css";
const Home = () => {
  return (
    <div className="col-md-12 h-full">
      <div className="row h-full">
        <ChatList />
        <ChatDetail />
      </div>
    </div>
  );
};

export default Home;
