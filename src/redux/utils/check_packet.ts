import Contact from "Classes/Contact/Contact";
import Message, {
  IIncomingMessagePackets,
  IMessageState,
  MessageSentState,
} from "Classes/Message/Message";
import Key from "core/Key/Key";
import { Dispatch } from "react";
import { resetIncomingPackets } from "redux/actions/client";
import { addMessage, updateMessageStatus } from "redux/actions/conversations";
import { ActionType } from "redux/types/actions";
import Storage from "storage/Storage";

const checkDeliveringMessageState = (
  message: IMessageState,
  dispatch: Dispatch<ActionType>
) => {
  let hasDelivered = false;
  let hasError = false;
  let hasReserved = false;
  message.packets.forEach((status) => {
    switch (status.status) {
      case "DELIVERED":
        hasDelivered = true;
        break;
      case "FAILED":
        hasError = true;
        break;
      case "RESERVED":
        hasReserved = true;
        break;
    }
  });
  if (hasError) {
    dispatch(updateMessageStatus(message.id, "FAILED"));
  }
  if (hasReserved) {
    dispatch(updateMessageStatus(message.id, "SENT"));
  }
  if (hasDelivered) {
    dispatch(updateMessageStatus(message.id, "DELIVERED"));
  }
};

export const checkDeliverStatus = (
  messages: IMessageState[],
  dispach: Dispatch<ActionType>
): void => {
  messages.forEach((message) => {
    checkDeliveringMessageState(message, dispach);
  });
};

const checkIncomingMessage = (
  incoming_packet_list: IIncomingMessagePackets,
  app_key: Key,
  contacts: Contact[],
  storage: Storage,
  dispatch: Dispatch<ActionType>
): boolean => {
  if (incoming_packet_list.packets.length === incoming_packet_list.count) {
    const contact = contacts.find(
      (contact) => contact.id === incoming_packet_list.contact_id
    );
    if (!contact) return false;
    const source_key = contact.key;
    const content = incoming_packet_list.packets
      .map((packet) => {
        return source_key.decryptPublic(
          app_key.decryptPrivate(packet.payload).toString()
        );
      })
      .reduce((prev, cur) => Buffer.concat([prev, cur]));
    const message = new Message({
      id: 0,
      network_id: incoming_packet_list.id,
      contact_id: incoming_packet_list.contact_id,
      public_key: contact.public_key,
      box_type: "RECEIVED",
      status: "DELIVERED",
      date: Date.now(),
      content,
    });
    message.store(storage);
    dispatch(addMessage(message));
    return true;
  }
  return false;
};

/**
 * checks if a message is received
 */
export const checkIncomingPackets = (
  messages: IIncomingMessagePackets[],
  app_key: Key,
  contacts: Contact[],
  storage: Storage,
  dispach: Dispatch<ActionType>
): void => {
  const count = messages.length;
  messages = messages.filter((message) => {
    const result = checkIncomingMessage(
      message,
      app_key,
      contacts,
      storage,
      dispach
    );
    return result ? null : message;
  });
  if (count !== messages.length) dispach(resetIncomingPackets(messages));
};
