import React from "react";
import Styles from "./styles.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAppKey,
  selectFirstName,
  selectLastName,
} from "Redux/types/selectors";
import TextField from "Ui-Kit/Form/TextField/TextField";
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
    navigator.clipboard.writeText(app_key.getAddress());
  };
  return (
    <div className="col-md-12 flex items-center justify-center">
      <div className="row center-lg">
        <div className="col-md-6 col-sm-8">
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
          <div className="row">
            <div className="col-md-12 mb-2 text-justify">
              This is your account universal address. everyone knows you with
              this address. you can share it with anyone who wants to send
              messages to you:
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 border-2 border-solid border-secondary rounded-md p-4">
              <span className="w-full break-words">{app_key.getAddress()}</span>
              <button
                onClick={copyAddress}
                className="absolute bottom-2 right-2 b-2 border-secondary bg-secondary hover:bg-primary hover:border-primary rounded-md p-2"
              >
                <img
                  className={Styles.copyIcon}
                  src="/Images/copy.svg"
                  alt="copy icon"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
