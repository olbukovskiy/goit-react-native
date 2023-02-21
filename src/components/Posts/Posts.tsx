import {
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import type { StackScreenProps } from "@react-navigation/stack";
import { Octicons, Feather } from "@expo/vector-icons";
import { PostsStackParamList } from "../../../services/types";
import { IProps } from "../../../services/types";
import { styles } from "./styles";

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
  {
    id: "3",
    img: require("../../../assets/images/Rectangle2.png"),
    title: "Sky",
    comments: 300,
    location: "Ternopil",
  },
  {
    id: "4",
    img: require("../../../assets/images/Rectangle2.png"),
    title: "Sky",
    comments: 300,
    location: "Ternopil",
  },
  {
    id: "5",
    img: require("../../../assets/images/Rectangle2.png"),
    title: "Sky",
    comments: 300,
    location: "Ternopil",
  },
  {
    id: "6",
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

export default Posts;
