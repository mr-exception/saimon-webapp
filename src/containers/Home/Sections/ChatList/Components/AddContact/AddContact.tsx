import React from "react";
import { useDispatch } from "react-redux";
import { showAddContactModal } from "Redux/actions/modals";
import "./styles.css";
const AddContact: React.FC<IAddContactProps> = () => {
  const dispatch = useDispatch();
  return (
    <div className="add-contact border-b-2 border-base flex flex-row justify-center items-center">
      <button
        onClick={() => {
          dispatch(showAddContactModal());
        }}
        className="add-contact__button rounded-lg bg-secondary border-secondary text-white border-2 p-2 hover:bg-primary hover:border-primary"
      >
        add new contact
      </button>
    </div>
  );
};

export default AddContact;
