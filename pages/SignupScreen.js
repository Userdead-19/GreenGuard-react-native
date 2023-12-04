import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";

const SignupScreen = () => {
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
          S I G N U P
        </Text>
        <TextInput
          placeholder="U s e r n a m e"
          style={styles.input}
        ></TextInput>
        <TextInput placeholder="E M A I L" style={styles.input} />
        <TextInput placeholder="P a s s w o r d" style={styles.input} />
        <TextInput
          placeholder="C o n f i r m P a s s w o r d"
          style={styles.input}
        />

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
            S I G N U P
          </Text>
        </TouchableOpacity>
        <View style={{ flexDirection: "row", marginTop: 10 }}>
          <Text style={{ color: "#395b64", fontWeight: "400" }}>
            Already have an Account ?{" "}
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Login");
            }}
          >
            <Text
              style={{
                color: "#395b64",
                fontWeight: "600",
              }}
            >
              L O G I N
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  innerdiv: {
    width: 270,
    height: 450,
    backgroundColor: "#e7f6f3",
    borderRadius: 20,
    alignItems: "center",
    alignContent: "center",
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
  opacity: {
    backgroundColor: "#d9d8d7",
    width: 150,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginTop: 20,
  },
});
