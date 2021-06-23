import AdvertiserHost from "Classes/Host/AdvertiserHost";
import RelayHost from "Classes/Host/RelayHost";
import StorageHost from "Classes/Host/StorageHost";

export interface IRelayHostCardProps {
  host: RelayHost;
}
export interface IAdvertiserHostCardProps {
  host: AdvertiserHost;
}
export interface IStorageHostCardProps {
  host: StorageHost;
}
