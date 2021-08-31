import React from "react";
import { IReceivedMessageRowProps } from "./def";
import TextMessage from "./TextMessage/TextMessage";
import Styles from "./styles.module.css";
import FileMessage from "./FileMessage/FileMessage";
import { generateDateString } from "Utils/date";

const ReceivedMessageRow: React.FC<IReceivedMessageRowProps> = ({
  message,
}: IReceivedMessageRowProps) => {
  const renderMessageContent = () => {
    switch (message.getMessageType()) {
      case "TEXT":
        return <TextMessage text={message.getText()} />;
      case "FILE":
        return (
          <FileMessage
            name={message.getName()}
            size={message.getSize()}
            base64={message.getBase64File()}
          />
        );
      default:
        return null;
    }
  };
  return (
    <div className={Styles.messageRow}>
      {renderMessageContent()}
      <div className={Styles.date}>{generateDateString(message.date)}</div>
    </div>
  );
};

export default ReceivedMessageRow;
