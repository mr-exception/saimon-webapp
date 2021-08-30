import AdvertiserHost from "Classes/Host/AdvertiserHost";
import Host from "Classes/Host/Host";
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

export interface IHostCardProps {
  children: any;
  host: Host;
}
