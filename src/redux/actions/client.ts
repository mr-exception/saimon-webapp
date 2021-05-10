import { IIncomingMessagePackets } from "Classes/Message/Message";
import Client from "core/Client/Client";
import {
  ConnectionStatus,
  IPacket,
  PacketSendStatus,
} from "core/Connection/def";
import Key from "core/Key/Key";
import {
  ActionType,
  RESET_INCOMING_PACKETS,
  STORE_APP_KEY,
  STORE_CLIENT,
  STORE_CONNECTION_STATE,
  STORE_DELIVERING_PACKET_STATUS,
  STORE_INCOMING_PACKET,
} from "redux/types/actions";

export const storeClient = (client: Client): ActionType => {
  return { type: STORE_CLIENT, client };
};

export const storeAppKey = (app_key: Key): ActionType => {
  return { type: STORE_APP_KEY, app_key };
};

export const storeConnectionState = (
  connection_id: number,
  state: ConnectionStatus
): ActionType => {
  return {
    type: STORE_CONNECTION_STATE,
    host_connection_state: { connection_id, state },
  };
};

export const storeIncomingPacket = (packet: IPacket): ActionType => {
  return { type: STORE_INCOMING_PACKET, packet };
};
export const resetIncomingPackets = (
  incoming_messages: IIncomingMessagePackets[]
): ActionType => {
  return { type: RESET_INCOMING_PACKETS, incoming_messages };
};

export const storeDeliveringPacketStatus = (
  id: string,
  position: number,
  status: PacketSendStatus,
  count: number
): ActionType => {
  return {
    type: STORE_DELIVERING_PACKET_STATUS,
    packet_deliver_status: { id, position, status, count },
  };
};
