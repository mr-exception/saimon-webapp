import Client from "core/Client/Client";
import { ConnectionStatus } from "core/Connection/def";
import {
  ActionType,
  STORE_CLIENT,
  STORE_CONNECTION_STATE,
} from "redux/types/actions";

export const storeClient = (client: Client): ActionType => {
  return { type: STORE_CLIENT, client };
};

export const storeConnectionState = (
  connection_id: string,
  state: ConnectionStatus,
  address: string
): ActionType => {
  return {
    type: STORE_CONNECTION_STATE,
    host_connection_state: { connection_id, state, address },
  };
};
