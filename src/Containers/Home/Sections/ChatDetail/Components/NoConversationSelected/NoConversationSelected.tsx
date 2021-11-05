import React from "react";
import Styles from "./styles.module.css";
const NoConversationSelected: React.FC<INoConversationSelectedProps> = () => {
  return (
    <div className="row justify-center h-full items-center">
      <div className="col-md-6 col-sm-10 col-lg-6">
        <div className={Styles.message}>
          you haven't selected any conversation from the left column. please
          choose a conversation to show it's messages here
        </div>
      </div>
    </div>
  );
};

export default NoConversationSelected;
