import Entity from "Classes/Entity/Entity";
import { IPacket, PacketSendStatus } from "core/Connection/def";

export default class Message extends Entity<IMessage> {
  public network_id: string;
  public contact_id: number;
  public public_key: string;
  public content: Buffer;
  public box_type: BoxType;
  public date: number;
  public status: MessageSentState;
  constructor(message_record: IMessage) {
    super("messages", message_record.id);
    this.network_id = message_record.network_id;
    this.contact_id = message_record.contact_id;
    this.public_key = message_record.public_key;
    this.content = message_record.content;
    this.box_type = message_record.box_type;
    this.date = message_record.date;
    this.status = message_record.status;
  }
  /**
   * returns the object of entity based on entity interface
   */
  public getFormattedObject(): any {
    const data = {
      network_id: this.network_id,
      contact_id: this.contact_id,
      public_key: this.public_key,
      content: this.content.toString(),
      box_type: this.box_type,
      date: this.date,
      status: this.status,
    };
    return data;
  }
}
export interface IMessageState {
  id: string;
  count: number;
  packets: { position: number; status: PacketSendStatus }[];
}
export interface IIncomingMessagePackets {
  id: string;
  contact_id: number;
  count: number;
  packets: IPacket[];
}
export interface IMessage {
  id: number;
  network_id: string;
  contact_id: number;
  public_key: string;
  content: Buffer;
  box_type: BoxType;
  date: number;
  status: MessageSentState;
}
export type MessageSentState = "SENT" | "DELIVERED" | "SENDING" | "FAILED";
export type BoxType = "SENT" | "RECEIVED";
