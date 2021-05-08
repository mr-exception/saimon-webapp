import React, { useState } from "react";
import "./styles.css";
import SendIcon from "img/send.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  selectClient,
  selectSelectedContact,
  selectStorage,
} from "redux/types/selectors";
import Key from "core/Key/Key";
import { addMessage } from "redux/actions/conversations";
import Message from "Classes/Message/Message";
const SendBox: React.FC<ISendBoxProps> = () => {
  const client = useSelector(selectClient);
  const storage = useSelector(selectStorage);
  const selected_contact = useSelector(selectSelectedContact);
  const [content, set_content] = useState("");
  const dispatch = useDispatch();
  if (!selected_contact) {
    return null;
  }
  const send = () => {
    const dst_key = Key.generateKeyByPublicKey(selected_contact.public_key);
    client.sendMessage(Buffer.from(content), dst_key);
    dispatch(
      addMessage(
        new Message(
          "me",
          "me",
          Key.normalizeKey(client.getPublicKey()),
          Buffer.from(content),
          "SENT",
          Date.now(),
          "SENDING",
          storage
        )
      )
    );
    set_content("");
  };
  return (
    <div className="chat-detail-send-box">
      <div className="chat-detail-send-box__content">
        <textarea
          onKeyUp={(event) => {
            if (event.ctrlKey && event.key === "Enter") {
              send();
            }
          }}
          value={content}
          onChange={(e) => set_content(e.target.value)}
          className="chat-detail-send-box__content__input"
        ></textarea>
      </div>
      <div className="chat-detail-send-box__send">
        <button className="chat-detail-send-box__send__button" onClick={send}>
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
