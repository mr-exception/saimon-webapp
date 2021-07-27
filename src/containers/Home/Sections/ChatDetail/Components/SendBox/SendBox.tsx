import React, { useState } from "react";
import Styles from "./styles.module.css";
import { useDispatch, useSelector } from "react-redux";
import { selectClient, selectedContact } from "Redux/types/selectors";
import Key from "Classes/Key/Key";
import { addMessage } from "Redux/actions/conversations";
import Message, { IMessageContent } from "Classes/Message/Message";
import { v4 as uuidV4 } from "uuid";
import { useRef } from "react";
const SendBox: React.FC<ISendBoxProps> = () => {
  const selected_contact = useSelector(selectedContact);
  const [content, set_content] = useState("");
  const client = useSelector(selectClient);
  const dispatch = useDispatch();
  const fileInput = useRef<HTMLInputElement>(null);

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
      packets: "[]",
    });
    await message.store();
    dispatch(addMessage(message));
    client.sendMessage(message, dst_key);
    set_content("");
  };

  const selectFiles = (files: FileList) => {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      const reader = new FileReader();
      reader.onload = async () => {
        const base64 = reader.result as string;
        const content: IMessageContent = {
          type: "FILE",
          name: file.name,
          size: file.size,
          payload: base64,
        };

        const dst_key = Key.generateKeyByPublicKey(selected_contact.public_key);
        const message = new Message({
          id: 0,
          contact_id: selected_contact.id,
          public_key: selected_contact.public_key,
          content: JSON.stringify(content),
          status: "SENDING",
          date: Date.now(),
          box_type: "SENT",
          network_id: uuidV4(),
          packets: "[]",
        });
        await message.store();
        dispatch(addMessage(message));
        client.sendMessage(message, dst_key);
      };

      reader.readAsDataURL(file);
    }
  };
  return (
    <div className={Styles.container}>
      <div className={Styles.content}>
        <textarea
          onKeyUp={(event) => {
            if (event.ctrlKey && event.key === "Enter") {
              send();
            }
          }}
          value={content}
          onChange={(e) => set_content(e.target.value)}
          className={Styles.input}
        ></textarea>
      </div>
      <div className={Styles.send}>
        <button
          className={Styles.sendButton}
          onClick={() => {
            fileInput.current?.click();
          }}
        >
          <img
            className={Styles.buttonIcon}
            src="/Images/attach.svg"
            alt="send"
          />
          <input
            type="file"
            ref={fileInput}
            hidden
            onChange={(event) => {
              if (event.target.files) {
                selectFiles(event.target.files);
              }
            }}
          />
        </button>
        <button className={Styles.attachButton} onClick={send}>
          <img
            className={Styles.buttonIcon}
            src="/Images/send.svg"
            alt="send"
          />
        </button>
      </div>
    </div>
  );
};

export default SendBox;
