import React from "react";
import { ITextMessageProps } from "./def";
import "./styles.css";
const TextMessage: React.FC<ITextMessageProps> = ({
  text,
  sent_at,
  status,
}: ITextMessageProps) => {
  const generateSentAtDateString = () => {
    const date = new Date(sent_at);
    return `${date.getHours()}:${date.getMinutes()}`;
  };
  return (
    <div className="message-row flex flex-col justify-start items-end p-8">
      <div className="message-row__content p-4 border-2 border-base rounded-xl rounded-tr-none">
        {text}
      </div>
      <div className="message-row__date text-xs">
        {generateSentAtDateString()} ( {status} )
      </div>
    </div>
  );
};

export default TextMessage;
