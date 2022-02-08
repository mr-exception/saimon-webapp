import { ContactsContext } from "DataContext/ContactsContextProvider";
import { useContext } from "react";
import { FaPencilAlt, FaTrash } from "react-icons/fa";

const Header = () => {
  const { activeContact } = useContext(ContactsContext);
  if (!activeContact) return null;
  return (
    <div className="w-full border-b-2 border-gray-lighter border-solid" style={{ minHeight: 50 }}>
      <div className="col-xs-12">
        <div className="row">
          <div className="col-xs-8 mt-1 text-2xl">{activeContact.value.name}</div>
          <div className="col-xs-4 mt-1 flex flex-row justify-end">
            <FaTrash size={20} className="m-2 text-warning cursor-pointer" />
            <FaPencilAlt size={20} className="m-2 cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
