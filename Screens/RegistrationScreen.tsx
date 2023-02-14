import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";

const RegistrationScreen: React.FunctionComponent = () => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/images/bg.jpg")}
        style={styles.image}
      >
        <View style={styles.wrapper}>
          <View
            style={[styles.imageWrapper, { transform: [{ translateX: -50 }] }]}
          >
            <Image style={styles.contentImage} />
          </View>
          <Text style={styles.pageTitle}>Регистрация</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={{ ...styles.input, marginBottom: 16 }}
              placeholder="Логин"
              placeholderTextColor="#BDBDBD"
            />
            <TextInput
              style={{ ...styles.input, marginBottom: 16 }}
              placeholder="Адрес электронной почты"
              placeholderTextColor="#BDBDBD"
            />
            <TextInput
              style={styles.input}
              textContentType="password"
              placeholder="Пароль"
              placeholderTextColor="#BDBDBD"
            />
          </View>
          <TouchableOpacity style={styles.button} activeOpacity={0.8}>
            <Text style={styles.btnText}>Зарегистрироваться</Text>
          </TouchableOpacity>
          <Text style={styles.text}>Уже есть аккаунт? Войти</Text>
        </View>
      </ImageBackground>
    </View>
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
    paddingBottom: 78,
    paddingLeft: 16,
    paddingRight: 16,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "#FFFFFF",
  },
  imageWrapper: {
    position: "absolute",
    top: -60,
    left: "50%",
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  contentImage: {
    flex: 1,
  },
  inputWrapper: {
    display: "flex",
    flexDirection: "column",
    marginBottom: 43,
  },
  input: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    height: 50,

    padding: 16,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderStyle: "solid",
    borderRadius: 8,
    backgroundColor: "#F6F6F6",
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
  },
  pageTitle: {
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    lineHeight: 35,
    color: "#212121",
    textAlign: "center",

    marginBottom: 33,
  },
});

export default RegistrationScreen;

// BDBDBD - колір тексту в інпутах
// 212121 - колір основного тексту  F6F6F6 - колір бг картинки FF6C00 - колір кнопки 1B4371 - показать и есть акаунт

//  "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
//           "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
//           "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
