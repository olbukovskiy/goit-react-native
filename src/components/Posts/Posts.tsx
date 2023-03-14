import { useState, useEffect } from "react";
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
import { collection, onSnapshot } from "firebase/firestore";

import {
  IComment,
  ICreatePost,
  IPost,
  LocationType,
  PostsStackParamList,
} from "../../../services/types";

import { useAppSelector } from "../../hooks/redux-hooks";
import { selectUserData } from "../../redux/auth/selectors";
import { db } from "../../../firebase/config";

import { styles } from "./styles";

type Props = StackScreenProps<PostsStackParamList, "Posts">;

export interface ICommentsQuantity {
  [prop: string]: string | number;
}

const Posts: React.FunctionComponent<Props> = ({ navigation }) => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [commentsQuantity, setCommentsQuantity] = useState<ICommentsQuantity>(
    {}
  );

  const { email, login, avatar } = useAppSelector(selectUserData);

  useEffect(() => {
    onSnapshot(collection(db, "posts"), (data) => {
      const posts = data?.docs.map((doc) => {
        const docData = doc.data() as IPost;
        const docId = doc.id;

        return { ...docData, postId: docId };
      });

      setPosts(posts as IPost[]);
    });
  }, []);

  useEffect(() => {
    posts.forEach((post) => {
      onSnapshot(collection(db, `posts/${post.postId}/comments`), (data) => {
        const commentsArray = data?.docs.map((doc) => {
          const docData = doc.data() as IComment;
          const docId = doc.id;

          return { ...docData, commentId: docId };
        });

        const singlePostComments = { [post.postId]: commentsArray.length };
        setCommentsQuantity((prevComments) => {
          return { ...prevComments, ...singlePostComments };
        });
      });
    });
  }, []);

  return (
    <>
      {posts && commentsQuantity && (
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
              data={posts}
              keyExtractor={(item) => item.postId as string}
              renderItem={({ item }) => {
                return (
                  <View style={styles.wrapper}>
                    <View>
                      <Image
                        style={styles.picture}
                        source={{ uri: item.img }}
                      />
                    </View>
                    <Text style={styles.title}>{item.title}</Text>
                    <View style={styles.descrWraper}>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate("Comments", {
                            postId: item.postId as string,
                            pictureURL: item.img,
                          })
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
                          {commentsQuantity[item.postId] ?? 0}
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate("Map", {
                            location: item.mapLocation as LocationType,
                          })
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
      )}
    </>
  );
};

export default Posts;
