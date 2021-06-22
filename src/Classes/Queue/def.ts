import Contact from "Classes/Contact/Contact";
import AdvertiserHost from "Classes/Host/AdvertiserHost";
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
