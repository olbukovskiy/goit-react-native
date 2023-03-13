import {
  View,
  Text,
  Image,
  SafeAreaView,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { AntDesign } from "@expo/vector-icons";
import { IComment, PostsStackParamList } from "../../../../services/types";
import { styles } from "./styles";
import { useUser } from "../../../hooks/hooks";
import { useEffect, useState } from "react";
import { formatDate } from "../../../../services/functions";
import { useAppSelector } from "../../../hooks/redux-hooks";
import { selectUserData } from "../../../redux/auth/selectors";
import { db, uploadComment } from "../../../../firebase/config";
import { collection, onSnapshot } from "firebase/firestore";

type Props = StackScreenProps<PostsStackParamList, "Comments">;

const CommentsScreen: React.FunctionComponent<Props> = ({
  navigation,
  route,
}) => {
  const [comments, setComments] = useState<IComment[]>([]);
  const [comment, setComment] = useState("");
  const { avatar, userId, login } = useAppSelector(selectUserData);
  const postId = route.params.postId;

  const { showTab, hideTab } = useUser();

  const submitHandler = async () => {
    const date = formatDate(new Date().toString());

    const commentData: IComment = {
      userId: userId as string,
      login: login as string,
      content: comment,
      posted: date,
      author: avatar as string,
    };

    await uploadComment(postId, commentData);

    setComment("");
  };

  useEffect(() => {
    onSnapshot(collection(db, `posts/${postId}/comments`), (data) => {
      const commentsArray = data?.docs.map((doc) => {
        const docData = doc.data() as IComment;
        const docId = doc.id;

        return { ...docData, commentId: docId };
      });

      setComments(commentsArray as IComment[]);
    });
  }, []);

  useEffect(() => {
    navigation.addListener("focus", hideTab);
    navigation.addListener("blur", showTab);

    return () => {
      navigation.removeListener("focus", hideTab);
      navigation.removeListener("blur", showTab);
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <ScrollView>
          <View style={styles.imageWrapper}>
            <Image style={styles.image} />
          </View>

          <SafeAreaView style={styles.listWrapper}>
            <ScrollView>
              {comments.map((item) => (
                <View style={styles.commentWrapper} key={item.commentId}>
                  <View style={styles.authorImageWrapper}>
                    <Image
                      style={styles.authorImage}
                      source={{ uri: item.author }}
                    />
                    <Text>{item.login}</Text>
                  </View>
                  <View style={styles.textWrapper}>
                    <Text style={styles.text}>{item.content}</Text>
                    <Text style={styles.date}>{item.posted}</Text>
                  </View>
                </View>
              ))}
            </ScrollView>
          </SafeAreaView>
        </ScrollView>

        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Комментировать..."
            placeholderTextColor="#BDBDBD"
            onChangeText={(value) => setComment(value)}
          />
          <TouchableOpacity
            onPress={submitHandler}
            activeOpacity={0.8}
            style={styles.iconWrapper}
          >
            <AntDesign
              style={[
                styles.icon,
                { transform: [{ translateX: -12 }, { translateY: -12 }] },
              ]}
              name="arrowup"
              size={24}
              color="#fff"
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CommentsScreen;
