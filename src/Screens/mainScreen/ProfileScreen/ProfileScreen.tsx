import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from "react-native";
import { AntDesign, Feather, Octicons } from "@expo/vector-icons";
import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { TabsParamList } from "../../../../services/types";
import { posts } from "../../../components/Posts/Posts";
import { styles } from "./styles";

type Props = BottomTabScreenProps<TabsParamList, "Profile">;

const ProfileScreen: React.FunctionComponent<Props> = ({
  route,
  navigation,
}) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.image}
        source={require("../../../../assets/images/bg.jpg")}
      >
        <View style={styles.wrapper}>
          <View
            style={[styles.imageWrapper, { transform: [{ translateX: -50 }] }]}
          >
            <Image style={styles.contentImage} />
            <TouchableOpacity style={styles.addIcon} activeOpacity={0.8}>
              <AntDesign name="pluscircleo" size={25} color="#FF6C00" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate("Login")}
            activeOpacity={0.8}
            style={{ position: "absolute", right: 16, top: 22 }}
          >
            <Feather name="log-out" size={24} color="#BDBDBD" />
          </TouchableOpacity>
          <Text style={styles.pageTitle}>
            {route.params?.login ?? "Name Surname"}
          </Text>
          <SafeAreaView style={styles.listWrapper}>
            <FlatList
              style={{ marginBottom: 32 }}
              data={posts}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => {
                return (
                  <View style={styles.listWrapper}>
                    <View>
                      <Image style={styles.picture} source={item.img} />
                    </View>
                    <Text style={styles.title}>{item.title}</Text>
                    <View style={styles.descrWraper}>
                      <View style={styles.commentsWrapper}>
                        <View style={styles.commentsWrapper}>
                          <Feather
                            style={styles.commentsIcon}
                            name="message-circle"
                            size={24}
                            color="#FF6C00"
                          />
                          <Text style={styles.commentsCalc}>
                            {item.comments}
                          </Text>
                        </View>
                        <View
                          style={{ ...styles.commentsWrapper, marginLeft: 24 }}
                        >
                          <Feather
                            style={styles.commentsIcon}
                            name="thumbs-up"
                            size={24}
                            color="#FF6C00"
                          />
                          <Text style={styles.commentsCalc}>
                            {item?.likes ?? 333}
                          </Text>
                        </View>
                      </View>
                      <View style={styles.locationWrapper}>
                        <Octicons name="location" size={24} color="#BDBDBD" />
                        <Text style={styles.locationText}>{item.location}</Text>
                      </View>
                    </View>
                  </View>
                );
              }}
            />
          </SafeAreaView>
        </View>
      </ImageBackground>
    </View>
  );
};

export default ProfileScreen;
