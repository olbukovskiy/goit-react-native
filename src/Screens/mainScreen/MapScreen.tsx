import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import type { StackScreenProps } from "@react-navigation/stack";
import MapView, { Marker } from "react-native-maps";

import { useUser } from "../../hooks/hooks";
import { PostsStackParamList } from "../../../services/types";

type Props = StackScreenProps<PostsStackParamList, "Map">;

const MapScreen: React.FunctionComponent<Props> = ({ route, navigation }) => {
  const { hideTab, showTab, postsState } = useUser();
  const [postLocationState] = useState(() => {
    const routeObj = postsState.find((post) => {
      return post.id === route.params.postId;
    });
    const currentMapLocation = routeObj!.mapLocation;
    console.log(currentMapLocation);
    return currentMapLocation;
  });

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
      <MapView
        style={styles.mapStyle}
        region={{
          ...postLocationState,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation={true}
      >
        {postLocationState && (
          <Marker
            title="I am here"
            coordinate={postLocationState}
            description="Hello"
          />
        )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
    paddingTop: 32,
    paddingBottom: 32,
    justifyContent: "center",
  },
  mapStyle: {
    flex: 1,
    alignSelf: "center",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

export default MapScreen;
