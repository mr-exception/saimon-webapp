import Key from "Classes/Key/Key";
import { env } from "process";
import { v4 as uuidV4 } from "uuid";

const PACKET_SIZE = 2000;
async function handle(
  content: string,
  address: string,
  host_ids: number[],
  app_key: Key
) {
  const dest_key = Key.generateKeyByPublicKey(address);
  // chunk content into smaller packets
  const length = content.length;
  const packet_count = Math.ceil(length / PACKET_SIZE);
  const data_parts = [];
  for (let i = 0; i < packet_count; i++) {
    const plain = content.substr(i * PACKET_SIZE, PACKET_SIZE);
    data_parts.push(plain);
  }

  const parts_cipher = await Promise.all(
    data_parts.map((part) => {
      return new Promise<string>((resolve) => {
        resolve(dest_key.encryptPublic(app_key.encryptPrivate(part)));
      });
    })
  );

  // define an uuid for message
  const id = uuidV4();
  // each host must send how many packets
  const host_debt = packet_count / host_ids.length;
  for (let i = 0; i < host_ids.length; i++) {
    const host_id = host_ids[i];
    for (let j = i * host_debt; j < (i + 1) * host_debt; j++) {
      postMessage(
        {
          data: {
            cipher: parts_cipher[j],
            dst: dest_key.getAddress(),
            host_id,
            id,
            position: j,
            count: parts_cipher.length,
          },
          event: "packets.send",
        },
        env.PUBLIC_URL
      );
    }
  }
}
export default handle;
