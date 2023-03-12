import format from "date-fns/format";
import { IReducerState, ActionType } from "./types";

export function reducer(
  state: IReducerState,
  action: ActionType
): IReducerState {
  switch (action.type) {
    case "email":
      return {
        ...state,
        email: action.payload,
      };
    case "login":
      return {
        ...state,
        login: action.payload,
      };
    case "password":
      return {
        ...state,
        password: action.payload,
      };
    case "unset":
      return {
        email: false,
        login: false,
        password: false,
      };
    default:
      return { ...state };
  }
}

export function formatDate(time: string) {
  if (!time) {
    return "Unknown";
  }

  return format(Date.parse(time), "dd LLLL, yyyy | HH:mm");
}
