import { IDeliveringMessageState } from "Classes/Message/Message";
import { updateMessageStatus } from "redux/actions/conversations";
import store from "redux/store";

export const checkDeliveringMessageState = (
  message: IDeliveringMessageState
) => {
  let errors = 0;
  let reservs = 0;
  let delivers = 0;
  message.packets.forEach((status) => {
    switch (status.status) {
      case "DELIVERED":
        errors++;
        break;
      case "FAILED":
        reservs++;
        break;
      case "RESERVED":
        delivers++;
        break;
    }
  });
  if (errors > 0) {
    store.dispatch(updateMessageStatus(message.id, "FAILED"));
  }
  if (reservs > 0) {
    store.dispatch(updateMessageStatus(message.id, "SENT"));
  }
  if (delivers > 0) {
    store.dispatch(updateMessageStatus(message.id, "DELIVERED"));
  }
  return message.count === message.packets.length;
};
