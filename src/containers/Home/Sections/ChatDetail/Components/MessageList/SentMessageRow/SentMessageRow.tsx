import React from "react";
import { ISentMessageRowProps } from "./def";
import TextMessage from "./TextMessage/TextMessage";
import FileMessage from "./FileMessage/FileMessage";

const SentMessageRow: React.FC<ISentMessageRowProps> = ({
  message,
}: ISentMessageRowProps) => {
  switch (message.getMessageType()) {
    case "TEXT":
      return (
        <TextMessage
          text={message.getText()}
          sent_at={message.date}
          status={message.status}
        />
      );
    case "FILE":
      return (
        <FileMessage
          sent_at={message.date}
          status={message.status}
          name={message.getName()}
          size={message.getSize()}
          base64={message.getBase64File()}
        />
      );
    default:
      return null;
  }
};

export default SentMessageRow;
