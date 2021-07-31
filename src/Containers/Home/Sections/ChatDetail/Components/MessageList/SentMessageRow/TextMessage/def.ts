import { MessageSentState } from "Classes/Message/Message";

export interface ITextMessageProps {
  text: string;
  sent_at: number;
  status: MessageSentState;
}
