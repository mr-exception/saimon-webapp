import { ActionType } from "redux/types/actions";
import { IInitialState } from "redux/types/states";
import * as Actions from "redux/types/actions";
import { initialState } from "redux/reducer";

const reducer = (state: IInitialState, action: ActionType): IInitialState => {
  switch (action.type) {
    case Actions.CLEAR_ALL:
      return initialState;
    default:
      return state;
  }
};

export default reducer;
