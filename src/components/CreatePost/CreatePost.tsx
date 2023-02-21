import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { FontAwesome, Octicons, Feather } from "@expo/vector-icons";
import { CreateParamList } from "../../Screens/mainScreen/CreatePostsScreen";
import { StackScreenProps } from "@react-navigation/stack";
type Props = StackScreenProps<CreateParamList, "Create">;

const CreatePosts: React.FunctionComponent<Props> = () => {
  return (
    <TouchableWithoutFeedback
      style={{ flex: 1 }}
      onPress={() => Keyboard.dismiss()}
    >
      <View style={{ flex: 1 }}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View style={{ flex: 1, paddingBottom: 32 }}>
            <View style={styles.addPhotoThumb}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.pictureWrapper}
              >
                <Image style={styles.picture} />
                <View
                  style={[
                    styles.iconWrapper,
                    { transform: [{ translateX: -30 }, { translateY: -30 }] },
                  ]}
                >
                  <FontAwesome
                    style={[
                      styles.icon,
                      {
                        transform: [
                          { translateX: -12.5 },
                          { translateY: -12.5 },
                        ],
                      },
                    ]}
                    name="camera"
                    color="#BDBDBD"
                    size={24}
                  />
                </View>
              </TouchableOpacity>
              <Text style={styles.text}>Загрузите фото</Text>
            </View>
            <View>
              <View style={{ ...styles.inputWrapper, marginBottom: 16 }}>
                <TextInput
                  placeholderTextColor="#BDBDBD"
                  placeholder="Название..."
                  style={styles.input}
                />
              </View>
              <View style={styles.inputWrapper}>
                <TextInput
                  placeholderTextColor="#BDBDBD"
                  placeholder="Местность..."
                  style={{ ...styles.input, paddingLeft: 28 }}
                />
                <Octicons
                  style={[
                    styles.locationIcon,
                    { transform: [{ translateY: -12 }] },
                  ]}
                  name="location"
                  size={24}
                  color="#BDBDBD"
                />
              </View>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => console.log("Post wad added!")}
                style={{ ...styles.button, marginTop: 32 }}
              >
                <Text style={styles.btnText}>Опубликовать</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              activeOpacity={0.8}
              style={{
                alignSelf: "center",
                marginTop: "auto",
                position: "relative",
                width: 70,
                height: 40,
                backgroundColor: "#F6F6F6",
                borderRadius: 20,
              }}
            >
              <Feather
                style={[
                  { position: "absolute", left: "50%", top: "50%" },
                  { transform: [{ translateX: -12 }, { translateY: -12 }] },
                ]}
                name="trash-2"
                size={24}
                color="#BDBDBD"
              />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
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

export default CreatePosts;
