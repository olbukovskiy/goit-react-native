import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from "react-native";
import { AntDesign, Feather, Octicons } from "@expo/vector-icons";
import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { TabsParamList } from "../../../services/types";
import { posts } from "../../components/Posts/Posts";
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
          <SafeAreaView style={styles.listWrapper}>
            <FlatList
              style={{ marginBottom: 32 }}
              data={posts}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => {
                return (
                  <View style={styles.listWrapper}>
                    <View>
                      <Image style={styles.picture} source={item.img} />
                    </View>
                    <Text style={styles.title}>{item.title}</Text>
                    <View style={styles.descrWraper}>
                      <View style={styles.commentsWrapper}>
                        <View style={styles.commentsWrapper}>
                          <Feather
                            style={styles.commentsIcon}
                            name="message-circle"
                            size={24}
                            color="#FF6C00"
                          />
                          <Text style={styles.commentsCalc}>
                            {item.comments}
                          </Text>
                        </View>
                        <View
                          style={{ ...styles.commentsWrapper, marginLeft: 24 }}
                        >
                          <Feather
                            style={styles.commentsIcon}
                            name="thumbs-up"
                            size={24}
                            color="#FF6C00"
                          />
                          <Text style={styles.commentsCalc}>
                            {item?.likes ?? 333}
                          </Text>
                        </View>
                      </View>
                      <View style={styles.locationWrapper}>
                        <Octicons name="location" size={24} color="#BDBDBD" />
                        <Text style={styles.locationText}>{item.location}</Text>
                      </View>
                    </View>
                  </View>
                );
              }}
            />
          </SafeAreaView>
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
  listWrapper: {
    backgroundColor: "#fff",
    marginBottom: 32,
  },
  picture: {
    height: 240,
    width: "100%",
    borderRadius: 8,
    marginBottom: 8,
  },
  title: {
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    marginBottom: 8,
  },
  descrWraper: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  commentsWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: "auto",
  },
  commentsIcon: {
    marginRight: 6,
  },
  commentsCalc: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
  },
  locationWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    textDecorationStyle: "solid",
    textDecorationLine: "underline",
    textDecorationColor: "#212121",
    marginLeft: 6,
  },
});

export default ProfileScreen;
