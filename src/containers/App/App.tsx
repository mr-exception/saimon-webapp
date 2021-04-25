import React from "react";
import ChatDetail from "./Sections/ChatDetail/ChatDetail";
import ChatList from "./Sections/ChatList/ChatList";
import Toolbar from "./Sections/Toolbar/Toolbar";
import "./styles.css";
const App = () => {
  return (
    <div className="app">
      <div className="app__container">
        <Toolbar />
        <ChatList />
        <ChatDetail />
      </div>
    </div>
  );
};

export default App;
