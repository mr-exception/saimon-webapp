import { IDeliveringMessageState } from "Classes/Message/Message";
import { updateMessageStatus } from "redux/actions/conversations";
import store from "redux/store";

export const checkDeliveringMessageState = (
  message: IDeliveringMessageState
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
    store.dispatch(updateMessageStatus(message.id, "FAILED"));
  }
  if (hasReserved) {
    store.dispatch(updateMessageStatus(message.id, "SENT"));
  }
  if (hasDelivered) {
    store.dispatch(updateMessageStatus(message.id, "DELIVERED"));
  }
  return message.count === message.packets.length;
};
