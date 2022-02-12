import { MessageType } from "Structs/Message";
import Key from "Utils/Key";

export async function sendMessage(
  src: string,
  dst: string,
  data: string,
  src_key: Key,
  dst_key: Key,
  type: MessageType = "text"
) {
  const encrypted = src_key.encryptPrivate(dst_key.encryptPublic(data));
  console.log(encrypted);
}
