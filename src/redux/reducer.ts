import Storage from "Storage/Storage";
import * as Actions from "./types/actions";
import { IInitialState } from "./types/states";
import modalsReducers from "./reducers/modals";
import contactReducers from "./reducers/contact";
import hostsReducers from "./reducers/hosts";
import conversationsReducers from "./reducers/conversations";
import othersReducers from "./reducers/others";
import clientReducers from "./reducers/clients";
import profileReducers from "./reducers/profile";
import Queue from "Classes/Queue/Queue";
import { IReportRequest } from "Classes/Queue/def";
import { handle as handleReportJob } from "Queues/ReportLayer";
import Client from "Classes/Client/Client";

export const initialState: IInitialState = {
  is_online: false,

  profile: {
    first_name: localStorage.getItem("first_name") || "",
    last_name: localStorage.getItem("last_name") || "",
  },

  storage: new Storage(),
  client: new Client(),
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
  report_queue: new Queue<IReportRequest>(`report`, handleReportJob),

  receiving_zeus: new Worker("/workers/receiving_zeus.js"),
  sending_zeus: new Worker("/workers/sending_zeus.js"),
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
  state = profileReducers(state, action);
  return state;
};

export default reducer;
