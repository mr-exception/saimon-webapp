import React, { useState } from "react";
import "./styles.css";
import { useDispatch, useSelector } from "react-redux";
import { selectClient, selectedContact } from "redux/types/selectors";
import Key from "core/Key/Key";
import { addMessage } from "redux/actions/conversations";
import Message from "Classes/Message/Message";
import { v4 as uuidV4 } from "uuid";
const SendBox: React.FC<ISendBoxProps> = () => {
  const selected_contact = useSelector(selectedContact);
  const [content, set_content] = useState("");
  const client = useSelector(selectClient);
  const dispatch = useDispatch();
  if (!selected_contact) {
    return null;
  }
  const send = async () => {
    const dst_key = Key.generateKeyByPublicKey(selected_contact.public_key);
    const message = new Message({
      id: 0,
      contact_id: selected_contact.id,
      public_key: selected_contact.public_key,
      content: JSON.stringify({ type: "TEXT", payload: content }),
      status: "SENDING",
      date: Date.now(),
      box_type: "SENT",
      network_id: uuidV4(),
    });
    await message.store();
    dispatch(addMessage(message));
    client.sendMessage(message, dst_key);
    set_content("");
  };
  return (
    <div className="chat-detail-send-box flex flex-row border-t-2 border-base">
      <div className="chat-detail-send-box__content flex flex-col p-2">
        <textarea
          onKeyUp={(event) => {
            if (event.ctrlKey && event.key === "Enter") {
              send();
            }
          }}
          value={content}
          onChange={(e) => set_content(e.target.value)}
          className="chat-detail-send-box__content__input rounded-lg border-2 border-base"
        ></textarea>
      </div>
      <div className="chat-detail-send-box__send flex flex-row py-4 justify-center">
        <button
          className="chat-detail-send-box__send__button bg-secondary border-2 border-secondary flex justify-center items-center"
          onClick={send}
        >
          <img
            className="chat-detail-send-box__send__button__icon"
            src="/img/send.svg"
            alt="send"
          />
        </button>
        <button
          className="chat-detail-send-box__send__button bg-secondary border-2 border-secondary flex justify-center items-center"
          onClick={send}
        >
          <img
            className="chat-detail-send-box__send__button__icon"
            src="/img/attach.svg"
            alt="send"
          />
        </button>
      </div>
    </div>
  );
};

export default SendBox;
