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
    <div className="chat-detail-header flex flex-row">
      <div className="chat-detail-header__avatar flex flex-col justify-center align-center items-center">
        <img
          src={avatar ? DefaultAvatar : DefaultAvatar}
          className="chat-detail-header__avatar__image"
          alt="avatar"
        />
      </div>
      <div className="chat-detail-header__content flex flex-col">
        <div className="chat-detail-header__content__name flex justify-start items-center">
          <label>{name}</label>
        </div>
        <div className="chat-detail-header__content__last_online flex justify-start items-center">
          <label>{generateLastOnlineDateText()}</label>
        </div>
      </div>
      <div className="chat-detail-header__info flex flex-col">info</div>
    </div>
  );
};

export default Header;
