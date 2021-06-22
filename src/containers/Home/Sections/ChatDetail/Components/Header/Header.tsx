import React from "react";
import DefaultAvatar from "img/avatar.svg";
import Actions from "img/menu.svg";
import "./styles.css";
import { showContactDetailsModal } from "redux/actions/modals";
import { IHeaderProps } from "./def";
import { useDispatch } from "react-redux";
const Header: React.FC<IHeaderProps> = ({
  contact,
  last_online,
}: IHeaderProps) => {
  const dispatch = useDispatch();
  const generateLastOnlineDateText = () => {
    const date = new Date(last_online);
    return `${date.getFullYear()}/${date.getMonth()}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
  };
  return (
    <div className="chat-detail-header">
      <div className="chat-detail-header__avatar">
        <img
          src={DefaultAvatar}
          className="chat-detail-header__avatar__image"
          alt="avatar"
        />
      </div>
      <div className="chat-detail-header__content">
        <div className="chat-detail-header__content__name">
          <label>{`${contact.first_name} ${contact.last_name}`}</label>
        </div>
        <div className="chat-detail-header__content__last_online">
          <label>{generateLastOnlineDateText()}</label>
        </div>
      </div>
      <div className="chat-detail-header__info">
        <button className="btn-actions">
          <img
            src={Actions}
            alt="actions"
            onClick={() => {
              dispatch(showContactDetailsModal(contact));
            }}
          />
        </button>
      </div>
    </div>
  );
};

export default Header;
