import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { View } from "react-native";
import type { StackScreenProps } from "@react-navigation/stack";
import ProfileScreen from "./ProfileScreen/ProfileScreen";
import CreatePostsScreen from "./CreatePostsScreen/CreatePostsScreen";
import PostsScreen from "./PostsScreen";
import { RootStackParamList, TabsParamList } from "../../../services/types";

const Tabs = createBottomTabNavigator<TabsParamList>();

type Props = StackScreenProps<RootStackParamList, "Home">;

const Home: React.FunctionComponent<Props> = ({ navigation }) => {
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
              onPress={() => navigation.navigate("Login")}
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
            height: 100,
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
          // headerLeft: () => {
          //   return (
          //     <TouchableOpacity
          //       style={{ marginLeft: 16, alignItems: "center" }}
          //       activeOpacity={0.8}
          //       onPress={() =>
          //         navigation.navigate("Home", {
          //           screen: "PostsScreen",
          //         })
          //       }
          //     >
          //       <AntDesign name="arrowleft" size={24} color="#212121" />
          //     </TouchableOpacity>
          //   );
          // },

          tabBarStyle: {
            height: 100,
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
            height: 100,
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
