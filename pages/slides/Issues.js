import { StyleSheet, Text, View, ImageBackground } from "react-native";
import React from "react";

const Issues = () => {
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
          I S S U E S
        </Text>
      </View>
    </ImageBackground>
  );
};

export default Issues;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
});
