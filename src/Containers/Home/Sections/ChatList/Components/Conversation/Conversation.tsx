import React from "react";
import Styles from "./styles.module.css";
import { IConversationProps } from "./def";
import { useDispatch } from "react-redux";
import { showContactDetailsModal } from "Redux/actions/modals";
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
      className={`${Styles.conversation} ${is_selected ? Styles.selected : ""}`}
    >
      <div className={Styles.icon}>
        <img
          src="/Images/avatar.svg"
          className={Styles.iconImage}
          alt="avatar"
        />
      </div>
      <div className={Styles.content}>
        <div className={Styles.contentName}>
          <label>{`${contact.first_name} ${contact.last_name}`}</label>
        </div>
        <div className="flex-1 flex flex-col justify-start items-start">
          <label className="last-message">{last_message}</label>
        </div>
      </div>
      <div className={Styles.actions}>
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
