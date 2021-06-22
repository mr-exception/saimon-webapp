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
    <div className="chat-detail-sent-message-row flex flex-col justify-start items-start p-8">
      <div className="chat-detail-sent-message-row__content p-4 border-2 bg-secondary border-secondary rounded-xl rounded-tl-none text-white">
        {text}
      </div>
      <div className="chat-detail-sent-message-row__date text-xs">
        {generateSentAtDateString()}
      </div>
    </div>
  );
};

export default ReceivedMessageRow;
