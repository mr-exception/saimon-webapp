import React from "react";
import Styles from "./styles.module.css";
const NoConversationSelected: React.FC<INoConversationSelectedProps> = () => {
  return (
    <div className={Styles.container}>
      <div className={Styles.message}>
        you haven't selected any conversation from the left column. please
        choose a conversation to show it's messages here
      </div>
    </div>
  );
};

export default NoConversationSelected;
