import { AuthContext } from "AuthContextProvider";
import { useGetContact } from "DataContext/ContactsContextProvider";
import React, { useContext } from "react";
import { FaTrash } from "react-icons/fa";
import { IThread } from "Structs/Thread";
import { IRecord } from "Utils/storage";
interface IProps {
  thread: IRecord<IThread>;
  onSelected: () => void;
}
const ThreadCard: React.FC<IProps> = ({ thread, onSelected }) => {
  const { address } = useContext(AuthContext);
  const contactsAddress = thread.value.members.find(
    (record) => record !== address
  );
  const contact = useGetContact(contactsAddress);

  if (!contact) {
    return (
      <div
        className={
          "col-xs-12 cursor-pointer rounded-md hover:bg-secondary transition-all"
        }
        onClick={() => {}}
      >
        test
      </div>
    );
  }
  return (
    <div
      className={
        "col-xs-12 cursor-pointer rounded-md hover:bg-secondary transition-all"
      }
      onClick={onSelected}
    >
      <div className="row">
        <div className="col-xs-10">
          <div className="row">
            <div className="col-xs-12 text-lg font-bold">
              {contact.value.name}
            </div>
            <div className="col-xs-12">Hey! how you doin?</div>
          </div>
        </div>
        <div className="col-xs-2">
          <div className="row">
            <div className="col-xs-12 flex justify-center mt-2">
              <FaTrash
                className="text-warning cursor-pointer"
                onClick={() => {
                  // showModal(<RemoveContactModal id={id} close={closeModal} />, "sm");
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

export default ThreadCard;
