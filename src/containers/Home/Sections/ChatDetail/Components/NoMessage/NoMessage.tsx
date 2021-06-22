import React from "react";
import "./styles.css";
const NoMessage: React.FC<INoMessageProps> = () => {
  return (
    <div className="no-message">
      <div className="no-message__content">
        you have no message with this contact
      </div>
    </div>
  );
};

export default NoMessage;
