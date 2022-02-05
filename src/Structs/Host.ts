export interface IHost {
  url: string;
  name: string;
  commission_fee: number;
  subscription_fee: number;
  paid_subscription: boolean;
  rt: number;
}

export interface IHeartBeat {
  name: string;
  commission_fee: number;
  subscription_fee: number;
  time: number;
  paid_subscription: boolean;
}
