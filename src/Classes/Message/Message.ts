import DBModel from "Classes/DBModel/DBModel";
import { PacketSendStatus } from "Classes/Connection/def";
import { updateMessage } from "Redux/actions/conversations";
import store from "Redux/store";

export default class Message extends DBModel<IMessage> {
  public network_id: string;
  public contact_id: number;
  public public_key: string;
  public content: string;
  public box_type: BoxType;
  public date: number;
  public status: MessageSentState;
  public packets: IPacketDeliverState[];
  public packets_count?: number;
  constructor(message_record: IMessage) {
    super("messages", message_record.id, store.getState().storage);
    this.network_id = message_record.network_id;
    this.contact_id = message_record.contact_id;
    this.public_key = message_record.public_key;
    this.content = message_record.content;
    this.box_type = message_record.box_type;
    this.date = message_record.date;
    this.status = message_record.status;
    this.packets = JSON.parse(message_record.packets) as IPacketDeliverState[];
    this.packets_count = message_record.packets_count;
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
      packets: JSON.stringify(this.packets),
      packets_count: this.packets_count,
    };
    return data;
  }

  /**
   * returns the messae content
   */
  public getContent(): IMessageContent {
    let content = JSON.parse(this.content);
    while (typeof content === "string") {
      content = JSON.parse(content);
    }
    return content as IMessageContent;
  }
  /**
   * returns message type
   */
  public getMessageType(): MessageType {
    return this.getContent().type;
  }

  public getText(): string {
    const content = this.getContent();
    if (content.type === "TEXT") {
      return content.payload;
    } else {
      return "";
    }
  }
  public async getfile(): Promise<Blob | undefined> {
    const content = this.getContent();
    if (content.type === "FILE") {
      const blob = await (await fetch(content.payload)).blob();
      return blob;
    }
  }

  public getBase64File(): string {
    const content = this.getContent();
    if (content.type === "FILE") {
      return content.payload;
    }
    return "";
  }

  public getSize(): number {
    const content = this.getContent();
    return content.size || 0;
  }
  public getName(): string {
    const content = this.getContent();
    return content.name || "no-name";
  }

  public getPacketDeliverState(
    position: number
  ): IPacketDeliverState | undefined {
    return this.packets.find((record) => record.position === position);
  }
  public setPacketDeliverState(position: number, state: PacketSendStatus) {
    const record = this.getPacketDeliverState(position);
    if (record) {
      record.state = state;
    } else {
      this.packets.push({ position, state });
    }
    this.updateMessageStateBasedOnPackets();
    this.update();
    store.dispatch(updateMessage(this));
  }

  /**
   * declare message deliver status based on packet acks
   * notice: this method won't work till all packet acks are retrived from hosts
   */
  public updateMessageStateBasedOnPackets() {
    if (!this.packets_count) return;
    if (this.packets_count !== this.packets.length) return;
    if (!!this.packets.find((record) => record.state === "FAILED")) {
      // we have failed packet, so the message delivery is failed
      this.status = "FAILED";
    }
    this.status = "DELIVERED";
  }
}
export interface IMessage {
  id: number;
  network_id: string;
  contact_id: number;
  public_key: string;
  content: string;
  box_type: BoxType;
  date: number;
  status: MessageSentState;
  packets: string;
  packets_count?: number;
}

export interface IMessageContent {
  type: MessageType;
  payload: string;
  name?: string;
  size?: number;
}

export type MessageSentState = "SENT" | "DELIVERED" | "SENDING" | "FAILED";
export type BoxType = "SENT" | "RECEIVED";
export type MessageType =
  | "TEXT"
  | "IMAGE"
  | "AUDIO"
  | "MOVIE"
  | "FILE"
  | "REPORT";

export interface IPacketDeliverState {
  state: PacketSendStatus;
  position: number;
}
