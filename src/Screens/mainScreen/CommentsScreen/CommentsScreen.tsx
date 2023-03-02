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

type Props = StackScreenProps<PostsStackParamList, "Comments">;

const CommentsScreen: React.FunctionComponent<Props> = ({ navigation }) => {
  const [comment, setComment] = useState("");
  const { showTab, hideTab, comments, setComments } = useUser();

  const submitHandler = () => {};

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
            onChangeText={(value) => setComment(value)}
          />
          <TouchableOpacity activeOpacity={0.8} style={styles.iconWrapper}>
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
