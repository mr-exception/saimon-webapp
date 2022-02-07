import { ModalsContext } from "Modals/ModalsContextProvider";
import React, { useContext } from "react";
import { FaPlus } from "react-icons/fa";
import Button from "Ui-Kit/Button/Button";
import ContactCard from "./Components/ContactCard/ContactCard";
import CreateContactModal from "./Components/CreateContactModal/CreateContactModal";
import Styles from "./styles.module.css";
const Contacts = () => {
  const { showModal, closeModal } = useContext(ModalsContext);
  return (
    <div className={"row block " + Styles.fixHeight}>
      <div className="col-xs-12 flex justify-end items-center p-2">
        <Button
          className="w-full flex justify-center items-center"
          size="md"
          onClick={() => {
            showModal(<CreateContactModal close={closeModal} />);
          }}
        >
          <FaPlus />
        </Button>
      </div>
      <ContactCard />
      <ContactCard />
    </div>
  );
};

export default Contacts;
