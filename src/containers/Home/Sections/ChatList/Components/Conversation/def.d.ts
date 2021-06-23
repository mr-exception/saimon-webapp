import Contact from "Classes/Contact/Contact";

export interface IConversationProps {
  last_message: string;
  contact: Contact;
  selected: () => void;
  is_selected: boolean;
}
