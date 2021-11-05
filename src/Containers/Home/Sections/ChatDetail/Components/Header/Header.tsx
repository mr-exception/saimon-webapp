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
    <div className="row py-2">
      <div className="col-md-2 flex justify-center items-center">
        <div style={{ width: "50%" }}>
          <Profile />
        </div>
      </div>
      <div className="col-md-9">
        <div className={Styles.name}>
          <label>{`${contact.first_name} ${contact.last_name}`}</label>
        </div>
        <Tooltip />
        <div data-tip={contact.getRouteListStr()} className={Styles.lastOnline}>
          <label>{contact.getStatusStr()}</label>
        </div>
      </div>
      <div
        className="col-md-1 flex justify-center items-center"
        onClick={() => {
          dispatch(showContactDetailsModal(contact));
        }}
      >
        <div style={{ width: "50%" }}>
          <Info />
        </div>
      </div>
    </div>
  );
};

export default Header;
