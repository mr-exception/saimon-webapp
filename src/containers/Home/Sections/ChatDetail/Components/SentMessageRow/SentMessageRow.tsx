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
    <div className="chat-detail-sent-message-row flex flex-col justify-start items-end p-8">
      <div className="chat-detail-sent-message-row__content p-4 border-2 border-base rounded-xl rounded-tr-none">
        {text}
      </div>
      <div className="chat-detail-sent-message-row__date text-xs">
        {generateSentAtDateString()} ( {status} )
      </div>
    </div>
  );
};

export default SentMessageRow;
