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
    <div className="flex mb-4 col-xs-12 col-md-6 col-lg-4">
      <div className={Styles.container}>
        <div className="relative row">
          <div
            className="absolute flex flex-row items-center justify-center"
            style={{ right: 0, top: -10 }}
          >
            <FaEye
              size={35}
              className="p-2 rounded-md cursor-pointer hover:bg-primary"
            />
            <FaTrash
              size={35}
              className="p-2 rounded-md cursor-pointer hover:bg-primary"
              onClick={() => {
                showModal(
                  <RemoveContactModal close={closeModal} id={id} />,
                  "sm"
                );
              }}
            />
          </div>
          <div className="overflow-hidden text-xl col-xs-8 overflow-ellipsis flex-nowrap">
            {contact.name}
          </div>
          <div className="overflow-hidden break-words col-xs-12 overflow-ellipsis whitespace-nowrap">
            {contact.address}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactCard;
