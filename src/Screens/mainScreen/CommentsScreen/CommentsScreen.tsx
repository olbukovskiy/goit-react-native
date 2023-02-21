import {
  View,
  Text,
  Image,
  SafeAreaView,
  FlatList,
  TextInput,
  ScrollView,
} from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { AntDesign } from "@expo/vector-icons";
import { PostsStackParamList } from "../../../../services/types";
import { styles } from "./styles";

type Props = StackScreenProps<PostsStackParamList, "Comments">;

interface IComment {
  id: string;
  author: string;
  content: string;
  posted: string;
}

const comments: IComment[] = [
  {
    id: "1",
    author: "name",
    content: "loremloremdqdqwdqwdqwdqwdqwdqwdqwd",
    posted: "1.1.2011",
  },
  {
    id: "2",
    author: "name",
    content: "loremloremdqdqwdqwdqwdqwdqwdqwdqwd",
    posted: "1.1.2011",
  },
  {
    id: "3",
    author: "name",
    content: "loremloremdqdqwdqwdqwdqwdqwdqwdqwd",
    posted: "1.1.2011",
  },
  {
    id: "4",
    author: "name",
    content: "loremloremdqdqwdqwdqwdqwdqwdqwdqwd",
    posted: "1.1.2011",
  },
  {
    id: "5",
    author: "name",
    content: "loremloremdqdqwdqwdqwdqwdqwdqwdqwd",
    posted: "1.1.2011",
  },
  {
    id: "6",
    author: "name",
    content: "loremloremdqdqwdqwdqwdqwdqwdqwdqwd",
    posted: "1.1.2011",
  },
  {
    id: "7",
    author: "name",
    content: "loremloremdqdqwdqwdqwdqwdqwdqwdqwd",
    posted: "1.1.2011",
  },
  {
    id: "8",
    author: "name",
    content: "loremloremdqdqwdqwdqwdqwdqwdqwdqwd",
    posted: "1.1.2011",
  },
];

const CommentsScreen: React.FunctionComponent<Props> = () => {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <ScrollView>
          <View style={styles.imageWrapper}>
            <Image style={styles.image} />
          </View>

          <SafeAreaView style={styles.listWrapper}>
            {/* <FlatList
              data={comments}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => {
                return (
                  <View style={styles.commentWrapper}>
                    <View style={styles.authorImageWrapper}>
                      <Image style={styles.authorImage} />
                    </View>
                    <View style={styles.textWrapper}>
                      <Text style={styles.text}>{item.content}</Text>
                      <Text style={styles.date}>{item.posted}</Text>
                    </View>
                  </View>
                );
              }}
            /> */}
            <ScrollView>
              {comments.map((item) => (
                <View style={styles.commentWrapper} key={item.id}>
                  <View style={styles.authorImageWrapper}>
                    <Image style={styles.authorImage} />
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
          />
          <View style={styles.iconWrapper}>
            <AntDesign
              style={[
                styles.icon,
                { transform: [{ translateX: -12 }, { translateY: -12 }] },
              ]}
              name="arrowup"
              size={24}
              color="#fff"
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default CommentsScreen;
