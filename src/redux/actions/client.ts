import Client from "core/Client/Client";
import { ConnectionStatus } from "core/Connection/def";
import Key from "core/Key/Key";
import {
  ActionType,
  STORE_APP_KEY,
  STORE_CLIENT,
  STORE_CONNECTION_STATE,
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
