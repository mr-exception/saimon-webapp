import DownloadIcon from "img/DownloadIcon";
import React from "react";
import { useMemo } from "react";
import { IFileMessageProps } from "./def";
import Styles from "./styles.module.css";
const TextMessage: React.FC<IFileMessageProps> = ({
  sent_at,
  status,
  name,
  size,
  base64,
}: IFileMessageProps) => {
  const generateSentAtDateString = () => {
    const date = new Date(sent_at);
    return `${date.getHours()}:${date.getMinutes()}`;
  };

  const sizeText = useMemo(() => {
    if (size > 1000000) {
      return `${(size / 1000000).toFixed(2)} MB`;
    }
    if (size > 1000) {
      return `${(size / 1000).toFixed(2)} KB`;
    }
    return `${size} B`;
  }, [size]);

  const download = () => {
    const element = document.createElement("a");
    element.href = base64;
    element.download = name;
    element.click();
    element.remove();
  };
  return (
    <div className={Styles.messageRow}>
      <div className={Styles.messageContent}>
        <div className="download" onClick={download}>
          <DownloadIcon fill="white" />
        </div>
        <div className="name">
          {name} ({sizeText})
        </div>
      </div>
      <div className="message-row__date">{generateSentAtDateString()}</div>
    </div>
  );
};

export default TextMessage;
