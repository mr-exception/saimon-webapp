import React from "react";
import { ITextMessageProps } from "./def";
import Styles from "./styles.module.css";
const TextMessage: React.FC<ITextMessageProps> = ({
  text,
}: ITextMessageProps) => {
  return <div className={Styles.content}>{text}</div>;
};

export default TextMessage;
