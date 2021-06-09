import React from "react";
import { useDispatch } from "react-redux";
import { showAddContactModal } from "redux/actions/modals";
import "./styles.css";
const AddContact: React.FC<IAddContactProps> = () => {
  const dispatch = useDispatch();
  return (
    <div
      className="add-contact border-b-2 flex flex-row"
      onClick={() => {
        dispatch(showAddContactModal());
      }}
    >
      <div className="rounded-lg bg-secondary border-secondary text-white border-2 p-2 hover:bg-primary hover:border-primary">
        add new contact
      </div>
    </div>
  );
};

export default AddContact;
