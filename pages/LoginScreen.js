import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {
  const navigation = useNavigation();
  return (
    <ImageBackground
      source={require("../assets/nativebackground.jpg")}
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
          L O G I N
        </Text>
        <TextInput
          placeholder="U s e r n a m e"
          style={styles.input}
        ></TextInput>
        <TextInput
          placeholder="P a s s w o r d"
          style={styles.input}
        ></TextInput>
        <TouchableOpacity
          style={styles.opacity}
          onPress={() => {
            navigation.navigate("Home");
          }}
        >
          <Text
            style={{
              fontSize: 20,
              color: "#486465",
              fontWeight: "600",
            }}
          >
            L O G I N
          </Text>
        </TouchableOpacity>
        <View style={{ flexDirection: "row", marginTop: 10 }}>
          <Text style={{ color: "#395b64", fontWeight: "400" }}>
            Don't have an Account ?{" "}
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Signup");
            }}
          >
            <Text style={{ color: "#395b64", fontWeight: "400" }}>Sign up</Text>
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: "row", marginTop: 15 }}>
          <View
            style={{ width: 60, height: 0, borderWidth: 1, marginTop: 10 }}
          ></View>
          <View style={styles.box}>
            <Text>OR</Text>
          </View>
          <View
            style={{ width: 60, height: 0, borderWidth: 1, marginTop: 10 }}
          ></View>
        </View>

        <TouchableOpacity style={{ marginTop: 0 }} onPress={() => {}}>
          <Image
            source={require("../assets/glogobg.png")}
            style={{
              flex: 1,
              width: 50,
              height: 50,
              resizeMode: "contain",
              marginBottom: 300,
            }}
          ></Image>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  innerdiv: {
    width: 250,
    height: 400,
    backgroundColor: "#e7f6f3",
    borderRadius: 20,
    alignItems: "center",
    alignContent: "center",
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
  },
  box: {
    width: 30,
    height: 25,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
