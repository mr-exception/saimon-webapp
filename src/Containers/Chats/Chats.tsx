import React from "react";
import Contacts from "./Components/Contacts/Contacts";
const Chats = () => {
  return (
    <div className="col-xs-12 h-full">
      <div className="row h-full">
        <div className="col-xs-3">
          <Contacts />
        </div>
        <div className="col-xs-9 bg-secondary h-full">thread</div>
      </div>
    </div>
  );
};

export default Chats;
