import React from "react";
import "./styles.css";
import SendIcon from "img/send.svg";
const SendBox: React.FC<ISendBoxProps> = () => {
  return (
    <div className="chat-detail-send-box">
      <div className="chat-detail-send-box__content">
        <textarea className="chat-detail-send-box__content__input"></textarea>
      </div>
      <div className="chat-detail-send-box__send">
        <button className="chat-detail-send-box__send__button">
          <img
            className="chat-detail-send-box__send__button__icon"
            src={SendIcon}
            alt="send"
          />
        </button>
      </div>
    </div>
  );
};

export default SendBox;
