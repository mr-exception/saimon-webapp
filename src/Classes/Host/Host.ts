import Entity from "Classes/Entity/Entity";
import Storage from "storage/Storage";

export default class Host extends Entity<IHost> {
  constructor(
    public name: string,
    public address: string,
    public score: number,
    public type: HostType,
    public protocl: HostProtocol,
    public advertise_period: number,
    storage: Storage
  ) {
    super(storage, "hosts");
  }
  /**
   * returns the object of entity based on entity interface
   */
  public getFormattedObject(): IHost {
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
}

export interface IHost {
  address: string;
  type: HostType;
  protocl: HostProtocol;
  name: string;
  score: number;
  advertise_period: number;
}

export type HostType = "RELAY" | "STORAGE" | "ADVERTISOR";
export type HostProtocol = "LIVE" | "REST";
