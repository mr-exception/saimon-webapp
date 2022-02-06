import { weiToPweiFixed } from "Utils/currency";

export interface IHost {
  url: string;
  name: string;
  commission_fee: number;
  subscription_fee: number;
  paid_subscription: boolean;
  rt: number;
  secret: string;
}

export interface IHeartBeat {
  name: string;
  commission_fee: number;
  subscription_fee: number;
  time: number;
  paid_subscription: boolean;
}

export function subscriptionFee(host: IHost | IHeartBeat): string {
  if (!host.paid_subscription) {
    return "free";
  } else {
    return weiToPweiFixed(host.subscription_fee);
  }
}
