import { ImageBackground, StyleSheet, Text, View } from "react-native";
import React from "react";

const Issues = () => {
  return (
    <ImageBackground
      source={require("D:\\Exploration\\greenguard\\assets\\images\\nativebackground.jpg")}
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <View style={styles.container}>
        <Text>ISsues</Text>
      </View>
    </ImageBackground>
  );
};

export default Issues;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
