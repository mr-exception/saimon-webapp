import Contact from "Classes/Contact/Contact";
import AdvertiserHost from "Classes/Host/AdvertiserHost";
import { HostProtocol, HostType } from "Classes/Host/Host";
import RelayHost from "Classes/Host/RelayHost";
import StorageHost from "Classes/Host/StorageHost";
import Message from "Classes/Message/Message";

export interface IAdvertiserRequest {
  type: "HEART_BEAT" | "FETCH";
  host: AdvertiserHost;
  contact?: Contact;
}

export interface IStorageRequest {
  type: "HEART_BEAT" | "FETCH" | "PUT";
  host: StorageHost;
  message?: Message;
}

export interface IRelayRequest {
  type: "HEART_BEAT";
  host: RelayHost;
}

export interface IPacketDeliverRequest {
  contact: Contact;
  content: string;
  position: number;
  count: number;
}

export interface IReportRequest {
  contact: Contact;
  once?: boolean;
}

// messages in layers
export interface IReportMessage {
  hosts: {
    address: string;
    name: string;
    score: number;
    type: HostType;
    protocol: HostProtocol;
    ad_price: number;
  }[];
  contacts: {
    address: string;
    first_name: string;
    last_name: string;
  }[];
}
