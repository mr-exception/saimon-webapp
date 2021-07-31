import React from "react";
import Styles from "./styles.module.css";
const NoConversationSelected: React.FC<INoConversationSelectedProps> = () => {
  return (
    <div className={Styles.container}>
      <div className={Styles.content}>no conversation is selected</div>
    </div>
  );
};

export default NoConversationSelected;
