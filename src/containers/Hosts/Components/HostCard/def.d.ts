interface IHostCardProps {
  host: IHost;
}
interface IHost {
  address: string;
  type: HostType;
  protocl: HostProtocol;
  name: string;
  score: number;
  advertise_period: number;
}
type HostType = "RELAY" | "STORAGE" | "ADVERTISOR";
type HostProtocol = "LIVE" | "REST";
