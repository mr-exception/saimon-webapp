import Entity from "Classes/Entity/Entity";
import Storage from "storage/Storage";

export default class Message extends Entity<IMessage> {
  constructor(
    public first_name: string,
    public last_name: string,
    public public_key: string,
    public content: Buffer,
    public box_type: BoxType,
    public date: number,
    public status: MessageSentState,
    storage: Storage
  ) {
    super(storage, "hosts", 0);
  }
  /**
   * returns the object of entity based on entity interface
   */
  public getFormattedObject(): IMessage {
    return {
      first_name: this.first_name,
      last_name: this.last_name,
      public_key: this.public_key,
      content: this.content,
      box_type: this.box_type,
      date: this.date,
      status: this.status,
    };
  }
}

export interface IMessage {
  first_name: string;
  last_name: string;
  public_key: string;
  content: Buffer;
  box_type: BoxType;
  date: number;
  status: MessageSentState;
}
export type MessageSentState = "SENT" | "DELIVERED" | "SENDING" | "FAILED";
export type BoxType = "SENT" | "RECEIVED";
