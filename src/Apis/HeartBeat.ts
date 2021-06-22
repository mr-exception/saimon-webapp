import axios from "axios";
import { HostProtocol, HostType } from "Classes/Host/Host";

interface IHeartBeatResponse {
  ok: boolean;
  service: IServiceInfo;
}
export interface IServiceInfo {
  ad_price: string;
  protocol: HostProtocol;
  port: string;
  type: HostType;
  name: string;
}
export const getHeartBeat = async (baseURL: string): Promise<IServiceInfo> =>
  axios.get<IHeartBeatResponse>("/heart-beat", { baseURL }).then((response) => {
    return response.data.service;
  });
