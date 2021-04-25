import React from "react";
import DefaultAvatar from "img/avatar.svg";
import "./styles.css";
const Header: React.FC<IHeaderProps> = ({
  name,
  last_online,
  avatar,
}: IHeaderProps) => {
  const generateLastOnlineDateText = () => {
    const date = new Date(last_online);
    return `${date.getFullYear()}/${date.getMonth()}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
  };
  return (
    <div className="chat-detail-header">
      <div className="chat-detail-header__avatar">
        <img
          src={avatar ? DefaultAvatar : DefaultAvatar}
          className="chat-detail-header__avatar__image"
          alt="avatar"
        />
      </div>
      <div className="chat-detail-header__content">
        <div className="chat-detail-header__content__name">
          <label>{name}</label>
        </div>
        <div className="chat-detail-header__content__last_online">
          <label>{generateLastOnlineDateText()}</label>
        </div>
      </div>
      <div className="chat-detail-header__info">info</div>
    </div>
  );
};

export default Header;
