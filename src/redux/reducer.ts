import Contact from "Classes/Contact/Contact";
import Storage from "storage/Storage";
import * as Actions from "./types/actions";
import { IInitialState, ILogedState } from "./types/states";
import modalsReducers from "./reducers/modals";
import contactReducers from "./reducers/contact";
import hostsReducers from "./reducers/hosts";
import conversationsReducers from "./reducers/conversations";
import othersReducers from "./reducers/others";

export const initialState: IInitialState = {
  storage: new Storage(),
  modals: {
    add_contact: { show: false },
    add_host: { show: false },
    confirmation: { show: false, message: "", callback: (result) => {} },
  },
  contacts: [],
  hosts: [],

  host_connections: [],
  contact_connections: [],

  selected_conversation_messages: [],
};

const reducer = (
  state: IInitialState = initialState,
  action: Actions.ActionType
): IInitialState => {
  state = modalsReducers(state, action);
  state = contactReducers(state, action);
  state = hostsReducers(state, action);
  state = conversationsReducers(state, action);
  state = othersReducers(state, action);
  return state;
};

export default reducer;
