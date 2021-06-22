import axios from "axios";
import Entity from "Classes/Entity/Entity";
import Key from "core/Key/Key";
import store from "redux/store";
import {} from "redux/";
import { editHost } from "redux/actions/hosts";
export default class Host extends Entity<IHost> {
  public name: string;
  public address: string;
  public score: number;
  public type: HostType;
  public protocl: HostProtocol;
  public advertise_period: number;

  constructor(host_record: IHost, public client_key: Key) {
    super("hosts", host_record.id);
    this.name = host_record.name;
    this.address = host_record.address;
    this.score = host_record.score;
    this.type = host_record.type;
    this.protocl = host_record.protocl;
    this.advertise_period = host_record.advertise_period;
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
      protocl: this.protocl,
      advertise_period: this.advertise_period,
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

  public async isLive(): Promise<boolean> {
    try {
      const response = await axios.get("/heart-beat", {
        baseURL: this.address,
      });
      const service_information = response.data.service;
      this.name = service_information.name;
      this.advertise_period = service_information.ad_price;
      this.update();
      store.dispatch(editHost(this));
      return true;
    } catch (error) {
      console.log(error);
      return false;
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

export type HostType = "RELAY" | "STORAGE" | "ADVERTISER";
export type HostProtocol = "LIVE" | "RESPONDER";
