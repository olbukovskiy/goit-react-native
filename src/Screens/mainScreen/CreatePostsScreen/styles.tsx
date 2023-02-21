import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
    paddingTop: 32,
    paddingBottom: 32,
  },
  addPhotoThumb: {
    marginBottom: 32,
  },
  pictureWrapper: {
    position: "relative",
    marginBottom: 8,
    width: "100%",
    height: 240,
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
    borderColor: "#E8E8E8",
    borderWidth: 1,
  },
  picture: {
    width: "100%",
    height: 240,
  },
  iconWrapper: {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    backgroundColor: "#fff",
  },
  icon: {
    position: "absolute",
    top: "50%",
    left: "50%",
  },
  text: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
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
  inputWrapper: {
    position: "relative",
  },
  input: {
    height: 60,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    padding: 16,
    paddingLeft: 0,
    paddingRight: 0,
    borderWidth: 1,
    borderColor: "transparent",
    borderBottomColor: "#E8E8E8",
    borderBottomWidth: 1,
  },
  locationIcon: {
    position: "absolute",
    top: "50%",
    left: 0,
  },
});
