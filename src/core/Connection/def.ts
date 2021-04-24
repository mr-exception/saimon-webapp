export interface IPacket {
  id: string; // id
  payload: string; // payload
  position: number; // position of packet in sending message
  count: number; // count of packets in sending message
  dst?: string; // public key of destination node
}

export interface IPacketGot {
  id: string; // id
  position: number; // position
}

export interface IPacketTTD extends IPacketGot {
  time: number;
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

/**
 * state of a client connection to the host ndoe
 */
export interface IClientState {
  address: string;
  state: ConnectionStatus;
}

export interface IClientStateInConnection extends IClientState {
  connection_id: string;
}

export type SendStatus = "DELIVERED" | "RESERVED" | "FAILED";
