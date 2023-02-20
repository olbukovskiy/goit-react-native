import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
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
    paddingBottom: 140,

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
  textWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
  },
  text: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "#1B4371",
    textAlign: "center",
  },
  linkText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "#1B4371",
    marginLeft: 10,
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

export default styles;
