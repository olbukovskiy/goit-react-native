import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
} from "react-native";
import { AntDesign, Feather } from "@expo/vector-icons";
import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { TabsParamList } from "../../../services/types";
import { posts } from "./PostsScreen";
import ProfilePostsList from "../../components/ProfilePostsList";
type Props = BottomTabScreenProps<TabsParamList, "Profile">;

const ProfileScreen: React.FunctionComponent<Props> = ({
  route,
  navigation,
}) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.image}
        source={require("../../../assets/images/bg.jpg")}
      >
        <View style={styles.wrapper}>
          <View
            style={[styles.imageWrapper, { transform: [{ translateX: -50 }] }]}
          >
            <Image style={styles.contentImage} />
            <TouchableOpacity style={styles.addIcon} activeOpacity={0.8}>
              <AntDesign name="pluscircleo" size={25} color="#FF6C00" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate("Login")}
            activeOpacity={0.8}
            style={{ position: "absolute", right: 16, top: 22 }}
          >
            <Feather name="log-out" size={24} color="#BDBDBD" />
          </TouchableOpacity>
          <Text style={styles.pageTitle}>
            {route.params?.login ?? "Name Surname"}
          </Text>
          <ProfilePostsList posts={posts} />
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  image: {
    flex: 1,
    resizeMode: "cover",
  },
  wrapper: {
    flex: 1,
    position: "relative",
    marginTop: 145,
    paddingTop: 92,
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

    marginBottom: 32,
  },
});

export default ProfileScreen;
