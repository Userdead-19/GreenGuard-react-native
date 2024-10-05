import { ImageBackground, StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import ProgressBar from "@/components/Progressbar";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

const Home = () => {
  const listtile = [1, 2, 3, 4, 5, 6];
  return (
    <ImageBackground
      source={require("D:\\Exploration\\greenguard-expo\\assets\\images\\nativebackground.jpg")}
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <View style={styles.container}>
        <View style={styles.topdiv}>
          <Image
            source={require("D:\\Exploration\\greenguard-expo\\assets\\images\\63.jpg")}
            style={styles.image}
          />
          <Text style={styles.username}>U S E R N A M E</Text>

          <Text>LEVEL - 1</Text>
          <ProgressBar />
        </View>
        <View style={styles.ContributionsDiv}>
          <Text style={styles.username}>C O N T R I B U T I O N S</Text>
          <View style={{ gap: 50, flexDirection: "row" }}>
            <View style={{ flexDirection: "row", gap: 10 }}>
              <Ionicons name="camera" size={24} color="black" />
              <Text>23</Text>
            </View>
            <View style={{ flexDirection: "row", gap: 10 }}>
              <Ionicons name="eye" size={24} color="black" />
              <Text>26974</Text>
            </View>
          </View>
          <View style={styles.topContributionsDiv}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                color: "#395B64",
              }}
            >
              Top contributions
            </Text>
            <View style={{ flexDirection: "row" }}>
              <MaterialCommunityIcons name="sort" size={30} color="#395B64" />
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  color: "#395B64",
                }}
              >
                Sort by
              </Text>
            </View>
          </View>
          <View
            style={{
              height: "60%",
              width: "100%",
              borderRadius: 20,
              flex: 1,
              flexDirection: "row",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: 7.5,
            }}
          >
            {listtile.map((item, key) => (
              <Image
                source={require("@/assets/images/63.jpg")}
                style={{
                  width: 90,
                  height: 90,
                  borderRadius: 10,
                  borderWidth: 2,
                  borderColor: "#395B64",
                }}
              />
            ))}
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 40,
    paddingRight: 50,
    paddingLeft: 50,
    gap: 10,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 100,
    marginTop: 20,
  },
  username: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#395B64",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  topdiv: {
    width: 340,
    height: "42.5%",
    backgroundColor: "#E7F6F2",
    borderRadius: 20,
    borderWidth: 2,
    alignItems: "center",
    padding: 10,
    gap: 10,
    borderColor: "#395B64",
  },
  ContributionsDiv: {
    width: 340,
    height: "55%",
    backgroundColor: "#E7F6F2",
    borderRadius: 20,
    borderWidth: 2,
    alignItems: "center",
    padding: 10,
    gap: 15,
    borderColor: "#395B64",
  },
  topContributionsDiv: {
    height: 35,
    width: "100%",
    borderWidth: 2,
    borderRadius: 10,
    flexDirection: "row",
    paddingLeft: 10,
    paddingTop: 2.5,
    backgroundColor: "#a5c9ca",
    gap: 60,
  },
});
