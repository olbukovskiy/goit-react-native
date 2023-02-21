import { View, Text, StyleSheet } from "react-native";

const MapScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={{ alignSelf: "center" }}>MapScreen</Text>
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
});

export default MapScreen;
