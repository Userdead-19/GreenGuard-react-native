import { ImageBackground, StyleSheet, Text, View } from "react-native";
import React from "react";

const Home = () => {
  return (
    <ImageBackground
      source={require("D:\\Exploration\\greenguard\\assets\\images\\nativebackground.jpg")}
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <View style={styles.container}>
        <Text>Home</Text>
      </View>
    </ImageBackground>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
