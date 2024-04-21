import React from "react";
import { View, Text, StyleSheet } from "react-native";

const App = () => {
  const progress = 0.1; // Example progress value (between 0 and 1)

  return (
    <View style={styles.container}>
      <View style={styles.progressBar}>
        <View style={[styles.progress, { width: `${progress * 100}%` }]} />
      </View>
      <Text style={styles.progressText}>{`${Math.round(
        progress * 100
      )}% Complete`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  progressBar: {
    width: "80%",
    height: 20,
    backgroundColor: "#A5C9CA",
    borderRadius: 10,
    borderWidth: 1,
    overflow: "hidden",
  },
  progress: {
    height: "100%",
    backgroundColor: "#395B64",
  },
  progressText: {
    marginTop: 10,
    fontSize: 16,
  },
});

export default App;
