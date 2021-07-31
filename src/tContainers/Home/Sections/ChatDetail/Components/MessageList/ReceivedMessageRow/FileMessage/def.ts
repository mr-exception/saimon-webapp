import { MessageSentState } from "Classes/Message/Message";

export interface IFileMessageProps {
  sent_at: number;
  status: MessageSentState;
  name: string;
  size: number;
  base64: string;
}
