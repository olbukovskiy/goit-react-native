import {
  View,
  Text,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";
import type { StackScreenProps } from "@react-navigation/stack";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { useState, useReducer, useEffect } from "react";
import { IPasswordSettings, IReducerState } from "../../../../services/types";
import { reducer } from "../../../../services/functions";
import { RootStackParamList } from "../../../../services/types";
import styles from "./styles";

import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { useUser } from "../../../hooks/hooks";

const reducerState: IReducerState = {
  email: false,
  login: false,
  password: false,
};

const passwordSettings: IPasswordSettings = {
  isVisible: true,
  text: "Показать",
};

type Props = StackScreenProps<RootStackParamList, "Register">;

const RegistrationScreen: React.FunctionComponent<Props> = ({ navigation }) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isPasswordVisible, setIsPasswordVisible] =
    useState<IPasswordSettings>(passwordSettings);
  const [state, dispatch] = useReducer(reducer, reducerState);

  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [_, setHasPermission] = useState<boolean>(false);
  const [cameraRef, setCameraRef] = useState<Camera | null>(null);
  const [photoPath, setPhotoPath] = useState<string>("");
  const [showCamera, setShowCamera] = useState(false);

  const { setAuthState, authState } = useUser();

  const keyboardCloseHandler = () => {
    setIsActive(false);
    Keyboard.dismiss();
    dispatch({ type: "unset", payload: false });
  };

  const submitHandler = () => {
    keyboardCloseHandler();
    setAuthState({ login, email, password, avatar: { uri: photoPath } });

    navigation.navigate("Home", {
      screen: "PostsScreen",
      params: { ...authState },
    });
  };

  const changePasswordSettings = () => {
    setIsPasswordVisible((prevState) => ({
      isVisible: !prevState.isVisible,
      text: prevState.text === "Показать" ? "Скрыть" : "Показать",
    }));
  };

  useEffect(() => {
    const statusSetter = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();

      if (status !== "granted") {
        return;
      }

      setHasPermission(status === "granted");
    };

    statusSetter();
  }, []);

  return (
    <>
      {!showCamera && (
        <TouchableWithoutFeedback onPress={keyboardCloseHandler}>
          <View style={{ flex: 1 }}>
            <ImageBackground
              source={require("../../../../assets/images/bg.jpg")}
              style={styles.image}
            >
              <KeyboardAvoidingView
                style={styles.wrapper}
                behavior={Platform.OS === "ios" ? "padding" : undefined}
              >
                <View
                  style={{
                    marginBottom: isActive ? -175 : 0,
                    paddingBottom: 75,
                  }}
                >
                  <View
                    style={[
                      styles.imageWrapper,
                      { transform: [{ translateX: -60 }] },
                    ]}
                  >
                    <Image
                      style={styles.contentImage}
                      source={
                        photoPath.length === 0
                          ? require("../../../../assets/images/User.png")
                          : { uri: photoPath }
                      }
                    />
                    <TouchableOpacity
                      style={styles.addIcon}
                      activeOpacity={0.8}
                      onPress={() => setShowCamera(true)}
                    >
                      <AntDesign name="pluscircleo" size={25} color="#FF6C00" />
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.pageTitle}>Регистрация</Text>

                  <View style={styles.inputWrapper}>
                    <View>
                      <TextInput
                        style={{
                          ...styles.input,
                          marginBottom: 16,
                          backgroundColor: state.email ? "#fff" : "#F6F6F6",
                          borderColor: state.email ? "#FF6C00" : "#E8E8E8",
                        }}
                        placeholder="Логин"
                        placeholderTextColor="#BDBDBD"
                        value={login}
                        onFocus={() => {
                          setIsActive(true);
                          dispatch({ type: "email", payload: true });
                        }}
                        onBlur={() => {
                          dispatch({ type: "unset", payload: false });
                          setIsActive(false);
                        }}
                        onChangeText={(value) => setLogin(value)}
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
                        placeholder="Адресс электронной почты"
                        placeholderTextColor="#BDBDBD"
                        value={email}
                        onFocus={() => {
                          setIsActive(true);
                          dispatch({ type: "login", payload: true });
                        }}
                        onBlur={() => {
                          dispatch({ type: "unset", payload: false });
                          setIsActive(false);
                        }}
                        onChangeText={(value) => setEmail(value)}
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
                        placeholder="Пароль"
                        placeholderTextColor="#BDBDBD"
                        secureTextEntry={isPasswordVisible.isVisible}
                        value={password}
                        onFocus={() => {
                          setIsActive(true);
                          dispatch({ type: "password", payload: true });
                        }}
                        onBlur={() => {
                          dispatch({ type: "unset", payload: false });
                          setIsActive(false);
                        }}
                        onChangeText={(value) => setPassword(value)}
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
                    style={{ ...styles.button, marginTop: 43 }}
                    activeOpacity={0.8}
                    onPress={submitHandler}
                  >
                    <Text style={styles.btnText}>Зарегистрироваться</Text>
                  </TouchableOpacity>

                  <View style={styles.textWrapper}>
                    <Text style={styles.text}>Уже есть аккаунт? </Text>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => navigation.navigate("Login")}
                    >
                      <Text style={styles.link}>Войти</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </KeyboardAvoidingView>
            </ImageBackground>
          </View>
        </TouchableWithoutFeedback>
      )}
      {showCamera && (
        <Camera
          style={{ flex: 1 }}
          ref={(ref) => {
            setCameraRef(ref);
          }}
        >
          <View style={{ flex: 1 }}>
            <View
              style={{
                flex: 1,
                backgroundColor: "transparent",
                position: "relative",
              }}
            >
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={async () => {
                  if (cameraRef) {
                    const { uri } = await cameraRef.takePictureAsync();
                    await MediaLibrary.createAssetAsync(uri);
                    setPhotoPath(uri);
                    setShowCamera(false);
                  }
                }}
                style={[
                  {
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    width: 60,
                    height: 60,
                    borderRadius: 60 / 2,
                    backgroundColor: "#fff",
                    opacity: 0.3,
                  },
                  {
                    transform: [{ translateX: -30 }, { translateY: -30 }],
                  },
                ]}
              >
                <FontAwesome
                  style={[
                    { position: "absolute", top: "50%", left: "50%" },
                    {
                      transform: [{ translateX: -12.5 }, { translateY: -12.5 }],
                    },
                  ]}
                  name="camera"
                  color="#BDBDBD"
                  size={24}
                />
              </TouchableOpacity>
            </View>
          </View>
        </Camera>
      )}
    </>
  );
};

export default RegistrationScreen;
