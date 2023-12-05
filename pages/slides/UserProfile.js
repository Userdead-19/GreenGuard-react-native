import { StyleSheet, Text, View, ImageBackground } from "react-native";
import React from "react";

const UserProfile = () => {
  return (
    <ImageBackground
      source={require("../../assets/nativebackground.jpg")}
      style={styles.container}
    >
      <View style={styles.innerdiv}>
        <Text
          style={{
            fontSize: 30,
            color: "#94b6b8",
            fontWeight: "600",
            marginTop: 20,
          }}
        >
          U S E R P R O F I L E
        </Text>
      </View>
    </ImageBackground>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
});
