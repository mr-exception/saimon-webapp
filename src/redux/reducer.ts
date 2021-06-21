import Storage from "storage/Storage";
import * as Actions from "./types/actions";
import { IInitialState } from "./types/states";
import modalsReducers from "./reducers/modals";
import contactReducers from "./reducers/contact";
import hostsReducers from "./reducers/hosts";
import conversationsReducers from "./reducers/conversations";
import othersReducers from "./reducers/others";
import clientReducers from "./reducers/clients";
import Queue from "Classes/Queue/Queue";
import {
  IAdvertiserRequest,
  IRelayRequest,
  IStorageRequest,
} from "Classes/Queue/def";

export const initialState: IInitialState = {
  storage: new Storage(),
  modals: {
    add_contact: { show: false },
    contact_details: { show: false },
    add_host: { show: false },
    confirmation: { show: false, message: "", callback: (result) => {} },
  },
  contacts: [],
  hosts: [],

  host_connections: [],
  contact_connections: [],

  selected_conversation_messages: [],

  incoming_messages_packets: [],
  deliver_message_state: [],

  advertiser_queue: new Queue<IAdvertiserRequest>(),
  storage_queue: new Queue<IStorageRequest>(),
  relay_queue: new Queue<IRelayRequest>(),
};

const reducer = (
  state: IInitialState = initialState,
  action: Actions.ActionType
): IInitialState => {
  state = modalsReducers(state, action);
  state = contactReducers(state, action);
  state = hostsReducers(state, action);
  state = conversationsReducers(state, action);
  state = clientReducers(state, action);
  state = othersReducers(state, action);
  return state;
};

export default reducer;
