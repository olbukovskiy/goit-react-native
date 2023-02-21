// import { View, Text, StyleSheet, Image } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { PostsStackParamList } from "../../../services/types";
import Posts from "../../components/Posts/Posts";
import CommentsScreen from "./CommentsScreen/CommentsScreen";
import MapScreen from "./MapScreen";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import type { StackScreenProps } from "@react-navigation/stack";
import type { CompositeScreenProps } from "@react-navigation/native";
import { TabsParamList } from "../../../services/types";
import { RootStackParamList } from "../../../services/types";
const PostsStack = createStackNavigator<PostsStackParamList>();

type Props = CompositeScreenProps<
  BottomTabScreenProps<TabsParamList, "PostsScreen">,
  StackScreenProps<RootStackParamList>
>;

const PostsScreen: React.FunctionComponent<Props> = ({ navigation }) => {
  return (
    <PostsStack.Navigator>
      <PostsStack.Screen
        name="Posts"
        component={Posts}
        options={() => {
          return { headerShown: false };
        }}
      />
      <PostsStack.Screen
        name="Comments"
        component={CommentsScreen}
        options={{ title: "Комментарии" }}
      />
      <PostsStack.Screen name="Map" component={MapScreen} />
    </PostsStack.Navigator>
  );
};

export default PostsScreen;
