<script src="http://localhost:8097"></script>;
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  StackNavigationOptions,
} from "@react-navigation/stack";

import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import { useState, useEffect, useCallback } from "react";
import { RootStackParamList } from "./services/types";
import RegistrationScreen from "./src/Screens/authScreen/RegistrationScreen/RegistrationScreen";
import LoginScreen from "./src/Screens/authScreen/LoginScreen/LoginScreen";
import Home from "./src/Screens/mainScreen/Home";
import UserProvider from "./src/hooks/hooks";

SplashScreen.preventAutoHideAsync();
const MainStack = createStackNavigator<RootStackParamList>();

const options: StackNavigationOptions = {
  headerShown: false,
};

export default function App() {
  const [isReady, setIsReady] = useState<boolean>(false);

  useEffect(() => {
    (async function prepare() {
      try {
        await Font.loadAsync({
          "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
          "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
          "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
        });
      } catch (error) {
        console.log(error);
      } finally {
        setIsReady(true);
      }
    })();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (isReady) {
      await SplashScreen.hideAsync();
    }
  }, [isReady]);

  if (!isReady) return null;

  return (
    <UserProvider>
      <View style={styles.container} onLayout={onLayoutRootView}>
        <NavigationContainer>
          <MainStack.Navigator initialRouteName="Login">
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
            <MainStack.Screen name="Home" component={Home} options={options} />
          </MainStack.Navigator>
        </NavigationContainer>
      </View>
    </UserProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
