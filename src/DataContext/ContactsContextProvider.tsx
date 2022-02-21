import { IndexableType } from "dexie";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { IContact } from "Structs/Contact";
import { deleteContactFromDB, getContactsFromDB, insertContactInDB, IRecord, updateContactInDB } from "Utils/storage";

export interface IContactsContext {
  activeContact?: IRecord<IContact>;
  setActiveContact: (value: IRecord<IContact>) => void;
  contacts: IRecord<IContact>[];
  addContact: (value: IContact) => void;
  removeContact: (id: IndexableType) => void;
  updateContact: (value: IRecord<IContact>) => void;
}

export const ContactsContext = createContext<IContactsContext>({
  setActiveContact: () => {},
  contacts: [],
  addContact: (value: IContact) => {},
  removeContact: (id: IndexableType) => {},
  updateContact: (value: IRecord<IContact>) => {},
});

export const ContactsContextProvider: React.FC<{ children: any }> = ({ children }) => {
  const [activeContact, setActiveContact] = useState<IRecord<IContact>>();
  const [contacts, setContacts] = useState<IRecord<IContact>[]>([]);
  async function addContact(value: IContact): Promise<void> {
    const id = await insertContactInDB(value);
    setContacts([...contacts, { value, id }]);
    toast.success("contact created!");
  }
  async function removeContact(id: IndexableType) {
    await deleteContactFromDB(id);
    setContacts(await getContactsFromDB());
  }
  async function updateContact(value: IRecord<IContact>) {
    await updateContactInDB(value.id, value.value);
    const result = await getContactsFromDB();
    setContacts(result);
    setActiveContact(result.find((record) => record.id === value.id));
  }
  useEffect(() => {
    getContactsFromDB().then((value) => {
      setContacts(value);
    });
  }, []);
  return (
    <ContactsContext.Provider
      value={{ contacts, addContact, removeContact, activeContact, setActiveContact, updateContact }}
    >
      {children}
    </ContactsContext.Provider>
  );
};
