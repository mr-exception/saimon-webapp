import React from "react";
import Styles from "./styles.module.css";
const NoMessage: React.FC<INoMessageProps> = () => {
  return (
    <div className={Styles.container}>
      <div className={Styles.content}>
        you have no message with this contact
      </div>
    </div>
  );
};

export default NoMessage;
