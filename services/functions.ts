import { IReducerState } from "./types";

export function reducer(
  state: IReducerState,
  action: { type: string; payload: boolean }
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
