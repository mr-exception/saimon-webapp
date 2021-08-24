import Client from "Classes/Client/Client";
import Key from "Classes/Key/Key";
import { ActionType, STORE_APP_KEY, STORE_CLIENT } from "Redux/types/actions";

export const storeClient = (client: Client): ActionType => {
  return { type: STORE_CLIENT, client };
};

export const storeAppKey = (app_key: Key): ActionType => {
  return { type: STORE_APP_KEY, app_key };
};
