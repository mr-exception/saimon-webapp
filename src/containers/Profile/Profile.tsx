import React from "react";
import "./styles.css";
import { useSelector } from "react-redux";
import { selectAppKey } from "redux/types/selectors";
/**
 * profile features:
 * edit the account information
 * copy the address into clipboard
 * change the address
 * remove profile from device
 */
const Profile = () => {
  const app_key = useSelector(selectAppKey);
  return (
    <div className="profile-container">
      <div className="general-information">
        <div className="first-name">
          
        </div>
      </div>
      <div className="address-box bg-base border-2 border-secondary rounded-lg p-8 flex flex-row justify-center items-center">
        <span className="w-full">{app_key.getPublicKeyNormalized()}</span>
      </div>
    </div>
  );
};

export default Profile;
