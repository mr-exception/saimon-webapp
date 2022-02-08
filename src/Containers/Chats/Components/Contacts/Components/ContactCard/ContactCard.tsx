import { IndexableType } from "dexie";
import { ModalsContext } from "Modals/ModalsContextProvider";
import React, { useContext } from "react";
import { FaTrash } from "react-icons/fa";
import { IContact } from "Structs/Contact";
import RemoveContactModal from "./Components/RemoveContactModal/RemoveContactModal";
interface IProps {
  contact: IContact;
  id: IndexableType;
}
const ContactCard: React.FC<IProps> = ({ contact, id }) => {
  const { showModal, closeModal } = useContext(ModalsContext);
  return (
    <div className="col-xs-12 cursor-pointer hover:bg-secondary transition-all">
      <div className="row">
        <div className="col-xs-10">
          <div className="row">
            <div className="col-xs-12 text-lg font-bold">{contact.name}</div>
            <div className="col-xs-12">Hey! how you doin?</div>
          </div>
        </div>
        <div className="col-xs-2">
          <div className="row">
            <div className="col-xs-12 flex justify-center mt-2">
              <FaTrash
                className="text-warning cursor-pointer"
                onClick={() => {
                  showModal(<RemoveContactModal id={id} close={closeModal} />, "sm");
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-secondary w-full my-2 h-1 opacity-30" />
    </div>
  );
};

export default ContactCard;
