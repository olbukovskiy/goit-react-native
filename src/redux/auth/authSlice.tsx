import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

export interface IUserState {
  email: null | string;
  login: null | string;
  avatar: null | string;
  userId: null | string;
  stateChange: boolean;
}

export interface IUserUpdate {
  email: null | string;
  login: null | string;
  avatar: null | string;
  userId: null | string;
}

type StateChangeType = {
  stateChange: boolean;
};

const initialValues: IUserState = {
  email: "",
  login: "",
  avatar: null,
  userId: null,
  stateChange: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialValues,
  reducers: {
    authUser: (state, action: PayloadAction<IUserUpdate>) => {
      const { avatar, email, login, userId } = action.payload;

      state.userId = userId;
      state.email = email;
      state.login = login;
      state.avatar = avatar;
    },
    changeState: (state, action: PayloadAction<StateChangeType>) => {
      return { ...state, stateChange: action.payload.stateChange };
    },
    authSignOut: () => initialValues,
    profilePictureUpdate: (
      state,
      action: PayloadAction<{ avatar: string }>
    ) => {
      state.avatar = action.payload.avatar;
    },
  },
});

export const { authUser, changeState, authSignOut, profilePictureUpdate } =
  authSlice.actions;
