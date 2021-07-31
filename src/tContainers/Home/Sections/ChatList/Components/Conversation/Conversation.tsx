import React from "react";
import "./styles.css";
import { useDispatch } from "react-redux";
import { showContactDetailsModal } from "Redux/actions/modals";
import { IConversationProps } from "./def";
const Conversation: React.FC<IConversationProps> = ({
  last_message,
  selected = () => {},
  is_selected,
  contact,
}: IConversationProps) => {
  const dispatch = useDispatch();
  return (
    <div
      onClick={selected}
      className={`conversation ${is_selected ? "conversation--selected" : ""}`}
    >
      <div className="conversation__icon">
        <img
          src="/Images/avatar.svg"
          className="conversation__icon__image"
          alt="avatar"
        />
      </div>
      <div className="conversation_content">
        <div className="conversation_content_name flex flex-col justify-end items-start">
          <label>{`${contact.first_name} ${contact.last_name}`}</label>
        </div>
        <div className="flex-1 flex flex-col justify-start items-start">
          <label className="last-message">{last_message}</label>
        </div>
      </div>
      <div className="conversation_actions">
        <button
          onClick={(e) => {
            e.stopPropagation();
            dispatch(showContactDetailsModal(contact));
          }}
          className="flex flex-1"
        >
          <img src="/Images/menu.svg" alt="actions" />
        </button>
      </div>
    </div>
  );
};

export default Conversation;
