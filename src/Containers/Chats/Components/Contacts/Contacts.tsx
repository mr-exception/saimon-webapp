import React from "react";
import { FaPlus } from "react-icons/fa";
import Button from "Ui-Kit/Button/Button";
import ContactCard from "./ContactCard/ContactCard";
import Styles from "./styles.module.css";
const Contacts = () => {
  return (
    <div className={"row block " + Styles.fixHeight}>
      <div className="col-xs-12 flex justify-end items-center p-2">
        <Button className="w-full flex justify-center items-center" size="md" onClick={() => {}}>
          <FaPlus />
        </Button>
      </div>
      <ContactCard />
      <ContactCard />
    </div>
  );
};

export default Contacts;
