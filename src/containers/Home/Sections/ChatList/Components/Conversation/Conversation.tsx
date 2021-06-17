import React from "react";
import "./styles.css";
import DefaultAvatar from "img/avatar.svg";
const Conversation: React.FC<IConversationProps> = ({
  name,
  last_message,
  avatar,
  selected = () => {},
  is_selected,
}: IConversationProps) => {
  return (
    <div
      onClick={selected}
      className={`conversation ${is_selected ? "conversation--selected" : ""}`}
    >
      <div className="conversation__icon">
        <img
          src={DefaultAvatar}
          className="conversation__icon__image"
          alt="avatar"
        />
      </div>
      <div className="conversation_content">
        <div className="conversation_content_name flex flex-col justify-end items-start">
          <label>{name}</label>
        </div>
        <div className="flex-1 flex flex-col justify-start items-start">
          <label className="last-message">{last_message}</label>
        </div>
      </div>
      <div className="conversation_actions"></div>
    </div>
  );
};

export default Conversation;
