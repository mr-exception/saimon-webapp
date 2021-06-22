import React from "react";
import "./styles.css";
const NoConversationSelected: React.FC<INoConversationSelectedProps> = () => {
  return (
    <div className="no-conversation-selected">
      <div className="no-conversation-selected__content">
        no conversation is selected
      </div>
    </div>
  );
};

export default NoConversationSelected;
