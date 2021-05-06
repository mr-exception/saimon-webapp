interface IConversationProps {
  name: string;
  last_message: string;
  avatar?: File;
  selected: () => void;
  is_selected: boolean;
}
