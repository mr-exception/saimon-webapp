import React from "react";
import "./styles.css";
const SentMessageRow: React.FC<ISentMessageRowProps> = ({
  text,
  sent_at,
  status,
}: ISentMessageRowProps) => {
  const generateSentAtDateString = () => {
    const date = new Date(sent_at);
    return `${date.getHours()}:${date.getMinutes()}`;
  };
  return (
    <div className="chat-detail-sent-message-row">
      <div className="chat-detail-sent-message-row__content">{text}</div>
      <div className="chat-detail-sent-message-row__date">
        {generateSentAtDateString()} ( {status} )
      </div>
    </div>
  );
};

export default SentMessageRow;
