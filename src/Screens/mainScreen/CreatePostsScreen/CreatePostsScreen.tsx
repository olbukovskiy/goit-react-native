import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { FontAwesome, Octicons, Feather } from "@expo/vector-icons";
import { TabsParamList } from "../../../../services/types";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { styles } from "./styles";

type Props = BottomTabScreenProps<TabsParamList, "CreatePost">;

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

export default CreatePosts;
