import { IContact } from "Structs/Contact";
import { IMessageData, MessageType } from "Structs/Message";
import { IPacket } from "Structs/Packet";
import { v4 as uuidV4 } from "uuid";
import Key from "Utils/Key";
import { sendPacket } from "API/Packets";
import { IHost } from "Structs/Host";

export function createMessageData(data: string, type: MessageType = "text"): IMessageData {
  return {
    data,
    type,
  };
}

export function encryptMessage(data: IMessageData, src_key: Key, dst_key: Key): string {
  const encrypted = dst_key.encryptPublic(src_key.encryptPrivate(JSON.stringify(data)));
  return encrypted;
}

export function decryptMessage(data: string, firstKey: Key, secondKey: Key): Buffer {
  return secondKey.decryptPublic(firstKey.decryptPrivate(data).toString());
}

export function decryptRecvMessage(data: string, srcKey: Key, dstKey: Key): IMessageData {
  return JSON.parse(decryptMessage(data, srcKey, dstKey).toString());
}
export function decryptSentMessage(data: string, srcKey: Key, dstKey: Key): IMessageData {
  return JSON.parse(decryptMessage(data, dstKey, srcKey).toString());
}

const packetDataLenght = 2048;
export function messageToPackets(cipher: string, src: string, dst: string, msg_id: string): IPacket[] {
  const result: IPacket[] = [];
  let offset = 0;
  let position = 0;
  const msg_count = Math.ceil(cipher.length / packetDataLenght);
  const created_at = new Date().toDateString();
  while (offset < cipher.length) {
    result.push({
      src,
      dst,
      msg_count,
      position,
      data: cipher.substring(offset, offset + packetDataLenght),
      msg_id,
      created_at,
    });
    offset += packetDataLenght;
    position += 1;
  }
  return result;
}

export async function sendMessage(
  contact: IContact,
  key: Key,
  address: string,
  data: string,
  relatedHosts: IHost[],
  type: MessageType = "text"
): Promise<void> {
  const dst_key = Key.generateKeyByPublicKey(contact.public_key);
  const messageData = createMessageData(data, type);
  const cipher = encryptMessage(messageData, key, dst_key);
  const packets = messageToPackets(cipher, address, contact.address, uuidV4());
  await Promise.allSettled(
    packets.map((packet) => {
      return new Promise((resolve, reject) => {
        sendPacket(
          {
            msg_count: packet.msg_count,
            msg_id: packet.msg_id,
            dst: packet.dst,
            data: packet.data,
            position: packet.position,
          },
          { baseUrl: relatedHosts[0].url, address, secret: relatedHosts[0].secret }
        )
          .then(resolve)
          .catch(reject);
      });
    })
  );
}

export async function sendSharedKey(contact: IContact, relatedHosts: IHost[]): Promise<void> {}
