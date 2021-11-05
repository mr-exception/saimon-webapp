import React from "react";
import Styles from "./styles.module.css";
const NoMessage: React.FC<INoMessageProps> = () => {
  return (
    <div className="row justify-center h-full items-center">
      <div className="col-md-6 col-sm-10 col-lg-6">
        <div className={Styles.message}>
          you don't have any message with this contact. maybe they're deleted
          from your local storage or you really don't have any message!
        </div>
      </div>
    </div>
  );
};

export default NoMessage;
