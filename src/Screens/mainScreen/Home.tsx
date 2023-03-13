import { Platform, TouchableOpacity, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import type { StackScreenProps } from "@react-navigation/stack";
import { Feather } from "@expo/vector-icons";

import ProfileScreen from "./ProfileScreen/ProfileScreen";
import CreatePostsScreen from "./CreatePostsScreen/CreatePostsScreen";
import PostsScreen from "./PostsScreen";

import { RootStackParamList, TabsParamList } from "../../../services/types";
import { useAppDispatch } from "../../hooks/redux-hooks";
import { authSignOutUser } from "../../redux/auth/operations";

const Tabs = createBottomTabNavigator<TabsParamList>();

type Props = StackScreenProps<RootStackParamList, "Home">;

const Home: React.FunctionComponent<Props> = () => {
  const dispatch = useAppDispatch();

  const logOutHandler = () => {
    dispatch(authSignOutUser());
  };

  return (
    <Tabs.Navigator initialRouteName="PostsScreen">
      <Tabs.Screen
        name="PostsScreen"
        component={PostsScreen}
        options={{
          headerShown: true,
          title: "Публикации",
          headerTitleAlign: "center",
          headerRight: () => (
            <TouchableOpacity
              onPress={logOutHandler}
              activeOpacity={0.8}
              style={{ marginRight: 16 }}
            >
              <Feather name="log-out" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          ),
          headerStyle: {
            borderBottomColor: "#BDBDBD",
            borderBottomWidth: 1,
          },
          tabBarStyle: {
            height: 73,
            paddingTop: Platform.OS === "ios" ? 25 : 0,
            backgroundColor: "#fff",
          },
          tabBarLabel: "",
          tabBarActiveTintColor: "#fff",
          tabBarInactiveTintColor: "#BDBDBD",
          tabBarIcon: ({ focused, size, color }) => {
            return (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: focused ? "#FF6C00" : "#fff",
                  width: 70,
                  height: 40,
                  borderRadius: 20,
                }}
              >
                <Feather name="grid" color={color} size={24} />
              </View>
            );
          },
        }}
      />
      <Tabs.Screen
        name="CreatePost"
        component={CreatePostsScreen}
        options={{
          title: "Создать публикацию",
          headerTitleAlign: "center",
          headerStyle: {
            borderBottomColor: "#BDBDBD",
            borderBottomWidth: 1,
          },
          tabBarStyle: {
            height: 73,
            paddingTop: Platform.OS === "ios" ? 25 : 0,
            backgroundColor: "#fff",
          },
          tabBarLabel: "",
          tabBarActiveTintColor: "#fff",
          tabBarInactiveTintColor: "#BDBDBD",
          tabBarIcon: ({ focused, size, color }) => {
            return (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: focused ? "#FF6C00" : "#fff",
                  width: 70,
                  height: 40,
                  borderRadius: 20,
                }}
              >
                <Feather name="plus" color={color} size={24} />
              </View>
            );
          },
        }}
      />
      <Tabs.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarStyle: {
            height: 73,
            paddingTop: Platform.OS === "ios" ? 25 : 0,
            backgroundColor: "#fff",
          },
          tabBarLabel: "",
          tabBarActiveTintColor: "#fff",
          tabBarInactiveTintColor: "#BDBDBD",
          tabBarIcon: ({ focused, size, color }) => {
            return (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: focused ? "#FF6C00" : "#fff",
                  width: 70,
                  height: 40,
                  borderRadius: 20,
                }}
              >
                <Feather name="user" color={color} size={24} />
              </View>
            );
          },
        }}
      />
    </Tabs.Navigator>
  );
};

export default Home;
