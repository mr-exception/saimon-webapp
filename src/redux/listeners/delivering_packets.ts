import { IMessageState } from "Classes/Message/Message";
import { Dispatch } from "react";
import { updateMessageStatus } from "redux/actions/conversations";
import { ActionType } from "redux/types/actions";

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

const handle = (
  messages: IMessageState[],
  dispach: Dispatch<ActionType>
): void => {
  messages.forEach((message) => {
    checkDeliveringMessageState(message, dispach);
  });
};

export default handle;
