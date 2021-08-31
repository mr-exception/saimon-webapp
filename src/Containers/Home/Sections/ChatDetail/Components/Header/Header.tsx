import React from "react";
import Styles from "./styles.module.css";
import { showContactDetailsModal } from "Redux/actions/modals";
import { IHeaderProps } from "./def";
import { useDispatch } from "react-redux";
import Info from "Images/Info";
import Profile from "Images/Profile";
import Tooltip from "Ui-Kit/Tooltip/Tooltip";
const Header: React.FC<IHeaderProps> = ({ contact }: IHeaderProps) => {
  const dispatch = useDispatch();
  return (
    <div className={Styles.container}>
      <div className={Styles.avatar}>
        <Profile />
      </div>
      <div className={Styles.content}>
        <div className={Styles.name}>
          <label>{`${contact.first_name} ${contact.last_name}`}</label>
        </div>
        <Tooltip />
        <div data-tip={contact.getRouteListStr()} className={Styles.lastOnline}>
          <label>{contact.getStatusStr()}</label>
        </div>
      </div>
      <div
        className={Styles.headerInfo}
        onClick={() => {
          dispatch(showContactDetailsModal(contact));
        }}
      >
        <Info />
      </div>
    </div>
  );
};

export default Header;
