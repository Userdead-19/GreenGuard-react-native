import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useSignIn } from "@clerk/clerk-expo";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import Spinner from "react-native-loading-spinner-overlay";

const Signin = () => {
  const navigator = useNavigation();
  const [emailAddress, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn, isLoaded, setActive } = useSignIn();
  const [loading, setloading] = useState(false);
  const handleSignIn = async () => {
    if (!isLoaded) return;
    try {
      const response = await signIn.create({
        identifier: emailAddress,
        password,
      });
      console.log(response);

      setloading(true);
      const token = await axios.post(
        `https://greenguard.onrender.com/user/login`,
        {
          identifier: emailAddress,
        }
      );
      await SecureStore.setItemAsync("token", token.data.token);
      setloading(false);
      await setActive({
        session: response.createdSessionId,
      });
    } catch (err: any) {
      setloading(false); // Ensure loading indicator is hidden
      console.error(JSON.stringify(err, null, 2));

      // Handle incorrect password error specifically
      if (err.code === "auth/wrong-password") {
        console.error("Incorrect password provided.");
        // Display a user-friendly error message (e.g., "Incorrect email or password")
        // You can use a state variable to control the visibility of an error message
      } else {
        // Handle other potential errors (e.g., network issues, server errors)
        console.error("An error occurred:", err);
      }
    }
  };

  return (
    <ImageBackground
      source={require("../assets/images/nativebackground.jpg")}
      style={styles.container}
    >
      {loading && (
        <Spinner
          visible={loading}
          textContent={"Loading..."}
          textStyle={{ color: "white" }}
          overlayColor="rgba(0, 0, 0, 0.7)"
        />
      )}
      <View style={styles.innerdiv}>
        <Text
          style={{
            fontSize: 30,
            color: "#94b6b8",
            fontWeight: "600",
            marginTop: 20,
          }}
        >
          L O G I N{" "}
        </Text>
        <TextInput
          placeholder="E M A I L"
          style={styles.input}
          placeholderTextColor="#395b64"
          onChangeText={setEmail}
        />
        <TextInput
          placeholder="P A S S W O R D"
          style={styles.input}
          placeholderTextColor={"#395b64"}
          secureTextEntry={true}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.opacity} onPress={() => handleSignIn()}>
          <View>
            <Text style={{ color: "#42626a" }}>L O G I N</Text>
          </View>
        </TouchableOpacity>
        <View style={{ flexDirection: "row", marginTop: 10 }}>
          <Text style={{ color: "#395b64", fontWeight: "400" }}>
            Don't have an Account ?{" "}
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigator.navigate("Signup");
            }}
          >
            <Text style={{ color: "#395b64", fontWeight: "400" }}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

export default Signin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  innerdiv: {
    width: 250,
    height: 350,
    backgroundColor: "#e7f6f3",
    borderRadius: 20,
    alignItems: "center",
    alignContent: "center",
    padding: 20,
  },
  opacity: {
    backgroundColor: "#d9d8d7",
    width: 150,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginTop: 20,
  },
  input: {
    borderBottomWidth: 2,
    marginTop: 20,
    width: 200,
    height: 40,
    alignItems: "center",
    color: "#94b6b8",
    fontSize: 15,
    paddingLeft: 10,
    fontWeight: "600",
  },
  box: {
    width: 30,
    height: 25,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
