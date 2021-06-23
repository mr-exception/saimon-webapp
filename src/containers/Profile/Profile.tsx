import React from "react";
import "./styles.css";
import { useSelector } from "react-redux";
import { selectAppKey } from "redux/types/selectors";
const Profile = () => {
  const app_key = useSelector(selectAppKey);
  return (
    <div className="profile-container flex flex-row h-full justify-center items-center">
      <div className="address-box bg-base border-2 border-secondary rounded-lg p-8 flex flex-row justify-center items-center">
        <span className="w-full">{app_key.getPublicKeyNormalized()}</span>
      </div>
    </div>
  );
};

export default Profile;
