import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons"; // Import icons from expo vector icons
import { useAuth } from "@clerk/clerk-expo"; // Assuming you're using Clerk for auth
import { useNavigation } from "expo-router";
import { CommonActions } from "@react-navigation/native";

const Menu = () => {
  const { signOut } = useAuth(); // Clerk signOut function
  const navigation = useNavigation();
  return (
    <ImageBackground
      source={require("D:\\Exploration\\greenguard-expo\\assets\\images\\nativebackground.jpg")}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        {/* Logout Button */}
        <TouchableOpacity
          style={styles.logoutTile}
          onPress={async () => {
            await signOut();
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: "(home)" }],
              })
            );
          }}
        >
          <Ionicons name="log-out-outline" size={28} color="#fff" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default Menu;

const styles = StyleSheet.create({
  backgroundImage: {
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    alignItems: "center",
    padding: 40,
  },
  menuText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },
  logoutTile: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ff5c5c", // Red background for the logout button
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: "90%",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  logoutText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
  },
});
