import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { io, Socket } from "socket.io-client";
import Key from "../Key/Key";
import {
  ConnectionStatus,
  IClientState,
  IPacket,
  IPacketGot,
  IPacketTTD,
} from "./def";

export default class Connection {
  // props
  private _socket?: Socket;
  private _host_key?: Key;
  private _ttr_avg = 0;
  private _ttr_count = 0;
  private _pending_ttd_packets: IPacketTTD[] = [];
  // observables
  private _finished$ = new Subject<void>();
  private _onPacket$ = new Subject<IPacket>();
  private _connectionStatus$ = new Subject<ConnectionStatus>();
  private _onPacketGot$ = new Subject<IPacketTTD>();
  private _onClientStateChange$ = new Subject<IClientState>();

  constructor(
    private _address: string,
    private _packet_length: number,
    private _client_key: Key
  ) {}

  /**
   * this method subscribes the entered callback function to
   * the event that is triggered when a packet is recieved
   * from this connection
   */
  public onPacketReceived(callback: (packet: IPacket) => void) {
    return this._onPacket$
      .pipe(takeUntil(this._finished$))
      .subscribe((packet) => callback(packet));
  }
  /**
   * on packet got recievied
   */
  public onPacketGot(callback: (packet_got: IPacketTTD) => void) {
    return this._onPacketGot$
      .pipe(takeUntil(this._finished$))
      .subscribe((packet_got) => callback(packet_got));
  }
  /**
   * this method subscribes to the handshake and connection
   * status between client and the host node
   */
  public subscribeToConnectionStatus(
    callback: (status: ConnectionStatus) => void
  ) {
    this._connectionStatus$
      .pipe(takeUntil(this._finished$))
      .subscribe(callback);
  }
  /**
   * listens to requested clients state change
   */
  public subscribeToClientStateChange(callback: (state: IClientState) => void) {
    this._onClientStateChange$
      .pipe(takeUntil(this._finished$))
      .subscribe((state) => callback(state));
  }

  /**
   * waits async untill the first event is received from host node
   */
  public async onAsync<T>(event: string): Promise<T> {
    if (this._socket) return Connection.onAsyncStatic<T>(this._socket, event);
    else
      return new Promise((_, reject) => {
        reject("connection is dead");
      });
  }
  /**
   * start listening host node events
   */
  public startListeningToHost() {
    if (!this._socket) {
      throw new Error("connection is dead");
    }
    // listen to packet event from host node
    this._socket.on("pck_dct", (packet_cipher: string, ackCallback) => {
      const packet_buffer = this._client_key.decryptPrivate(packet_cipher);
      const packet = JSON.parse(packet_buffer.toString()) as IPacket;
      this._onPacket$.next(packet);
      ackCallback("got");
    });
    // listen to packet got event from host node
    this._socket.on("pck_got", (packet_got_chiper: string, ackCallback) => {
      const packet_got_buffer = this._client_key.decryptPrivate(
        packet_got_chiper
      );
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
      const state = JSON.parse(
        this._client_key.decryptPrivate(cipher).toString()
      ) as IClientState;
      this._onClientStateChange$.next(state);
    });
  }
  /**
   * start the handshake progress with host node
   */
  public async connect(): Promise<void> {
    this._socket = io(this._address);
    // listen to socket on disconnecting
    this._socket.on("disconnect", () => {
      this._connectionStatus$.next("DISCONNECTED");
    });
    this._connectionStatus$.next("CONNECTING");
    // HK: waits for host node to send its public key
    const host_public_key = await Connection.onAsyncStatic<string>(
      this._socket,
      "HK"
    );
    this._connectionStatus$.next("HK");
    // got HK, creates the host key
    this._host_key = Key.generateKeyByPublicKey(host_public_key);
    // CK: sends client node public key to host node
    this._socket.emit("CK", this._client_key.getPublicKey());
    this._connectionStatus$.next("CK");
    // VQ: waits for host node to return a verfication question
    // encrypted by client node public key
    const vq_cipher = await Connection.onAsyncStatic<string>(
      this._socket,
      "VQ"
    );
    this._connectionStatus$.next("VQ");
    // decrypts the verification question by client node private key
    const va = this._client_key.decryptPrivate(vq_cipher);
    // encrypts the verifiction answer by host node public key
    const va_cipher = this._host_key.encryptPublic(va);
    // VA: sends the verification answer
    this._socket.emit("VA", va_cipher);
    this._connectionStatus$.next("VA");
    // VS: waits if host accepted the verifictaion
    this._socket.once("VS", () => {
      this._connectionStatus$.next("CONNECTED");
      this.startListeningToHost();
    });
    // VF: waits if host refused the verification
    this._socket.once("VF", () => {
      this._connectionStatus$.next("VF");
    });
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
   * send a message to host node
   */
  public sendMessageToHost(data: Buffer, dst?: string) {
    const length = data.length;
    const packet_count = Math.ceil(length / this._packet_length);
    const data_parts: Buffer[] = [];
    for (let i = 0; i < packet_count; i++) {
      data_parts.push(
        data.slice(i * this._packet_length, (i + 1) * this._packet_length)
      );
    }
    data_parts.forEach((data_part, position) => {
      const packet: IPacket = {
        id: "some-random_id",
        payload: this._client_key.encryptPrivate(data_part),
        position,
        count: packet_count,
        dst,
      };
      this.sendPacket(packet);
    });
  }
  /**
   * send message to a client by address
   */
  public async sendMessageToClient(data: Buffer, dest_key: Key) {
    const length = data.length;
    const packet_count = Math.ceil(length / this._packet_length);
    const data_parts: Buffer[] = [];
    for (let i = 0; i < packet_count; i++) {
      data_parts.push(
        data.slice(i * this._packet_length, (i + 1) * this._packet_length)
      );
    }
    const parts_cipher = await Promise.all(
      data_parts.map((part) => {
        return new Promise<string>((resolve) => {
          resolve(dest_key.encryptPublic(part));
        });
      })
    );

    parts_cipher.forEach((part, position) => {
      const packet: IPacket = {
        id: "some-random_id",
        payload: part,
        position,
        count: packet_count,
        dst: dest_key.getPublicKey(),
      };
      this.sendPacket(packet);
    });
  }
  /**
   * send a single packet to host
   */
  public async sendPacket(packet: IPacket): Promise<boolean> {
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

      const sending_time = Date.now();
      this._socket.emit("pck_dct", packet_encrypted, (ack_data: string) => {
        const ttr = Date.now() - sending_time;
        this._ttr_avg =
          (this._ttr_avg * this._ttr_count + ttr) / (this._ttr_count + 1);
        this._ttr_count++;
        resolve(true);
      });
      setTimeout(() => {
        reject("timeout");
      }, 3000);
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
    this._finished$.next();
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
   * get client state
   */
  public async getClientsState(
    client_addresses: string[]
  ): Promise<IClientState[]> {
    return new Promise<IClientState[]>((resolve, reject) => {
      if (!this._socket) {
        throw new Error("connection is dead");
      }
      if (!this._host_key) {
        throw new Error("host key is not defined");
      }
      const address_string = client_addresses.join(",");
      const address_encrypted = this._host_key.encryptPublic(address_string);
      const timeout = setTimeout(() => {
        reject("timeout");
      }, 3000);
      this._socket.emit(
        "status_list",
        address_encrypted,
        (response: string) => {
          const states = JSON.parse(
            this._client_key.decryptPrivate(response).toString()
          ) as IClientState[];
          clearInterval(timeout);
          resolve(states);
        }
      );
    });
  }
  /**
   * subscribes to clients states
   */
  public async subscribeToClientsState(
    client_addresses: string[]
  ): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (!this._socket) {
        throw new Error("connection is dead");
      }
      if (!this._host_key) {
        throw new Error("host key is not defined");
      }
      const address_string = client_addresses.join(",");
      const address_encrypted = this._host_key.encryptPublic(address_string);
      const timeout = setTimeout(() => {
        reject("timeout");
      }, 3000);
      this._socket.emit("sub_status", address_encrypted, (response: string) => {
        clearInterval(timeout);
        resolve();
      });
    });
  }
  /**
   * get socket
   */
  public getSocket(): Socket | undefined {
    return this._socket;
  }
  /**
   * set socket
   */
  public setSocket(socket: Socket) {
    this._socket = socket;
  }
  /**
   * get address
   */
  public getAddress(): string {
    return this._address;
  }
  /**
   * set address
   */
  public setAddress(address: string) {
    this._address = address;
  }
  /**
   * get host key
   */
  public getHostKey(): Key | undefined {
    return this._host_key;
  }
  /**
   * set host key
   */
  public setHostKey(key: Key) {
    this._host_key = key;
  }
  /**
   * get client key
   */
  public getClientKey(): Key | undefined {
    return this._client_key;
  }
  /**
   * set client key
   */
  public setClientKey(key: Key) {
    this._client_key = key;
  }
  /**
   * get packet length
   */
  public getPacketLength(): number | undefined {
    return this._packet_length;
  }
  /**
   * set packet length
   */
  public setPacketLength(packet_length: number) {
    this._packet_length = packet_length;
  }
  /**
   * returns the ttr score of connection
   */
  public getTTRAverage(): number {
    return this._ttr_avg;
  }
  /**
   * return the ttr count of connection
   */
  public getTTRCount(): number {
    return this._ttr_count;
  }
  /**
   * get connection id
   */
  public getId(): string {
    if (this._socket) {
      return this._socket.id;
    } else {
      return "not-defined";
    }
  }
}
