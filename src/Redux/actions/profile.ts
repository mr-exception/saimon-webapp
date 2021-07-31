import {
  ActionType,
  UPDATE_FIRST_NAME,
  UPDATE_LAST_NAME,
  UPDATE_PROFILE,
} from "Redux/types/actions";

export const updateProfile = (
  first_name: string,
  last_name: string
): ActionType => {
  return { type: UPDATE_PROFILE, first_name, last_name };
};

export const updateFirstName = (first_name: string): ActionType => {
  return { type: UPDATE_FIRST_NAME, first_name };
};

export const updateLastName = (last_name: string): ActionType => {
  return { type: UPDATE_LAST_NAME, last_name };
};
