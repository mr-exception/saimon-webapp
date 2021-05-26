import { ActionType } from "redux/types/actions";
import { IInitialState, ILogedState } from "redux/types/states";
import * as Actions from "redux/types/actions";
import {
  IIncomingMessagePackets,
  IMessageState,
} from "Classes/Message/Message";
import Key from "core/Key/Key";
import Contact from "Classes/Contact/Contact";

const reducer = (state: IInitialState, action: ActionType): IInitialState => {
  const loged_state = state as ILogedState;
  let found = false;
  switch (action.type) {
    case Actions.STORE_CLIENT:
      if (!action.client) return state;
      loged_state.client = action.client;
      return state;
    case Actions.STORE_CONNECTION_STATE:
      if (!action.host_connection_state) return state;
      const host_connection_state = action.host_connection_state;
      found = false;
      state.host_connections = state.host_connections.map((hc) => {
        if (hc.connection_id === host_connection_state.connection_id) {
          hc.state = host_connection_state.state;
          found = true;
        }
        return hc;
      });
      if (!found) {
        state.host_connections.push(host_connection_state);
      }
      return state;
    case Actions.STORE_APP_KEY:
      if (!action.app_key) return state;
      loged_state.app_key = action.app_key;
      return loged_state;
    case Actions.STORE_INCOMING_PACKET:
      if (!action.packet) return state;
      found = false;
      state.incoming_messages_packets = state.incoming_messages_packets.map(
        (incoming_message) => {
          if (!action.packet) return incoming_message;
          if (incoming_message.id === action.packet.id) {
            incoming_message.packets.push(action.packet);
            found = true;
          }
          return incoming_message;
        }
      );
      if (!found && action.packet !== undefined) {
        let contact = state.contacts.find((contact) => {
          if (!action.packet) return false;
          return contact.public_key === Key.normalizeKey(action.packet.src);
        });
        if (!contact) {
          contact = new Contact({
            id: 0,
            first_name: "unknow",
            last_name: "unknow",
            public_key: Key.normalizeKey(action.packet.src),
            advertiser_host_ids: [],
            relay_host_ids: [],
          });
          contact.store(state.storage);
          state.contacts.push(contact);
        }
        const incoming_message: IIncomingMessagePackets = {
          id: action.packet.id,
          count: action.packet.count,
          contact_id: contact.id,
          packets: [action.packet],
        };
        state.incoming_messages_packets.push(incoming_message);
      }
      return state;
    case Actions.STORE_DELIVERING_PACKET_STATUS:
      found = false;
      if (!action.packet_deliver_status) return state;
      let message_state: IMessageState;
      state.deliver_message_state = state.deliver_message_state.map(
        (message_state) => {
          if (!action.packet_deliver_status) return message_state;
          if (message_state.id === action.packet_deliver_status.id) {
            message_state.packets.push({
              position: action.packet_deliver_status.position,
              status: action.packet_deliver_status.status,
            });
            found = true;
          }
          return message_state;
        }
      );
      if (!found) {
        message_state = {
          id: action.packet_deliver_status.id,
          count: action.packet_deliver_status.count,
          packets: [
            {
              position: action.packet_deliver_status.position,
              status: action.packet_deliver_status.status,
            },
          ],
        };
        state.deliver_message_state.push(message_state);
        return state;
      }
      return state;
    case Actions.RESET_INCOMING_PACKETS:
      state.incoming_messages_packets = action.incoming_messages || [];
      return state;
    default:
      return state;
  }
};
export default reducer;
