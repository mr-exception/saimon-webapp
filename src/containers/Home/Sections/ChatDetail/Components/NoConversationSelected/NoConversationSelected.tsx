import React from "react";
import "./styles.css";
const NoConversationSelected: React.FC<INoConversationSelectedProps> = () => {
  return (
    <div className="flex flex-col justify-center items-center no-conversation-selected">
      <div className="no-conversation-selected__content flex justify-center items-center bg-base rounded-xl">
        no conversation is selected
      </div>
    </div>
  );
};

export default NoConversationSelected;
