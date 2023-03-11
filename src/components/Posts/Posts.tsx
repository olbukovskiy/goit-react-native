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
import { useUser } from "../../hooks/hooks";
import { PostsStackParamList } from "../../../services/types";
import { styles } from "./styles";
import { useAppSelector } from "../../hooks/redux-hooks";
import { selectUserData } from "../../redux/auth/selectors";

type Props = StackScreenProps<PostsStackParamList, "Posts">;

const Posts: React.FunctionComponent<Props> = ({ navigation }) => {
  const { postsState } = useUser();
  const { email, login, avatar } = useAppSelector(selectUserData);

  return (
    <View style={styles.container}>
      <View style={styles.profileWrapper}>
        <View style={styles.imageThumb}>
          <Image style={styles.image} source={{ uri: avatar as string }} />
        </View>
        <View>
          <Text style={styles.name}>{login ?? "Name Surname"}</Text>
          <Text style={styles.email}>{email ?? "email@mail.com"}</Text>
        </View>
      </View>
      <SafeAreaView style={styles.wrapper}>
        <FlatList
          style={{ marginBottom: 32 }}
          data={postsState}
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
                    <Text style={styles.commentsCalc}>
                      {item.comments?.length}
                    </Text>
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
