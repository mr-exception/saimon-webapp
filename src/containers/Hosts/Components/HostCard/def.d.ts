interface IHostCardProps {
  host: IHost;
}
interface IHost {
  address: string;
  port: number;
  type: "RELAY" | "STORAGE" | "ADVERTISOR";
  protocl: "LIVE" | "REST";
  name: string;
  score: number;
  advertise_period: number;
}
