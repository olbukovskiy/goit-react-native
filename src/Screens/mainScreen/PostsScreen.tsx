// import { View, Text, StyleSheet, Image } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { PostsStackParamList } from "../../../services/types";
import Posts from "../../components/Posts/Posts";
import CommentsScreen from "./CommentsScreen";
import MapScreen from "./MapScreen";

const PostsStack = createStackNavigator<PostsStackParamList>();

const PostsScreen: React.FunctionComponent = () => {
  return (
    <PostsStack.Navigator>
      <PostsStack.Screen
        name="Posts"
        component={Posts}
        options={{ headerShown: false }}
      />
      <PostsStack.Screen name="Comments" component={CommentsScreen} />
      <PostsStack.Screen name="Map" component={MapScreen} />
    </PostsStack.Navigator>
  );
};

export default PostsScreen;
