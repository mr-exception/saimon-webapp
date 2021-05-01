import React from "react";
import "./styles.css";
import Modal from "ui-kit/Modal/Modal";
import { IInitialState } from "redux/types/states";
import { useDispatch, useSelector } from "react-redux";
import { closeConfirmationModal } from "redux/actions/modals";
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
      <div className="confirmation__description">{message}</div>
      <div className="confirmation__description">
        <button
          onClick={() => {
            console.log("yes");
            callback(true);
            dispatch(closeConfirmationModal());
          }}
        >
          yes
        </button>
        <button
          onClick={() => {
            callback(false);
            dispatch(closeConfirmationModal());
          }}
        >
          cancel
        </button>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
