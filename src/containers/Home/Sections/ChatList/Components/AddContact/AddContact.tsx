import React from "react";
import { useDispatch } from "react-redux";
import { showAddContactModal } from "redux/actions/modals";
import "./styles.css";
const AddContact: React.FC<IAddContactProps> = () => {
  const dispatch = useDispatch();
  return (
    <div
      className="add-contact"
      onClick={() => {
        dispatch(showAddContactModal());
      }}
    >
      <div className="add-contact__btn">add new contact</div>
    </div>
  );
};

export default AddContact;
