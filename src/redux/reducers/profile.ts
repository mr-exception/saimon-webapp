import { ActionType } from "redux/types/actions";
import { IInitialState } from "redux/types/states";
import * as Actions from "redux/types/actions";

const reducer = (state: IInitialState, action: ActionType): IInitialState => {
  switch (action.type) {
    case Actions.UPDATE_FIRST_NAME:
      if (action.first_name !== undefined) {
        state.profile.first_name = action.first_name;
        localStorage.setItem("first_name", action.first_name);
      }
      return state;
    case Actions.UPDATE_LAST_NAME:
      if (action.last_name !== undefined) {
        state.profile.last_name = action.last_name;
        localStorage.setItem("last_name", action.last_name);
      }
      return state;
    case Actions.UPDATE_PROFILE:
      if (action.first_name !== undefined) {
        state.profile.first_name = action.first_name;
        localStorage.setItem("first_name", action.first_name);
      }
      if (action.last_name !== undefined) {
        state.profile.last_name = action.last_name;
        localStorage.setItem("last_name", action.last_name);
      }
      return state;
    default:
      return state;
  }
};
export default reducer;
