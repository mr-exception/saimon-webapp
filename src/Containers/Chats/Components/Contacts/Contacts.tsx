import { ContactsContext } from "DataContext/ContactsContextProvider";
import { ModalsContext } from "Modals/ModalsContextProvider";
import { useContext } from "react";
import { FaPlus } from "react-icons/fa";
import Button from "Ui-Kit/Button/Button";
import ContactCard from "./Components/ContactCard/ContactCard";
import CreateContactModal from "./Components/CreateContactModal/CreateContactModal";
import Styles from "./styles.module.css";
const Contacts = () => {
  const { showModal, closeModal } = useContext(ModalsContext);
  const { contacts } = useContext(ContactsContext);
  return (
    <div className={Styles.contactList}>
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
      {contacts.map((contact) => (
        <ContactCard key={contact.id.toString()} contact={contact.value} id={contact.id} />
      ))}
    </div>
  );
};

export default Contacts;
