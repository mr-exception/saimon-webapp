export type MessageType = "text" | "file" | "image" | "audio";
export interface IMessage {
  type: MessageType;
  data: string;
  src: string;
  dst: string;
}
