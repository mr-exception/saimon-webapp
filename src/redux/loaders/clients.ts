import Client from "core/Client/Client";
import Key from "core/Key/Key";
import { Dispatch } from "redux";
import { storeAppKey, storeClient } from "redux/actions/client";
import { ActionType } from "redux/types/actions";

const load = async (dispatch: Dispatch<ActionType>) => {
  const private_key = localStorage.getItem("private_key");
  let key: Key;
  let client: Client;
  if (private_key) {
    key = Key.generateKeyByPrivateKey(private_key);
    client = new Client(key);
  } else {
    key = Key.generateFreshKey();
    localStorage.setItem("private_key", key.getPrivateKey());
    client = new Client(key);
  }
  dispatch(storeClient(client));
  dispatch(storeAppKey(key));
  // // subscribe to all
  // client.onMessage$.subscribe(
  //   ({ content, address }: { content: Buffer; address: string }) => {
  //     const message = new Message(
  //       "not defined",
  //       "not defined",
  //       address,
  //       content,
  //       "RECEIVED",
  //       Date.now(),
  //       "DELIVERED",
  //       storage
  //     );
  //     dispatch(addMessage(message));
  //   }
  // );
  // // subscribe to host connections state
  // client.onConnectionStates$
  //   .pipe(
  //     filter((connection_state) => {
  //       return (
  //         connection_state.state === "CONNECTED" ||
  //         connection_state.state === "DISCONNECTED" ||
  //         connection_state.state === "CONNECTING" ||
  //         connection_state.state === "NETWORK_ERROR"
  //       );
  //     })
  //   )
  //   .subscribe(({ connection_id, state, address }) =>
  //     dispatch(storeConnectionState(connection_id, state, address))
  //   );
};

export default load;
