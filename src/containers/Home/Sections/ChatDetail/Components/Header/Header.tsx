import React from "react";
import Styles from "./styles.module.css";
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
    <div className={Styles.container}>
      <div className={Styles.avatar}>
        <img
          src="/img/avatar.svg"
          className={Styles.avatarImage}
          alt="avatar"
        />
      </div>
      <div className={Styles.content}>
        <div className={Styles.name}>
          <label>{`${contact.first_name} ${contact.last_name}`}</label>
        </div>
        <div className={Styles.lastOnline}>
          <label>{generateLastOnlineDateText()}</label>
        </div>
      </div>
      <div className={Styles.headerInfo}>
        <button className={Styles.actions}>
          <img
            src="/img/menu.svg"
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
