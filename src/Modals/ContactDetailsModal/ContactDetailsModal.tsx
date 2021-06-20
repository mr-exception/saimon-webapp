import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeContact, updateContact } from "redux/actions/contacts";
import {
  closeContactDetailsModal,
  showConfirmationModal,
} from "redux/actions/modals";
import { IInitialState } from "redux/types/states";
import TextField from "ui-kit/Form/FormField/TextField";
import Modal from "ui-kit/Modal/Modal";
import "./styles.css";
const ContactDetailsModal = () => {
  const { show, contact } = useSelector(
    (state: IInitialState) => state.modals.contact_details
  );

  const dispatch = useDispatch();
  const [first_name, set_first_name] = useState("");
  const [last_name, set_last_name] = useState("");
  const [public_key, set_public_key] = useState("");

  useEffect(() => {
    if (!!contact) {
      set_first_name(contact.first_name);
      set_last_name(contact.last_name);
      set_public_key(contact.public_key);
    }
  }, [contact]);

  const submit = () => {
    if (!contact) return;
    contact.first_name = first_name;
    contact.last_name = last_name;
    contact.public_key = public_key;
    contact.updateKey();
    contact.update();
    dispatch(updateContact(contact));
    dispatch(closeContactDetailsModal());
  };

  const remove = () => {
    if (!contact) return;
    dispatch(closeContactDetailsModal());
    dispatch(
      showConfirmationModal(
        "are you sure to delete this contact?",
        (result) => {
          if (!result) return;
          contact.delete();
          dispatch(removeContact(contact));
        }
      )
    );
  };
  return (
    <Modal
      show={show}
      close={() => {
        dispatch(closeContactDetailsModal());
      }}
    >
      <div className="add-contact__form">
        <TextField
          label="first name"
          placeHolder="green"
          value={first_name}
          onChange={set_first_name}
          validations={[{ type: "REQUIRED" }]}
        />
        <TextField
          label="last name"
          placeHolder="fox"
          value={last_name}
          onChange={set_last_name}
          validations={[{ type: "REQUIRED" }]}
        />
        <TextField
          label="public key"
          placeHolder="paste the client public key here"
          value={public_key}
          onChange={set_public_key}
          validations={[{ type: "REQUIRED" }]}
        />
      </div>
      <div className="submit-row flex flex-row justify-center">
        <button className="submit-btn" onClick={submit}>
          save changes
        </button>
        <button className="remove-btn" onClick={remove}>
          remove
        </button>
      </div>
    </Modal>
  );
};

export default ContactDetailsModal;
