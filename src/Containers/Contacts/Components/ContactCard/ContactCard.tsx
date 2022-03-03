import { ModalsContext } from "Modals/ModalsContextProvider";
import { useContext } from "react";
import { FaEye, FaTrash } from "react-icons/fa";
import { IContact } from "Structs/Contact";
import { IRecord } from "Utils/storage";
import RemoveContactModal from "./Components/RemoveContactModal/RemoveContactModal";
import Styles from "./styles.module.css";

interface IProps {
  contact: IRecord<IContact>;
}
const ContactCard: React.FC<IProps> = ({ contact: { value: contact, id } }) => {
  const { showModal, closeModal } = useContext(ModalsContext);
  return (
    <div className="col-xs-12 col-md-6 col-lg-4 flex mb-4">
      <div className={Styles.container}>
        <div className="row relative">
          <div
            className="absolute flex flex-row justify-center items-center"
            style={{ right: 0, top: -10 }}
          >
            <FaEye
              size={35}
              className="hover:bg-primary rounded-md p-2 cursor-pointer"
            />
            <FaTrash
              size={35}
              className="hover:bg-primary rounded-md p-2 cursor-pointer"
              onClick={() => {
                showModal(
                  <RemoveContactModal close={closeModal} id={id} />,
                  "sm"
                );
              }}
            />
          </div>
          <div className="col-xs-8 text-xl">{contact.name}</div>
          <div className="col-xs-12 overflow-ellipsis overflow-hidden whitespace-nowrap break-words">
            {contact.address}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactCard;
