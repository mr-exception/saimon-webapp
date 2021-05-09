import React from "react";
import "./styles.css";
import { useSelector } from "react-redux";
import { selectAppKey } from "redux/types/selectors";
const Profile = () => {
  const app_key = useSelector(selectAppKey);
  return (
    <div className="profile-container">
      <div className="address-box">{app_key.getPublicKeyNormalized()}</div>
    </div>
  );
};

export default Profile;
