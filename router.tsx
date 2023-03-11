import {
  createStackNavigator,
  StackNavigationOptions,
} from "@react-navigation/stack";

import LoginScreen from "./src/Screens/authScreen/LoginScreen/LoginScreen";
import RegistrationScreen from "./src/Screens/authScreen/RegistrationScreen/RegistrationScreen";
import Home from "./src/Screens/mainScreen/Home";
import { RootStackParamList } from "./services/types";

const MainStack = createStackNavigator<RootStackParamList>();

const options: StackNavigationOptions = {
  headerShown: false,
};

export const useRoute = (isAuth: boolean) => {
  if (!isAuth) {
    return (
      <MainStack.Navigator>
        <MainStack.Screen
          name="Login"
          component={LoginScreen}
          options={options}
        />
        <MainStack.Screen
          name="Register"
          component={RegistrationScreen}
          options={options}
        />
      </MainStack.Navigator>
    );
  }

  return (
    <MainStack.Navigator>
      <MainStack.Screen name="Home" component={Home} options={options} />
    </MainStack.Navigator>
  );
};
