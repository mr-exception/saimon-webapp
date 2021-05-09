import React, { useState } from "react";
import "./styles.css";
import SendIcon from "img/send.svg";
import { useDispatch, useSelector } from "react-redux";
import { selectAppKey, selectSelectedContact } from "redux/types/selectors";
import Key from "core/Key/Key";
import { addMessage } from "redux/actions/conversations";
import Message from "Classes/Message/Message";
import Client from "core/Client/Client";
import { v4 as uuidV4 } from "uuid";
const SendBox: React.FC<ISendBoxProps> = () => {
  const app_key = useSelector(selectAppKey);
  const selected_contact = useSelector(selectSelectedContact);
  const [content, set_content] = useState("");
  const dispatch = useDispatch();
  if (!selected_contact) {
    return null;
  }
  const send = async () => {
    const dst_key = Key.generateKeyByPublicKey(selected_contact.public_key);
    const message = new Message(
      {
        id: 0,
        contact_id: 0,
        public_key: app_key.getPublicKeyNormalized(),
        content: Buffer.from(content),
        status: "SENDING",
        date: Date.now(),
        box_type: "SENT",
        network_id: uuidV4(),
      },
      "SENDING"
    );
    await message.store();
    dispatch(addMessage(message));
    Client.sendMessage(message, dst_key);
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
