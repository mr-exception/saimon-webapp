import React from "react";
import "./styles.css";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAppKey,
  selectFirstName,
  selectLastName,
} from "Redux/types/selectors";
import TextField from "UI-Kit/Form/FormField/TextField";
import { updateFirstName, updateLastName } from "Redux/actions/profile";
/**
 * profile features:
 * edit the account information
 * copy the address into clipboard
 * change the address
 * remove profile from device
 */
const Profile = () => {
  const app_key = useSelector(selectAppKey);
  const first_name = useSelector(selectFirstName);
  const last_name = useSelector(selectLastName);

  const dispatch = useDispatch();

  const copyAddress = async () => {
    const permission = await navigator.permissions.query({
      name: "clipboard-write",
    });
    if (permission.state === "granted") {
      navigator.clipboard.writeText(app_key.getAddress());
    }
  };
  return (
    <div className="profile-container">
      <div className="general-information">
        <div className="first-name">
          <TextField
            label="first name"
            placeHolder="jasmine"
            value={first_name}
            onChange={(value: string) => {
              dispatch(updateFirstName(value));
            }}
          />
          <TextField
            label="last name"
            placeHolder="nikara"
            value={last_name}
            onChange={(value: string) => {
              dispatch(updateLastName(value));
            }}
          />
        </div>
      </div>
      <div className="address-box">
        <span className="w-full">{app_key.getAddress()}</span>
        <button
          onClick={copyAddress}
          className="absolute bottom-2 right-2 b-2 border-secondary bg-secondary hover:bg-primary hover:border-primary rounded-md text-white p-2 "
        >
          <img className="copy-icon" src="/Images/copy.svg" alt="copy icon" />
        </button>
      </div>
    </div>
  );
};

export default Profile;
