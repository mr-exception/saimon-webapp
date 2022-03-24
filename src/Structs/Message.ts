import Key from "Utils/Key";
import { IPacket } from "./Packet";

export type MessageType = "text" | "file" | "image" | "audio" | "shared_key";

export interface IMessageData {
  data: string;
  type: MessageType;
}
export interface IMessage {
  type: MessageType;
  data: string;
  src: string;
  dst: string;
  id: string;
}

interface IPacketGroup {
  packets: IPacket[];
  src: string;
  dst: string;
  count: number;
  id: string;
}
export function groupPacketsByMessage(packets: IPacket[]): IPacketGroup[] {
  const result: IPacketGroup[] = [];
  for (let i = 0; i < packets.length; i++) {
    let found = false;
    for (let j = 0; j < result.length; j++) {
      if (packets[i].msg_id === result[j].id) {
        result[i].packets.push(packets[i]);
        found = true;
        break;
      }
    }
    if (!found) {
      result.push({
        packets: [packets[i]],
        src: packets[i].src,
        dst: packets[i].dst,
        id: packets[i].msg_id,
        count: packets[i].msg_count,
      });
    }
  }
  return result;
}

export function packetsToMessages(packets: IPacket[], key: Key): IMessage[] {
  const packetGroups = groupPacketsByMessage(packets);
  return packetGroups
    .map((group) => {
      if (group.packets.length < group.count) return undefined;
      const cipher = group.packets
        .sort((a, b) => a.position - b.position)
        .map((packet) => packet.data)
        .join("");
      const plain = JSON.parse(
        key.decryptPrivate(cipher).toString()
      ) as IMessageData;
      return {
        src: group.src,
        dst: group.dst,
        id: group.id,
        type: plain.type,
        data: plain.data,
      };
    })
    .filter((record) => !!record) as IMessage[];
}
