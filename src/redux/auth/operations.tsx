import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { updateProfile } from "firebase/auth";

import { auth } from "../../../firebase/config";
import { AppDispatch } from "../store";
import {
  authSignOut,
  authUser,
  changeState,
  profilePictureUpdate,
} from "./authSlice";

export interface IUser {
  email: string;
  login: string;
  password: string;
  avatar: any;
}

interface IAuthUser {
  email: string;
  password: string;
}

interface IError {
  message: string;
  [prop: string]: any;
}

export const authSignInUser =
  (body: IAuthUser) => async (dispatch: AppDispatch) => {
    const { email, password } = body;

    try {
      await signInWithEmailAndPassword(auth, email, password);

      const user = auth.currentUser;

      if (user !== null) {
        const {
          displayName: login,
          email,
          photoURL: avatar,
          uid: userId,
        } = user;

        const userData = { login, email, avatar, userId };

        dispatch(authUser(userData));
      }
    } catch (error) {
      const errorNew = error as IError;
      console.log(errorNew.message);
    }
  };

export const authSignUpUser =
  (body: IUser) => async (dispatch: AppDispatch) => {
    const { avatar, email, login, password } = body;

    try {
      await createUserWithEmailAndPassword(auth, email, password);

      const user = auth.currentUser;

      if (user) {
        await updateProfile(user, {
          displayName: login,
          photoURL: avatar,
        });
      }

      const newUser = auth.currentUser;

      if (newUser !== null) {
        const {
          displayName: login,
          email,
          photoURL: avatar,
          uid: userId,
        } = newUser;

        const userData = { login, email, avatar, userId };

        dispatch(authUser(userData));
      }
    } catch (error) {
      const errorNew = error as IError;
      console.log(errorNew.message);
    }
  };

export const authSignOutUser = () => async (dispatch: AppDispatch) => {
  try {
    await signOut(auth);
    dispatch(authSignOut());
  } catch (error) {
    const errorNew = error as IError;
    console.log(errorNew.message);
  }
};

export const authStateChangeUser = () => async (dispatch: AppDispatch) => {
  try {
    onAuthStateChanged(auth, (user) => {
      if (user !== null) {
        const {
          displayName: login,
          email,
          photoURL: avatar,
          uid: userId,
        } = user;

        const userData = { login, email, avatar, userId };

        dispatch(authUser(userData));
        dispatch(changeState({ stateChange: true }));
      }
    });
  } catch (error) {
    const errorNew = error as IError;
    console.log(errorNew.message);
  }
};

export const authUpdateUserProfilePicture =
  (avatar: string) => async (dispatch: AppDispatch) => {
    try {
      const user = auth.currentUser;

      if (user !== null) {
        await updateProfile(user, {
          photoURL: avatar,
        });
      }

      const newUser = auth.currentUser;

      if (newUser !== null) {
        const { photoURL: avatar } = newUser;

        if (typeof avatar === "string") {
          const userData = { avatar };
          dispatch(profilePictureUpdate(userData));
        }
      }
    } catch (error) {
      const errorNew = error as IError;
      console.log(errorNew.message);
    }
  };
