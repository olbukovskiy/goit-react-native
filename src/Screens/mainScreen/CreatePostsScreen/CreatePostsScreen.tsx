import { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Camera, CameraType } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";
import { FontAwesome, Octicons, Feather, AntDesign } from "@expo/vector-icons";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";

import { TabsParamList, LocationType, IPost } from "../../../../services/types";
import { uploadData, uploadPicture } from "../../../../firebase/config";
import { useAppSelector } from "../../../hooks/redux-hooks";
import { selectUserId } from "../../../redux/auth/selectors";

import { styles } from "./styles";
import { useUser } from "../../../hooks/hooks";

type Props = BottomTabScreenProps<TabsParamList, "CreatePost">;

const CreatePosts: React.FunctionComponent<Props> = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [cameraRef, setCameraRef] = useState<Camera | null>(null);
  const [type, setType] = useState(CameraType.back);
  const [_, setErrorMsg] = useState<string | null>(null);

  const [photoPath, setPhotoPath] = useState<string | null>(null);
  const [postTitle, setPostTitle] = useState<string>("");
  const [photoLocation, setPhotoLocation] = useState<string>("");
  const [mapLocation, setMapLocation] = useState<LocationType | null>(null);
  const { setIsCreated } = useUser();
  const userId = useAppSelector(selectUserId);

  const submitHandler = async () => {
    if (!photoPath || !postTitle) {
      console.log("Нужно заполнить все обязательные поля");
      return;
    }

    if (photoPath && postTitle) {
      const photoURL = await uploadPicture(photoPath, "post");

      const post: IPost = {
        userId: userId as string,
        img: photoURL as string,
        title: postTitle,
        location: photoLocation,
        mapLocation,
        likes: 0,
        comments: [],
      };

      const postId = await uploadData(post);
      console.log(postId);

      setIsCreated((prevState) => prevState + 1);
      setPhotoPath(null);
      setPostTitle("");
      setPhotoLocation("");
      setMapLocation(null);
      navigation.navigate("PostsScreen");
    }
  };

  const makePhotoHandler = async () => {
    if (cameraRef) {
      const { uri } = await cameraRef.takePictureAsync();
      await MediaLibrary.createAssetAsync(uri);
      setPhotoPath(uri);
    }
  };

  const deletePostHandler = () => {
    setPhotoPath(null);
    setPostTitle("");
    setPhotoLocation("");
    setMapLocation(null);
    navigation.navigate("PostsScreen");
  };

  useEffect(() => {
    const statusSetter = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();

      if (status !== "granted") {
        setErrorMsg("Permission to camera access was denied");
        return;
      }

      setHasPermission(status === "granted");
    };

    statusSetter();
  }, []);

  useEffect(() => {
    const locationPermissionCheck = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});

      const coords: LocationType = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };

      setMapLocation(coords);
    };

    locationPermissionCheck();
  }, []);

  if (hasPermission === null) return <View />;

  return (
    <TouchableWithoutFeedback
      style={{ flex: 1 }}
      onPress={() => Keyboard.dismiss()}
    >
      <View style={{ flex: 1 }}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View style={{ flex: 1 }}>
            <View style={styles.addPhotoThumb}>
              <View
                style={{
                  ...styles.pictureWrapper,
                  overflow: "hidden",
                  borderRadius: 8,
                }}
              >
                {photoPath === null &&
                  (hasPermission ? (
                    <Camera
                      style={styles.picture}
                      type={type}
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
                            onPress={makePhotoHandler}
                            style={[
                              styles.iconWrapper,
                              {
                                transform: [
                                  { translateX: -30 },
                                  { translateY: -30 },
                                ],
                              },
                            ]}
                          >
                            <FontAwesome
                              style={[
                                styles.icon,
                                {
                                  transform: [
                                    { translateX: -12.5 },
                                    { translateY: -12.5 },
                                  ],
                                },
                              ]}
                              name="camera"
                              color="#BDBDBD"
                              size={24}
                            />
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() =>
                              setType(
                                type === CameraType.back
                                  ? CameraType.front
                                  : CameraType.back
                              )
                            }
                            activeOpacity={0.8}
                            style={{
                              position: "absolute",
                              bottom: 8,
                              right: 8,
                            }}
                          >
                            <AntDesign
                              name="retweet"
                              size={30}
                              color="grey"
                            ></AntDesign>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </Camera>
                  ) : (
                    <View style={styles.picture}>
                      <Text
                        style={{
                          alignSelf: "center",
                          textAlign: "center",
                          fontFamily: "Roboto-Regular",
                          fontSize: 16,
                          lineHeight: 19,
                          color: "#BDBDBD",
                        }}
                      >
                        No access to camera
                      </Text>
                    </View>
                  ))}
                {photoPath && (
                  <>
                    <Image style={styles.picture} source={{ uri: photoPath }} />
                    <TouchableOpacity
                      onPress={async () => {
                        setPhotoPath(null);
                      }}
                      activeOpacity={0.8}
                      style={[
                        styles.iconWrapper,
                        {
                          transform: [{ translateX: -30 }, { translateY: -30 }],
                          zIndex: 10,
                        },
                      ]}
                    >
                      <FontAwesome
                        style={[
                          styles.icon,
                          {
                            transform: [
                              { translateX: -12.5 },
                              { translateY: -12.5 },
                            ],
                          },
                        ]}
                        name="camera"
                        color="#BDBDBD"
                        size={24}
                      />
                    </TouchableOpacity>
                  </>
                )}
              </View>
              <Text style={styles.text}>Загрузите фото</Text>
            </View>
            <View>
              <View style={{ ...styles.inputWrapper, marginBottom: 16 }}>
                <TextInput
                  placeholderTextColor="#BDBDBD"
                  placeholder="Название..."
                  style={styles.input}
                  onChangeText={(value) => {
                    setPostTitle(value);
                  }}
                  value={postTitle}
                />
              </View>
              <View style={styles.inputWrapper}>
                <TextInput
                  placeholderTextColor="#BDBDBD"
                  placeholder="Местность..."
                  style={{ ...styles.input, paddingLeft: 28 }}
                  onChangeText={(value) => {
                    setPhotoLocation(value);
                  }}
                  value={photoLocation}
                />
                <Octicons
                  style={[
                    styles.locationIcon,
                    { transform: [{ translateY: -12 }] },
                  ]}
                  name="location"
                  size={24}
                  color="#BDBDBD"
                />
              </View>
              <TouchableOpacity
                onPress={submitHandler}
                activeOpacity={0.8}
                style={{ ...styles.button, marginTop: 32 }}
              >
                <Text style={styles.btnText}>Опубликовать</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={deletePostHandler}
              activeOpacity={0.8}
              style={{
                alignSelf: "center",
                marginTop: 50,
                position: "relative",
                width: 70,
                height: 40,
                backgroundColor: "#F6F6F6",
                borderRadius: 20,
                marginBottom: 20,
              }}
            >
              <Feather
                style={[
                  { position: "absolute", left: "50%", top: "50%" },
                  { transform: [{ translateX: -12 }, { translateY: -12 }] },
                ]}
                name="trash-2"
                size={24}
                color="#BDBDBD"
              />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CreatePosts;
