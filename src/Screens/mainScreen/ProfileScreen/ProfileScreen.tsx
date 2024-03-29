import { useState, useEffect } from "react";
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from "react-native";

import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { AntDesign, Feather, Octicons, FontAwesome } from "@expo/vector-icons";
import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";

import { IComment, IPost, TabsParamList } from "../../../../services/types";
import { ICommentsQuantity } from "../../../components/Posts/Posts";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux-hooks";
import {
  authSignOutUser,
  authUpdateUserProfilePicture,
} from "../../../redux/auth/operations";
import { selectUserData } from "../../../redux/auth/selectors";
import { db, uploadPicture } from "../../../../firebase/config";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

import { styles } from "./styles";

type Props = BottomTabScreenProps<TabsParamList, "Profile">;

const ProfileScreen: React.FunctionComponent<Props> = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [commentsQuantity, setCommentsQuantity] = useState<ICommentsQuantity>(
    {}
  );
  const [_, setHasPermission] = useState<boolean>(false);
  const [cameraRef, setCameraRef] = useState<Camera | null>(null);
  const [showCamera, setShowCamera] = useState<boolean>(false);
  const [picturePath, setPicturePath] = useState<string>("");
  const { avatar, login, userId } = useAppSelector(selectUserData);
  const dispatch = useAppDispatch();

  const logOutHandler = () => {
    dispatch(authSignOutUser());
  };

  const changeUserProfilePicture = async () => {
    const avatar = await uploadPicture(picturePath, "profile");

    if (typeof avatar === "string") {
      dispatch(authUpdateUserProfilePicture(avatar.toString()));
    }
  };

  const onLikeClickHandler = async (postId: string) => {
    const docRef = doc(db, "posts", `${postId}`);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      const postLikes = data.likes;
      await updateDoc(docRef, { likes: postLikes + 1 });
    } else {
      console.log("No such document!");
    }
  };

  useEffect(() => {
    const filterQuery = query(
      collection(db, "posts"),
      where("userId", "==", userId)
    );

    onSnapshot(filterQuery, (data) => {
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

  useEffect(() => {
    const statusSetter = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();

      if (status !== "granted") {
        return;
      }

      setHasPermission(status === "granted");
    };

    statusSetter();
  }, []);

  return (
    <>
      {!showCamera && posts && commentsQuantity && (
        <View style={styles.container}>
          <ImageBackground
            style={styles.image}
            source={require("../../../../assets/images/bg.jpg")}
          >
            <View style={styles.wrapper}>
              <View
                style={[
                  styles.imageWrapper,
                  { transform: [{ translateX: -50 }] },
                ]}
              >
                <Image
                  style={styles.contentImage}
                  source={{ uri: avatar as string }}
                />
                <TouchableOpacity
                  onPress={() => setShowCamera(true)}
                  style={styles.addIcon}
                  activeOpacity={0.8}
                >
                  <AntDesign name="pluscircleo" size={25} color="#FF6C00" />
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                onPress={logOutHandler}
                activeOpacity={0.8}
                style={{ position: "absolute", right: 16, top: 22 }}
              >
                <Feather name="log-out" size={24} color="#BDBDBD" />
              </TouchableOpacity>
              <Text style={styles.pageTitle}>{login ?? "Name Surname"}</Text>
              <SafeAreaView style={styles.listWrapper}>
                <FlatList
                  style={{ marginBottom: 32 }}
                  data={posts}
                  keyExtractor={(item) => item.postId as string}
                  renderItem={({ item }) => {
                    return (
                      <View style={styles.listWrapper}>
                        <View>
                          <Image
                            style={styles.picture}
                            source={{ uri: item.img }}
                          />
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
                                {commentsQuantity[item.postId] ?? 0}
                              </Text>
                            </View>
                            <TouchableOpacity
                              activeOpacity={0.8}
                              onPress={() => {
                                onLikeClickHandler(item.postId);
                              }}
                              style={{
                                ...styles.commentsWrapper,
                                marginLeft: 24,
                              }}
                            >
                              <Feather
                                style={styles.commentsIcon}
                                name="thumbs-up"
                                size={24}
                                color="#FF6C00"
                              />
                              <Text style={styles.commentsCalc}>
                                {item?.likes ?? 0}
                              </Text>
                            </TouchableOpacity>
                          </View>
                          <View style={styles.locationWrapper}>
                            <Octicons
                              name="location"
                              size={24}
                              color="#BDBDBD"
                            />
                            <Text style={styles.locationText}>
                              {item.location}
                            </Text>
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
      )}
      {showCamera && (
        <Camera
          style={{ flex: 1 }}
          ref={(ref) => {
            setCameraRef(ref);
          }}
        >
          <View style={{ flex: 1 }}>
            <View
              style={{
                flex: 1,
                backgroundColor: "transparent",
                position: "relative",
              }}
            >
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={async () => {
                  if (cameraRef) {
                    const { uri } = await cameraRef.takePictureAsync();
                    await MediaLibrary.createAssetAsync(uri);
                    setPicturePath(uri);
                    setShowCamera(false);
                    await changeUserProfilePicture();
                  }
                }}
                style={[
                  {
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    width: 60,
                    height: 60,
                    borderRadius: 60 / 2,
                    backgroundColor: "#fff",
                    opacity: 0.3,
                  },
                  {
                    transform: [{ translateX: -30 }, { translateY: -30 }],
                  },
                ]}
              >
                <FontAwesome
                  style={[
                    { position: "absolute", top: "50%", left: "50%" },
                    {
                      transform: [{ translateX: -12.5 }, { translateY: -12.5 }],
                    },
                  ]}
                  name="camera"
                  color="#BDBDBD"
                  size={24}
                />
              </TouchableOpacity>
            </View>
          </View>
        </Camera>
      )}
    </>
  );
};

export default ProfileScreen;
