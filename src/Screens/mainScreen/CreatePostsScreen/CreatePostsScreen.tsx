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
import { Camera, CameraProps, CameraType } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { FontAwesome, Octicons, Feather, AntDesign } from "@expo/vector-icons";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";

import { useUser } from "../../../hooks/hooks";
import { IProps, TabsParamList } from "../../../../services/types";
import { styles } from "./styles";
import * as Location from "expo-location";

type Props = BottomTabScreenProps<TabsParamList, "CreatePost">;

const CreatePosts: React.FunctionComponent<Props> = ({ navigation }) => {
  const { setPostsState, hideTab, showTab } = useUser();
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [cameraRef, setCameraRef] = useState<any>(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [photoPath, setPhotoPath] = useState<string | null>(null);
  const [postTitle, setPostTitle] = useState<string>("");
  const [photoLocation, setPhotoLocation] = useState<string>("");
  const [mapLocation, setMapLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [_, setErrorMsg] = useState<string | null>(null);

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
      const coords = {
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
                            onPress={async () => {
                              if (cameraRef) {
                                const { uri } =
                                  await cameraRef.takePictureAsync();
                                await MediaLibrary.createAssetAsync(uri);
                                setPhotoPath(uri);
                              }
                            }}
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
                                type === Camera.Constants.Type.back
                                  ? Camera.Constants.Type.front
                                  : Camera.Constants.Type.back
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
                onPress={() => {
                  if (!photoPath || !postTitle) {
                    console.log("Нужно заполнить все обязательные поля");
                  }

                  if (photoPath && postTitle) {
                    setPostsState((prevPosts: IProps[]) => {
                      return [
                        ...prevPosts,
                        {
                          id: `${prevPosts.length + 1}`,
                          img: { uri: photoPath },
                          title: postTitle,
                          location: photoLocation,
                          mapLocation,
                        },
                      ];
                    });

                    setPhotoPath(null);
                    setPostTitle("");
                    setPhotoLocation("");
                    navigation.navigate("PostsScreen");
                  }
                }}
                activeOpacity={0.8}
                style={{ ...styles.button, marginTop: 32 }}
              >
                <Text style={styles.btnText}>Опубликовать</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() => {
                setPhotoPath(null);
                setPostTitle("");
                setPhotoLocation("");
                navigation.navigate("PostsScreen");
              }}
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
