import React from "react";
import ReactDOM from "react-dom";
import AddContactModal from "./AddContactModal/AddContactModal";
import AddHostModal from "./AddHostModal/AddHostModal";
import ConfirmationModal from "./ConfirmationModal/ConfirmaionModal";
import ContactDetailsModal from "./ContactDetailsModal/ContactDetailsModal";
const Modals = () => {
  const modalRootDom = document.getElementById("modal-root");
  if (modalRootDom === null) return null;
  return ReactDOM.createPortal(
    <>
      <AddContactModal />
      <AddHostModal />
      <ContactDetailsModal />
      <ConfirmationModal />
    </>,
    modalRootDom
  );
};

export default Modals;
