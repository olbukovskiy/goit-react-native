import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";
import { useState, useReducer } from "react";
import { IState, IPasswordSettings, IReducerState } from "../services/types";
import { reducer } from "../services/functions";

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

const LoginScreen = () => {
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
  };

  const changePasswordSettings = () => {
    setIsPasswordVisible((prevState) => ({
      isVisible: !prevState.isVisible,
      text: prevState.text === "Показать" ? "Скрыть" : "Показать",
    }));
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardCloseHandler}>
      <View style={styles.container}>
        <ImageBackground
          style={styles.image}
          source={require("../assets/images/bg.jpg")}
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
              <Text style={styles.text}>Нет аккаунта? Зарегистрироваться</Text>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  wrapper: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 16,
    paddingTop: 32,

    justifyContent: "flex-start",
  },
  title: {
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",
    marginBottom: 32,
  },
  inputWrapper: { position: "relative" },
  input: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    height: 50,
    padding: 16,
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 8,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",

    padding: 16,
    paddingLeft: 32,
    paddingRight: 32,

    backgroundColor: "#FF6C00",
    borderColor: "transparent",
    borderRadius: 100,
  },
  btnText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "#fff",
  },
  text: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "#1B4371",
    textAlign: "center",
    marginTop: 16,
    marginBottom: 144,
  },

  showHide: {
    position: "absolute",
    right: 16,
    top: 16,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
  },
});

export default LoginScreen;
