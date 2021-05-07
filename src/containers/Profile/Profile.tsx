import Key from "core/Key/Key";
import React from "react";
import "./styles.css";
import { useSelector } from "react-redux";
import { selectClient } from "redux/types/selectors";
const Profile = () => {
  const client = useSelector(selectClient);
  return (
    <div className="profile-container">
      <div className="address-box">
        {Key.normalizeKey(client.getPublicKey())}
      </div>
    </div>
  );
};

export default Profile;
