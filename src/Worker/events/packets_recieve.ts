import { IPacket } from "Classes/Connection/def";
import Key from "Classes/Key/Key";
import { IMessageContent } from "Classes/Message/Message";
import { env } from "process";
// store receiving packets in an array
let packets: IPacket[] = [];
function handle(packet: IPacket, app_key: Key) {
  packets.push(packet);
  checkMessageIsComplete(packet.id, app_key);
}

function checkMessageIsComplete(id: string, app_key: Key) {
  // checks if there is any packet with this id in list
  const selected_packets = packets.filter((p) => p.id === id);
  if (packets.length === 0) {
    return false;
  }
  // checks if all packets are retrived
  const packets_actual_count = selected_packets[0].count;
  if (packets_actual_count !== selected_packets.length) {
    return false;
  }
  // get sending host ids
  const host_ids = selected_packets
    .filter((record) => record.host_id)
    .map((record) => record.host_id) as number[];
  // decrypt the packet
  const source_key = Key.generateKeyByPublicKey(
    `-----BEGIN PUBLIC KEY-----${selected_packets[0].src}-----END PUBLIC KEY-----`
  );

  const buffer = selected_packets
    .map((packet) => {
      return source_key.decryptPublic(
        app_key.decryptPrivate(packet.payload).toString()
      );
    })
    .reduce((prev, cur) => Buffer.concat([prev, cur]));

  const content = buffer.toString();
  const contentObject = JSON.parse(content) as IMessageContent;

  // removes packets of this string because message is complete
  packets = packets.filter((p) => p.id !== id);
  // returns selected packets
  postMessage(
    {
      event: "messages.receive",
      data: {
        content: contentObject,
        id,
        address: selected_packets[0].src,
        host_ids,
      },
    },
    env.PUBLIC_URL
  );
}
export default handle;
