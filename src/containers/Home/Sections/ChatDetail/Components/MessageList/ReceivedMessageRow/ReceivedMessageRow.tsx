import React from "react";
import { IReceivedMessageRowProps } from "./def";
import TextMessage from "./TextMessage/TextMessage";

const ReceivedMessageRow: React.FC<IReceivedMessageRowProps> = ({
  message,
}: IReceivedMessageRowProps) => {
  switch (message.getMessageType()) {
    case "TEXT":
      return <TextMessage text={message.getText()} sent_at={message.date} />;
    default:
      return null;
  }
};

export default ReceivedMessageRow;
