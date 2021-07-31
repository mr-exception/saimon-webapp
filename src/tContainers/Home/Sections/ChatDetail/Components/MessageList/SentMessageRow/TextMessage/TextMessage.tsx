import React from "react";
import { ITextMessageProps } from "./def";
import Styles from "./styles.module.css";
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
    <div className={Styles.messageRow}>
      <div className={Styles.content}>{text}</div>
      <div className={Styles.date}>
        {generateSentAtDateString()} ( {status} )
      </div>
    </div>
  );
};

export default TextMessage;
