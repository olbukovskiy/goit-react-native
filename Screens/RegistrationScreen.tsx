import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useState, useReducer } from "react";

interface IState {
  email: string;
  login: string;
  password: string;
}

interface IPasswordSettings {
  isVisible: boolean;
  text: "Show" | "Hide";
}

interface IReducerState {
  email: boolean;
  login: boolean;
  password: boolean;
}

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
  text: "Show",
};

function reducer(
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

const RegistrationScreen: React.FunctionComponent = () => {
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
    console.log(formState);
    setFormState(initialState);
  };

  const changePasswordSettings = () => {
    setIsPasswordVisible((prevState) => ({
      isVisible: !prevState.isVisible,
      text: prevState.text === "Show" ? "Hide" : "Show",
    }));
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardCloseHandler}>
      <View style={styles.container}>
        <ImageBackground
          source={require("../assets/images/bg.jpg")}
          style={styles.image}
        >
          <View style={styles.wrapper}>
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
              <View
                style={[
                  styles.imageWrapper,
                  { transform: [{ translateX: -50 }] },
                ]}
              >
                <Image style={styles.contentImage} />
                <TouchableOpacity style={styles.addIcon} activeOpacity={0.8}>
                  <AntDesign name="pluscircleo" size={25} color="#FF6C00" />
                </TouchableOpacity>
              </View>
              <Text style={styles.pageTitle}>Регистрация</Text>

              <View
                style={{
                  ...styles.inputWrapper,
                  marginBottom: isActive ? 32 : 43,
                }}
              >
                <View>
                  <TextInput
                    style={{
                      ...styles.input,
                      marginBottom: 16,
                      backgroundColor: state.email ? "#fff" : "#F6F6F6",
                      borderColor: state.email ? "#FF6C00" : "#E8E8E8",
                    }}
                    placeholder="Login"
                    placeholderTextColor="#BDBDBD"
                    value={formState.login}
                    onFocus={() => {
                      setIsActive(true);
                      dispatch({ type: "email", payload: true });
                    }}
                    onBlur={keyboardCloseHandler}
                    onChangeText={(value) =>
                      setFormState((prevState) => ({
                        ...prevState,
                        login: value,
                      }))
                    }
                  />
                </View>
                <View>
                  <TextInput
                    style={{
                      ...styles.input,
                      marginBottom: 16,
                      backgroundColor: state.login ? "#fff" : "#F6F6F6",
                      borderColor: state.login ? "#FF6C00" : "#E8E8E8",
                    }}
                    placeholder="Email adress"
                    placeholderTextColor="#BDBDBD"
                    value={formState.email}
                    onFocus={() => {
                      setIsActive(true);
                      dispatch({ type: "login", payload: true });
                    }}
                    onBlur={keyboardCloseHandler}
                    onChangeText={(value) =>
                      setFormState((prevState) => ({
                        ...prevState,
                        email: value,
                      }))
                    }
                  />
                </View>
                <View style={{ position: "relative" }}>
                  <TextInput
                    style={{
                      ...styles.input,
                      backgroundColor: state.password ? "#fff" : "#F6F6F6",
                      borderColor: state.password ? "#FF6C00" : "#E8E8E8",
                    }}
                    textContentType="password"
                    placeholder="Password"
                    placeholderTextColor="#BDBDBD"
                    secureTextEntry={isPasswordVisible.isVisible}
                    value={formState.password}
                    onFocus={() => {
                      setIsActive(true);
                      dispatch({ type: "password", payload: true });
                    }}
                    onBlur={keyboardCloseHandler}
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
            </KeyboardAvoidingView>
            <TouchableOpacity
              style={styles.button}
              activeOpacity={0.8}
              onPress={submitHandler}
            >
              <Text style={styles.btnText}>Зарегистрироваться</Text>
            </TouchableOpacity>
            <Text style={styles.text}>Уже есть аккаунт? Войти</Text>
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  wrapper: {
    paddingTop: 92,
    paddingLeft: 16,
    paddingRight: 16,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "#FFFFFF",
  },
  imageWrapper: {
    position: "absolute",
    top: "-50%",
    left: "50%",
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  contentImage: {
    flex: 1,
  },
  addIcon: {
    position: "absolute",
    right: -12.5,
    bottom: 14,
  },
  pageTitle: {
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    lineHeight: 35,
    color: "#212121",
    textAlign: "center",

    marginBottom: 33,
  },
  inputWrapper: {
    display: "flex",
    flexDirection: "column",
    position: "relative",
  },
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
    marginBottom: 75,
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

export default RegistrationScreen;
