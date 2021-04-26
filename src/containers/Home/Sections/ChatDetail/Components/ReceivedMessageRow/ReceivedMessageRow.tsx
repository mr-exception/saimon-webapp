import React from "react";
import "./styles.css";
const ReceivedMessageRow: React.FC<IReceivedMessageRowProps> = ({
  text,
  sent_at,
}: IReceivedMessageRowProps) => {
  const generateSentAtDateString = () => {
    const date = new Date(sent_at);
    return `${date.getHours()}:${date.getMinutes()}`;
  };
  return (
    <div className="chat-detail-received-message-row">
      <div className="chat-detail-received-message-row__content">{text}</div>
      <div className="chat-detail-received-message-row__date">
        {generateSentAtDateString()}
      </div>
    </div>
  );
};

export default ReceivedMessageRow;
