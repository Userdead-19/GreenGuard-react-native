import { ImageBackground, StyleSheet, Text, View } from "react-native";
import React from "react";

const Menu = () => {
  return (
    <ImageBackground
      source={require("D:\\Exploration\\greenguard\\assets\\images\\nativebackground.jpg")}
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <View style={styles.container}>
        <Text>Menu</Text>
      </View>
    </ImageBackground>
  );
};

export default Menu;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
