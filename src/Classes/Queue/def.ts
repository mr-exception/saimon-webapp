import Contact from "Classes/Contact/Contact";
import AdvertisorHost from "Classes/Host/AdvertisorHost";

export interface IAdvertiserRequest {
  type: "HEART_BEAT" | "FETCH";
  host: AdvertisorHost;
  contact?: Contact;
}
