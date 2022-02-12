import { ContactsContext } from "DataContext/ContactsContextProvider";
import { useContext } from "react";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import { IContact } from "Structs/Contact";
import { timestampToDateTime } from "Utils/string";

function onlineStatusString(contact: IContact): string {
  let active_at = Number.MIN_VALUE;
  contact.hosts.forEach((host) => {
    if (active_at < host.active_at) {
      active_at = host.active_at;
    }
  });
  if (active_at < 0) {
    return "offline";
  }
  const diff = Date.now() / 1000 - active_at;
  if (Math.abs(diff) < 120) {
    return "online";
  }
  return `offline (last activity: ${timestampToDateTime(active_at)})`;
}

const Header = () => {
  const { activeContact } = useContext(ContactsContext);
  if (!activeContact) return null;
  return (
    <div className="w-full border-b-2 border-gray-lighter border-solid" style={{ minHeight: 50 }}>
      <div className="col-xs-12">
        <div className="row">
          <div className="col-xs-8 mt-1 text-2xl">
            {activeContact.value.name} <span className="text-sm">{onlineStatusString(activeContact.value)}</span>
          </div>
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
