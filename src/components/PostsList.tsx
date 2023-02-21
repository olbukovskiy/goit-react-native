import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from "react-native";

import { Octicons, Feather } from "@expo/vector-icons";
import { IProps } from "../../services/types";

const PostsList: React.FunctionComponent<{
  posts: IProps[];
  navigate: any;
}> = ({ posts, navigate }) => {
  return (
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
  );
};

const styles = StyleSheet.create({
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

export default PostsList;
