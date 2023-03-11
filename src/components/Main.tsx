import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { useRoute } from "../../router";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import { selectStateChange } from "../redux/auth/selectors";
import { authStateChangeUser } from "../redux/auth/operations";

const Main: React.FunctionComponent = () => {
  const stateChange = useAppSelector(selectStateChange);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(authStateChangeUser());
  }, [stateChange]);

  const router = useRoute(stateChange);

  return <NavigationContainer>{router}</NavigationContainer>;
};

export default Main;
