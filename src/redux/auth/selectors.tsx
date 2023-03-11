import { RootState } from "../store";

export const selectStateChange = (state: RootState) => state.auth.stateChange;

export const selectUserData = (state: RootState) => state.auth;
