export interface IPacket {
  id: string; // id
  payload: string; // payload
  position: number; // position of packet in sending message
  count: number; // count of packets in sending message
  dst?: string; // public key of destination node
}

export type ConnectionStatus =
  | "CONNECTING"
  | "HK"
  | "CK"
  | "VA"
  | "VQ"
  | "VF"
  | "NETWORK_ERROR"
  | "CONNECTED"
  | "DISCONNECTED";
