import React from "react";
import { useMemo } from "react";
import { IFileMessageProps } from "./def";
import "./styles.css";
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
    <div className="message-row">
      <div className="message-row__content flex flex-row">
        <div className="download" onClick={download}>
          <img src="/img/download.svg" alt="download" />
        </div>
        <div className="name">
          {name} ({sizeText})
        </div>
      </div>
      <div className="message-row__date">
        {generateSentAtDateString()} ( {status} )
      </div>
    </div>
  );
};

export default TextMessage;
