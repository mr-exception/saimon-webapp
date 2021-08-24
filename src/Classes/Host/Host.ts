import axios from "axios";
import DBModel from "Classes/DBModel/DBModel";
import Key from "Classes/Key/Key";
import store from "Redux/store";
import { updateHost } from "Redux/actions/hosts";
import { ConnectionStatus } from "Classes/Connection/def";
export default class Host extends DBModel<IHost> {
  public name: string;
  public address: string;
  public score: number;
  public type: HostType;
  public protocol: HostProtocol;
  public advertise_period: number;
  public state: ConnectionStatus = "NOT_FOUND";
  public tta: number = 0;
  /**
   * disabled can be toggled by user interaction. for example when user disconnects
   * a host, it means this host must be offline and not be used in future connections.
   * helps the client to decide which host need auto-connect progress on network
   * issues or startup
   */
  public disabled: boolean;

  constructor(host_record: IHost, public client_key: Key) {
    super("hosts", host_record.id, store.getState().storage);
    this.name = host_record.name;
    this.address = host_record.address;
    this.score = host_record.score;
    this.type = host_record.type;
    this.protocol = host_record.protocol;
    this.advertise_period = host_record.advertise_period;
    this.disabled = host_record.disabled;

    if (host_record.protocol === "RESPONDER") {
      this.state = "CONNECTED";
    }
  }
  /**
   * returns the object of entity based on entity interface
   */
  public getFormattedObject(): any {
    return {
      name: this.name,
      address: this.address,
      score: this.score,
      type: this.type,
      protocol: this.protocol,
      advertise_period: this.advertise_period,
      disabled: this.disabled,
    };
  }
  public getAdvertisePeriod(): string {
    if (this.advertise_period > 1000000000) {
      return `${(this.advertise_period / 1000000000).toFixed(2)}GB`;
    }
    if (this.advertise_period > 1000000) {
      return `${(this.advertise_period / 1000000).toFixed(2)}MB`;
    }
    if (this.advertise_period > 1000) {
      return `${(this.advertise_period / 1000).toFixed(2)}KB`;
    }
    return `${this.advertise_period}B`;
  }
  // event listeners
  public setState(value: ConnectionStatus): void {
    this.state = value;
    store.dispatch(updateHost(this));
  }

  public async isLive(): Promise<boolean> {
    try {
      const response = await axios.get("/heart-beat", {
        baseURL: this.address,
      });
      const service_information = response.data.service;
      this.name = service_information.name;
      this.advertise_period = service_information.ad_price;
      this.update();
      store.dispatch(updateHost(this));
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  public async disable(): Promise<boolean> {
    try {
      this.disabled = true;
      this.update();
      store.dispatch(updateHost(this));
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  public async enable(): Promise<boolean> {
    try {
      this.disabled = false;
      this.update();
      store.dispatch(updateHost(this));
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  public setTTA(value: number) {
    this.tta = value;
  }

  public isConnected(): boolean {
    return this.state === "CONNECTED";
  }
  public isDisconnected(): boolean {
    return (
      this.state === "DISCONNECTED" ||
      this.state === "NETWORK_ERROR" ||
      this.state === "NOT_FOUND"
    );
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
  disabled: boolean;
}

export type HostType = "RELAY" | "STORAGE" | "ADVERTISER";
export type HostProtocol = "LIVE" | "RESPONDER";
