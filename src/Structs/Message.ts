export type MessageType = "text" | "file" | "image" | "audio" | "shared_key";

export interface IMessageData {
  data: string;
  type: MessageType;
}
export interface IMessage {
  type: MessageType;
  data: IMessageData;
  src: string;
  dst: string;
  id: string;
}
