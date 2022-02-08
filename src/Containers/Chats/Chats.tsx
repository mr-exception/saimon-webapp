import React from "react";
import Contacts from "./Components/Contacts/Contacts";
import Thread from "./Components/Thread/Thread";
const Chats = () => {
  return (
    <div className="col-xs-12 h-full">
      <div className="row h-full">
        <div className="col-xs-3">
          <Contacts />
        </div>
        <div className="col-xs-9 bg-secondary h-full flex flex-col justify-center items-center p-0 border-l-2 border-solid border-gray-lighter">
          <Thread />
        </div>
      </div>
    </div>
  );
};

export default Chats;
