import DownloadIcon from "Images/DownloadIcon";
import React from "react";
import { useMemo } from "react";
import { IFileMessageProps } from "./def";
import Styles from "./styles.module.css";
const TextMessage: React.FC<IFileMessageProps> = ({
  name,
  size,
  base64,
}: IFileMessageProps) => {
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
    <div className={Styles.container}>
      <div className="download" onClick={download}>
        <DownloadIcon fill="white" />
      </div>
      <div className={Styles.name}>
        {name} ({sizeText})
      </div>
    </div>
  );
};

export default TextMessage;
