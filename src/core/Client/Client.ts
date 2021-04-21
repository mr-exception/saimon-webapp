import { Subject } from "rxjs";
import Connection from "../Connection/Connection";
import { IPacket } from "../Connection/def";
import Key from "../Key/Key";

export default class Client {
  private connections: Connection[] = [];
  constructor(private key: Key) {
    console.log(key.getPublicKey());
  }
  public onMessage$ = new Subject<Buffer>();
  private pending_packets: IPacket[] = [];
  /**
   * connect to host node
   */
  public async connect(server_url: string, packet_size: number) {
    const connection = new Connection(server_url, packet_size, this.key);

    await connection.connect();
    this.connections.push(connection);
    console.log("connected to " + server_url);
    // subscribe to reciecing packets
    connection.onPacketReceived((packet: IPacket) => {
      this.pending_packets.push(packet);
      this.checkPackets(packet.id, packet.count);
    });
  }
  /**
   * send message to a client node
   */
  public sendMessage(data: Buffer, address: Key) {
    this.connections.forEach((connection) => {
      connection.sendMessageToClient(data, address);
    });
  }
  /**
   * checks if a message is received
   */
  private checkPackets(id: string, count: number) {
    const packets = this.pending_packets
      .filter((packet) => {
        if (packet.id !== id) return null;
        return packet;
      })
      .sort((pa, pb) => pa.position - pb.position);
    if (packets.length === count) {
      const message = packets
        .map((packet) => {
          return this.key.decryptPrivate(packet.payload);
        })
        .reduce((prev, cur) => Buffer.concat([prev, cur]));

      this.pending_packets = this.pending_packets.filter((packet) =>
        packet.id === id ? null : packet
      );

      this.onMessage$.next(message);
    }
  }
}
