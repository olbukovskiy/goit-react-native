import { View, Text, StyleSheet, Image } from "react-native";
import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { TabsParamList } from "../../../services/types";
import PostsList from "../../components/PostsList";
import { IProps } from "../../../services/types";
type Props = BottomTabScreenProps<TabsParamList, "PostsScreen">;

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

const PostsScreen: React.FunctionComponent<Props> = ({ route }) => {
  console.log(route.params);
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
      <PostsList posts={posts} />
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
});

export default PostsScreen;
