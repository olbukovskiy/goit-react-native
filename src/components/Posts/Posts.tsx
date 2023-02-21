import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import type { StackScreenProps } from "@react-navigation/stack";
import { Octicons, Feather } from "@expo/vector-icons";
import { PostsStackParamList } from "../../../services/types";
import { IProps } from "../../../services/types";

type Props = StackScreenProps<PostsStackParamList, "Posts">;

export const posts: IProps[] = [
  {
    id: "1",
    img: require("../../../assets/images/Rectangle1.png"),
    title: "Forrest",
    comments: 100,
    location: "Harkiv",
  },
  {
    id: "2",
    img: require("../../../assets/images/Rectangle2.png"),
    title: "Sky",
    comments: 300,
    location: "Ternopil",
  },
];

const Posts: React.FunctionComponent<Props> = ({ route, navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.profileWrapper}>
        <View style={styles.imageThumb}>
          <Image source={require("../../../assets/images/User.png")} />
        </View>
        <View>
          <Text style={styles.name}>
            {route.params?.login ?? "Name Surname"}
          </Text>
          <Text style={styles.email}>
            {route.params?.email ?? "email@mail.com"}
          </Text>
        </View>
      </View>
      <SafeAreaView style={styles.wrapper}>
        <FlatList
          style={{ marginBottom: 32 }}
          data={posts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            return (
              <View style={styles.wrapper}>
                <View>
                  <Image style={styles.picture} source={item.img} />
                </View>
                <Text style={styles.title}>{item.title}</Text>
                <View style={styles.descrWraper}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("Comments", { postId: item.id })
                    }
                    activeOpacity={0.8}
                    style={styles.commentsWrapper}
                  >
                    <Feather
                      style={styles.commentsIcon}
                      name="message-circle"
                      size={24}
                      color="#BDBDBD"
                    />
                    <Text style={styles.commentsCalc}>{item.comments}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("Map", { postId: item.id })
                    }
                    activeOpacity={0.8}
                    style={styles.locationWrapper}
                  >
                    <Octicons name="location" size={24} color="#BDBDBD" />
                    <Text style={styles.locationText}>{item.location}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}
        />
      </SafeAreaView>
    </View>
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
  profileWrapper: {
    flexDirection: "row",
    alignItems: "center",
    height: 60,
    width: "100%",
    marginBottom: 32,
  },
  imageThumb: {
    marginRight: 8,
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
    overflow: "hidden",
    borderRadius: 16,
  },
  image: {
    resizeMode: "cover",
    width: 60,
    height: 60,
  },
  name: {
    fontFamily: "Roboto-Bold",
    fontSize: 13,
    lineHeight: 15,
    color: "#212121",
  },
  email: {
    fontFamily: "Roboto-Regular",
    fontSize: 11,
    lineHeight: 13,
    color: "#212121",
  },
  postsListWrapper: {
    marginTop: 32,
  },
  wrapper: {
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
    color: "#BDBDBD",
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

export default Posts;
