import React from "react";
import "./styles.css";
import Modal from "UI-Kit/Modal/Modal";
import { IInitialState } from "Redux/types/states";
import { useDispatch, useSelector } from "react-redux";
import { closeConfirmationModal } from "Redux/actions/modals";
const ConfirmationModal = () => {
  const { show, message, callback } = useSelector(
    (state: IInitialState) => state.modals.confirmation
  );
  const dispatch = useDispatch();
  return (
    <Modal
      show={show}
      close={() => {
        callback(false);
        dispatch(closeConfirmationModal());
      }}
    >
      <div className="confirmation__message flex justify-center items-center content-center px-8 pt-8">
        {message}
      </div>
      <div className="confirmation__actions flex justify-center items-center content-center px-8 pb-8 mt-4">
        <button
          className="action-button bg-danger p-2 border-2 rounded-lg border-danger text-white mr-2 hover:bg-warning hover:border-warning uppercase"
          onClick={() => {
            callback(true);
            dispatch(closeConfirmationModal());
          }}
        >
          yes
        </button>
        <button
          className="action-button bg-secondary p-2 border-2 rounded-lg border-secondary text-white mr-2 hover:bg-primary hover:border-primary uppercase"
          onClick={() => {
            callback(false);
            dispatch(closeConfirmationModal());
          }}
        >
          no
        </button>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
