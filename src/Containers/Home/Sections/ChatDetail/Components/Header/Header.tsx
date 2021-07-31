import React from "react";
import Styles from "./styles.module.css";
import { showContactDetailsModal } from "Redux/actions/modals";
import { IHeaderProps } from "./def";
import { useDispatch } from "react-redux";
const Header: React.FC<IHeaderProps> = ({ contact }: IHeaderProps) => {
  const dispatch = useDispatch();
  return (
    <div className={Styles.container}>
      <div className={Styles.avatar}>
        <img
          src="/Images/avatar.svg"
          className={Styles.avatarImage}
          alt="avatar"
        />
      </div>
      <div className={Styles.content}>
        <div className={Styles.name}>
          <label>{`${contact.first_name} ${contact.last_name}`}</label>
        </div>
        <div className={Styles.lastOnline}>
          <label>{contact.getStatusStr()}</label>
          <label className="text-xs mt-1 ml-4">
            (
            {contact
              .getActiveRelays()
              .map((record) => record.name)
              .join(",")}
            )
          </label>
        </div>
      </div>
      <div className={Styles.headerInfo}>
        <button className={Styles.actions}>
          <img
            src="/Images/menu.svg"
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
