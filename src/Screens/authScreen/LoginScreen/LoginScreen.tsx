import {
  View,
  Text,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";
import type { StackScreenProps } from "@react-navigation/stack";
import { useState, useReducer } from "react";
import {
  IState,
  IPasswordSettings,
  IReducerState,
} from "../../../../services/types";
import { reducer } from "../../../../services/functions";
import { RootStackParamList } from "../../../../services/types";
import styles from "./styles";

const initialState: IState = {
  email: "",
  login: "",
  password: "",
};

const reducerState: IReducerState = {
  email: false,
  login: false,
  password: false,
};

const passwordSettings: IPasswordSettings = {
  isVisible: true,
  text: "Показать",
};

type Props = StackScreenProps<RootStackParamList, "Login">;

const LoginScreen: React.FunctionComponent<Props> = ({ navigation }) => {
  const [formState, setFormState] = useState<IState>(initialState);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isPasswordVisible, setIsPasswordVisible] =
    useState<IPasswordSettings>(passwordSettings);
  const [state, dispatch] = useReducer(reducer, reducerState);

  const keyboardCloseHandler = () => {
    setIsActive(false);
    Keyboard.dismiss();
    dispatch({ type: "unset", payload: false });
  };

  const submitHandler = () => {
    keyboardCloseHandler();
    setFormState(initialState);
    console.log(formState);
    navigation.navigate("Home", {
      screen: "PostsScreen",
      params: { ...formState },
    });
  };

  const changePasswordSettings = () => {
    setIsPasswordVisible((prevState) => ({
      isVisible: !prevState.isVisible,
      text: prevState.text === "Показать" ? "Скрыть" : "Показать",
    }));
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardCloseHandler}>
      <View style={{ flex: 1 }}>
        <ImageBackground
          style={styles.image}
          source={require("../../../../assets/images/bg.jpg")}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
          >
            <View
              style={{
                ...styles.wrapper,
                marginBottom: isActive ? -240 : 0,
              }}
            >
              <View style={{ marginBottom: 43 }}>
                <Text style={styles.title}>Войти</Text>
                <View style={styles.inputWrapper}>
                  <TextInput
                    style={{
                      ...styles.input,
                      marginBottom: 16,
                      backgroundColor: state.login ? "#fff" : "#F6F6F6",
                      borderColor: state.login ? "#FF6C00" : "#E8E8E8",
                    }}
                    placeholder="Адресс электронной почты"
                    placeholderTextColor="#BDBDBD"
                    value={formState.email}
                    onFocus={() => {
                      setIsActive(true);
                      dispatch({ type: "login", payload: true });
                    }}
                    onBlur={() => {
                      dispatch({ type: "unset", payload: false });
                      setIsActive(false);
                    }}
                    onChangeText={(value) =>
                      setFormState((prevState) => ({
                        ...prevState,
                        email: value,
                      }))
                    }
                  />
                </View>
                <View style={styles.inputWrapper}>
                  <TextInput
                    style={{
                      ...styles.input,
                      backgroundColor: state.password ? "#fff" : "#F6F6F6",
                      borderColor: state.password ? "#FF6C00" : "#E8E8E8",
                    }}
                    textContentType="password"
                    placeholder="Пароль"
                    placeholderTextColor="#BDBDBD"
                    secureTextEntry={isPasswordVisible.isVisible}
                    value={formState.password}
                    onFocus={() => {
                      setIsActive(true);
                      dispatch({ type: "password", payload: true });
                    }}
                    onBlur={() => {
                      dispatch({ type: "unset", payload: false });
                      setIsActive(false);
                    }}
                    onChangeText={(value) =>
                      setFormState((prevState) => ({
                        ...prevState,
                        password: value,
                      }))
                    }
                  />
                  <Text
                    style={styles.showHide}
                    onPress={() => changePasswordSettings()}
                  >
                    {isPasswordVisible.text}
                  </Text>
                </View>
              </View>

              <TouchableOpacity
                style={styles.button}
                activeOpacity={0.8}
                onPress={submitHandler}
              >
                <Text style={styles.btnText}>Войти</Text>
              </TouchableOpacity>
              <View style={styles.textWrapper}>
                <Text style={styles.text}>Нет аккаунта?</Text>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => navigation.navigate("Register")}
                >
                  <Text style={styles.linkText}>Зарегистрироваться</Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;
