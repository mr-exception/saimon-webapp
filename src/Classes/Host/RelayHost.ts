import configs from "confg";
import {
  ConnectionStatus,
  IClientState,
  IPacket,
  IPacketGot,
} from "Classes/Connection/def";
import Key from "Classes/Key/Key";
import { Socket, io } from "socket.io-client";
import Message from "Classes/Message/Message";
import store from "Redux/store";
import { storeConnectionState } from "Redux/actions/client";
import Host, { HostProtocol, HostType } from "./Host";
import { IReportMessage } from "Classes/Queue/def";
import Queue from "Classes/Queue/Queue";
import { v4 as uuidV4 } from "uuid";
import Contact from "Classes/Contact/Contact";
import { IInitialState } from "Redux/types/states";
import { filter } from "rxjs/operators";
export default class RelayHost extends Host {
  // props
  private _socket?: Socket;
  private _host_key?: Key;
  // sending packets queues
  private _sending_packet_queue?: Queue<IPacket> = undefined;

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
    this._socket.on(
      "pck",
      (packet_cipher: string, ackCallback: (value: string) => void) => {
        const state = store.getState() as IInitialState;
        const packet_buffer = this.client_key.decryptPrivate(packet_cipher);
        const packet = JSON.parse(packet_buffer.toString()) as IPacket;
        packet.host_id = this.id;
        state.worker.emit("packets.receive", packet);
        ackCallback("got");
      }
    );
    // listen to packet got event from host node
    this._socket.on(
      "pck_got",
      async (
        packet_got_chiper: string,
        ackCallback: (value: string) => void
      ) => {
        const state = store.getState();

        const packet_got_buffer =
          this.client_key.decryptPrivate(packet_got_chiper);
        const packet_got: IPacketGot = JSON.parse(packet_got_buffer.toString());
        const storage = state.storage;
        const message_record = await storage.getMessageByNetworkId(
          packet_got.id
        );
        if (!message_record) {
          ackCallback("got");
          return;
        }
        const message = new Message(message_record);
        message.setPacketDeliverState(packet_got.position, "DELIVERED");
        ackCallback("got");
      }
    );
    // listen to any client state changed through this connection
    this._socket.on("status_update", (cipher: string) => {
      if (!this._socket) return;
      const state = JSON.parse(
        this.client_key.decryptPrivate(cipher).toString()
      ) as IClientState;
      const contact = store
        .getState()
        .contacts.find(
          (record: Contact) => record.getAddress() === state.address
        );
      if (contact) {
        contact.updateStatus(this.id, state.state);
      }
    });
    // init and start the sending packet queue
    this._sending_packet_queue = new Queue<IPacket>(
      `relay host(${this.id}) sending`,
      this.sendPacket
    );
    this._sending_packet_queue.start();
    // subscribe to contacts who are routed through this host
    this.subscribeToContactStatuses().catch((error) => {
      console.log(`failed to subscribe`, error);
    });

    // subscribe to worker packets.send event
    store
      .getState()
      .worker.on<{
        host_id: number;
        cipher: string;
        dst: string;
        id: string;
        count: number;
        position: number;
      }>("packets.send")
      .pipe(filter((record) => record.host_id === this.id))
      .subscribe({
        next: ({ cipher, dst, id, count, position }) => {
          const packet: IPacket = {
            id,
            payload: cipher,
            position,
            count,
            dst,
            src: this.client_key.getAddress(),
          };
          this.addPacketToSendingQueue(packet);
        },
      });
  }
  /**
   * send a single direct packet to host
   */
  public sendPacket = (packet: IPacket): Promise<boolean> => {
    return new Promise((resolve) => {
      if (!this._socket) {
        console.error("connection is dead");
        return resolve(false);
      }
      if (!this._host_key) {
        console.error("host key is not valid");
        return resolve(false);
      }
      const packet_string = JSON.stringify(packet);
      const packet_encrypted = this._host_key.encryptPublic(
        Buffer.from(packet_string)
      );
      this._socket.emit("pck", packet_encrypted, () => {
        resolve(true);
      });
      setTimeout(() => {
        resolve(false);
      }, configs.packet_ack_timeout);
    });
  };
  /**
   * sends the report message to a destination
   */
  public sendReportMessage(message: IReportMessage, dest_key: Key): void {
    const cipher = dest_key.encryptPublic(
      this.client_key.encryptPrivate(
        JSON.stringify({ type: "REPORT", payload: message })
      )
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
    if (!!this._sending_packet_queue) this._sending_packet_queue.push(packet);
  }
  /**
   * get the status of clients connected to this host
   */
  public async getClientStatusList(
    address_list: string[]
  ): Promise<{ address: string; state: ConnectionStatus }[]> {
    return new Promise((resolve, reject) => {
      if (!this._socket) return reject(new Error("connection is dead"));
      if (!this._host_key) return reject(new Error("host key not found"));
      this._socket.emit(
        "status_list",
        this._host_key.encryptPublic(Buffer.from(address_list.join(","))),
        (cipher: string) => {
          const response = JSON.parse(
            this.client_key.decryptPrivate(cipher).toString()
          ) as { address: string; state: ConnectionStatus }[];
          resolve(response);
        }
      );
    });
  }
  public async subscribeToContactStatuses(): Promise<boolean> {
    const state = store.getState() as IInitialState;
    if (!this._socket) {
      throw new Error("connection is dead");
    }
    if (!this._host_key) {
      throw new Error("key not found");
    }
    const contacts = state.contacts.filter((contact) =>
      contact.relay_host_ids.includes(this.id)
    );
    const addresses = contacts.map((contact) => contact.getAddress()).join(",");
    const cipher = this._host_key.encryptPublic(addresses);
    // subscribe to addresses
    this._socket.emit("sub_status", cipher, () => {});
    // get addresses status for the first time
    this._socket.emit("status_list", cipher, (response: string) => {
      const states = JSON.parse(
        this.client_key.decryptPrivate(response).toString()
      ) as IClientState[];
      states.forEach((state) => {
        const contact = store
          .getState()
          .contacts.find(
            (record: Contact) => record.getAddress() === state.address
          );
        if (contact) {
          contact.updateStatus(this.id, state.state);
        }
      });
    });
    return true;
  }
}

export interface IHost {
  id: number;
  address: string;
  type: HostType;
  protocol: HostProtocol;
  name: string;
  score: number;
  advertise_period: number;
}
