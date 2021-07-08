import configs from "confg";
import {
  ConnectionStatus,
  IClientState,
  IPacket,
  IPacketGot,
  IPacketTTD,
  PacketSendStatus,
} from "core/Connection/def";
import Key from "core/Key/Key";
import { Subject } from "rxjs";
import { io, Socket } from "socket.io-client";
import Message from "Classes/Message/Message";
import store from "redux/store";
import { storeConnectionState } from "redux/actions/client";
import Host, { HostProtocol, HostType } from "./Host";
import { IReportMessage } from "Classes/Queue/def";
import Queue from "Classes/Queue/Queue";
import { v4 as uuidV4 } from "uuid";
export default class RelayHost extends Host {
  // props
  private _socket?: Socket;
  private _host_key?: Key;
  private _pending_ttd_packets: IPacketTTD[] = [];
  // observables
  private _finished$ = new Subject<void>();
  private _onPacketGot$ = new Subject<IPacketTTD>();
  // sending packets queues
  private _sending_packet_queue = new Queue<IPacket>();

  // event listeners
  public connectionStatusChanged(state: ConnectionStatus): void {
    store.dispatch(storeConnectionState(this.id, state));
  }
  public updateClientState(state: IClientState): void {
    console.log(state);
  }

  /**
   * listen to an event once and async
   */
  public static async onAsyncStatic<T>(
    socket: Socket,
    event: string
  ): Promise<T> {
    return new Promise((resolve) => {
      socket.once(event, (data: T) => {
        resolve(data);
      });
    });
  }
  /**
   * start the handshake progress with host node
   */
  public async connect(): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      this._socket = io(this.address, {
        transports: ["polling"],
      });
      this._socket.on("connect_error", (error) => {
        this.connectionStatusChanged("NETWORK_ERROR");
        reject("connection error");
        this.close();
      });
      // listen to socket on disconnecting
      this._socket.on("disconnect", () => {
        this.connectionStatusChanged("DISCONNECTED");
      });
      this.connectionStatusChanged("CONNECTING");
      // HK: waits for host node to send its public key
      const host_public_key = await RelayHost.onAsyncStatic<string>(
        this._socket,
        "HK"
      );

      // set time out for connection progrss
      const timeout = setTimeout(() => {
        reject("timeout");
      }, 30000);

      this.connectionStatusChanged("HK");
      // got HK, creates the host key
      this._host_key = Key.generateKeyByPublicKey(host_public_key);
      // CK: sends client node public key to host node
      this._socket.emit("CK", this.client_key.getPublicKey());
      this.connectionStatusChanged("CK");
      // VQ: waits for host node to return a verfication question
      // encrypted by client node public key
      const vq_cipher = await RelayHost.onAsyncStatic<string>(
        this._socket,
        "VQ"
      );
      this.connectionStatusChanged("VQ");
      // decrypts the verification question by client node private key
      const va = this.client_key.decryptPrivate(vq_cipher);
      // encrypts the verifiction answer by host node public key
      const va_cipher = this._host_key.encryptPublic(va);
      // VA: sends the verification answer
      this._socket.emit("VA", va_cipher);
      this.connectionStatusChanged("VA");
      // VS: waits if host accepted the verifictaion
      this._socket.once("VS", () => {
        resolve(true);
        this.connectionStatusChanged("CONNECTED");
        this.startListeningToHost();
        this._continueQueue();
        clearTimeout(timeout);
      });
      // VF: waits if host refused the verification
      this._socket.once("VF", () => {
        this.connectionStatusChanged("VF");
      });
    });
  }
  /**
   * closes all the events on this connection
   */
  public close() {
    if (this._socket) {
      this._socket.disconnect();
      this._socket.close();
    }
  }
  /**
   * start listening host node events
   */
  public startListeningToHost() {
    if (!this._socket) {
      throw new Error("connection is dead");
    }
    // listen to packet event from host node
    this._socket.on("pck", (packet_cipher: string, ackCallback) => {
      const packet_buffer = this.client_key.decryptPrivate(packet_cipher);
      const packet = JSON.parse(packet_buffer.toString()) as IPacket;
      console.log("got a packet and sending deliver ack");
      store.getState().client.packetReceived(packet);
      ackCallback("got");
    });
    // listen to packet got event from host node
    this._socket.on("pck_got", (packet_got_chiper: string, ackCallback) => {
      const packet_got_buffer =
        this.client_key.decryptPrivate(packet_got_chiper);
      const packet_got: IPacketGot = JSON.parse(packet_got_buffer.toString());
      const packet_tdd = this.getPacketTTD(packet_got.id, packet_got.position);
      if (packet_tdd) {
        this._onPacketGot$.next({
          id: packet_got.id,
          position: packet_got.position,
          time: Date.now() - packet_tdd.time,
        });
        this.removePacketTTD(packet_got.id, packet_got.position);
      }
      ackCallback("got");
    });
    // listen to any client state changed through this connection
    this._socket.on("status_update", (cipher: string, ackCallback) => {
      if (!this._socket) return;
      const state = JSON.parse(
        this.client_key.decryptPrivate(cipher).toString()
      ) as IClientState;
      // send client state into upper layout
      this.updateClientState(state);
    });
  }
  /**
   * get the TTD information of a packet
   */
  public getPacketTTD(id: string, position: number): IPacketTTD | undefined {
    return this._pending_ttd_packets.find(
      (packet) => packet.id === id && packet.position === position
    );
  }
  /**
   * remove the information of a packet TTD
   */
  public removePacketTTD(id: string, position: number) {
    this._pending_ttd_packets = this._pending_ttd_packets.filter((packet) =>
      packet.id === id && packet.position === position ? null : packet
    );
  }
  /**
   * send message to a client by address
   */
  public async sendMessageToClient(message: Message, dest_key: Key) {
    const content = Buffer.from(JSON.stringify(message.content));
    const length = content.length;
    const packet_count = Math.ceil(length / configs.packet_length);
    const data_parts: Buffer[] = [];
    for (let i = 0; i < packet_count; i++) {
      data_parts.push(
        content.slice(
          i * configs.packet_length,
          (i + 1) * configs.packet_length
        )
      );
    }
    const parts_cipher = await Promise.all(
      data_parts.map((part) => {
        return new Promise<string>((resolve) => {
          resolve(dest_key.encryptPublic(this.client_key.encryptPrivate(part)));
        });
      })
    );
    parts_cipher.forEach(async (part, position) => {
      if (!this._socket) throw new Error("connection is dead");
      const packet: IPacket = {
        id: message.network_id,
        payload: part,
        position,
        count: packet_count,
        dst: dest_key.getAddress(),
        src: this.client_key.getAddress(),
      };
      this.addPacketToSendingQueue(packet);
    });
  }
  /**
   * send a single direct packet to host
   */
  public async sendPacket(packet: IPacket): Promise<PacketSendStatus> {
    return new Promise((resolve, reject) => {
      if (!this._socket) {
        return reject("connection is dead");
      }
      if (!this._host_key) {
        return reject("host key is not valid");
      }
      const packet_string = JSON.stringify(packet);
      const packet_encrypted = this._host_key.encryptPublic(
        Buffer.from(packet_string)
      );

      // add packet ttd object to list
      this._pending_ttd_packets.push({
        id: packet.id,
        position: packet.position,
        time: Date.now(),
      });

      // const sending_time = Date.now();
      this._socket.emit(
        "pck",
        packet_encrypted,
        (ack_data: PacketSendStatus) => {
          // const ttr = Date.now() - sending_time;
          // this._ttr_avg =
          //   (this._ttr_avg * this._ttr_count + ttr) / (this._ttr_count + 1);
          // this._ttr_count++;
          console.log(ack_data);
          resolve(ack_data);
        }
      );
      setTimeout(() => {
        resolve("FAILED");
      }, configs.packet_ack_timeout);
    });
  }
  /**
   * sends the report message to a destination
   */
  public sendReportMessage(message: IReportMessage, dest_key: Key): void {
    const cipher = dest_key.encryptPublic(
      this.client_key.encryptPrivate(JSON.stringify(message))
    );
    const packet: IPacket = {
      id: uuidV4(),
      payload: cipher,
      position: 0,
      count: 1,
      dst: dest_key.getAddress(),
      src: this.client_key.getAddress(),
    };
    this.addPacketToSendingQueue(packet);
  }
  /**
   * this function adds another packet to sending packet queue
   * the sending queue will handle the packet sendings itself
   */
  public addPacketToSendingQueue(packet: IPacket): void {
    this._sending_packet_queue.push(packet);
    this._continueQueue();
  }
  /**
   * this methods gets a job from sending packet queue
   * if there was any job remaning in queue the packet
   * sends it otherwise ignores
   */
  private async _continueQueue(): Promise<void> {
    const packet = this._sending_packet_queue.pull();
    if (!!packet) {
      await this.sendPacket(packet);
      // store
      //   .getState()
      //   .client.updateDeliverPendingPacket(
      //     packet.id,
      //     packet.position,
      //     packet.count,
      //     result
      //   );
      this._continueQueue();
    }
  }
}

export interface IHost {
  id: number;
  address: string;
  type: HostType;
  protocl: HostProtocol;
  name: string;
  score: number;
  advertise_period: number;
}
