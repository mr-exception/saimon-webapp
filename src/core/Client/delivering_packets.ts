import { MessageSentState } from "Classes/Message/Message";
import { updateMessageStatus } from "redux/actions/conversations";
import store from "redux/store";

// export const checkDeliveringMessageState = (
//   message: IDeliveringMessageState
// ) => {
//   const state = calculateMessageStatus(message);
//   store.dispatch(updateMessageStatus(message.id, state));
//   return message.count === message.packets.length;
// };
// const calculateMessageStatus = (
//   message: IDeliveringMessageState
// ): MessageSentState => {
//   let errors = 0;
//   let reserves = 0;
//   let delivers = 0;
//   message.packets.forEach((status) => {
//     switch (status.status) {
//       case "DELIVERED":
//         delivers++;
//         break;
//       case "FAILED":
//         errors++;
//         break;
//       case "RESERVED":
//         reserves++;
//         break;
//     }
//   });
//   if (errors > 0) {
//     return "FAILED";
//   }
//   if (reserves > 0) {
//     return "SENT";
//   }
//   if (delivers > 0) {
//     return "DELIVERED";
//   }
//   return "SENDING";
// };
