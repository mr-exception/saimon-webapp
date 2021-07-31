import React from "react";
import { IReceivedMessageRowProps } from "./def";
import TextMessage from "./TextMessage/TextMessage";
import FileMessage from "./FileMessage/FileMessage";

const ReceivedMessageRow: React.FC<IReceivedMessageRowProps> = ({
  message,
}: IReceivedMessageRowProps) => {
  switch (message.getMessageType()) {
    case "TEXT":
      return <TextMessage text={message.getText()} sent_at={message.date} />;
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

export default ReceivedMessageRow;
