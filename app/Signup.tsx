import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useSignUp } from "@clerk/clerk-expo";
import axios from "axios";
import Spinner from "react-native-loading-spinner-overlay";
import * as SecureStore from "expo-secure-store";
import jwt_decode from "jwt-decode";

const Signup = () => {
  const [emailAddress, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [validation, setValidation] = useState(false);
  const [code, setCode] = useState("");
  const [isLoading, setLoading] = useState(false);

  const { signUp, isLoaded, setActive } = useSignUp();
  const handleSignup = async () => {
    if (!isLoaded) return;
    if (password !== confirmPassword) {
      Alert.alert("Passwords do not match");
      return;
    }
    try {
      const response = await signUp.create({
        emailAddress,
        password,
        firstName,
        lastName,
        username,
      });
      console.log(response);
      setValidation(true);
      signUp?.prepareEmailAddressVerification({
        strategy: "email_code",
      });
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  const VerifyemailAddress = async () => {
    try {
      const response = await signUp?.attemptEmailAddressVerification({
        code,
      });
      console.log(response);

      setLoading(true);
      const token = await axios.post(
        "https://greenguard.onrender.com/user/user",
        {
          email: emailAddress,
          clientid: response?.id,
          FirstName: firstName,
          LastName: lastName,
          username,
        }
      );
      await SecureStore.setItemAsync("token", token.data.token);
      setLoading(false);

      if (response) {
        await setActive?.({
          session: response.createdSessionId,
        });
      }
    } catch (err: any) {
      setLoading(false);
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <ImageBackground
      source={require("../assets/images/nativebackground.jpg")}
      style={styles.container}
    >
      {isLoading && (
        <Spinner
          visible={isLoading} // Bind visibility to state
          textContent={"Loading..."} // Optional text content
          textStyle={{ color: "white" }} // Optional text style
          overlayColor="rgba(0, 0, 0, 0.7)" // Optional overlay color
        />
      )}
      {!validation && (
        <View style={styles.innerdiv}>
          <Text
            style={{
              fontSize: 30,
              color: "#94b6b8",
              fontWeight: "600",
              marginTop: 20,
            }}
          >
            S I G N U P{" "}
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
          <TextInput
            placeholder="C O N F I R M  P A S S W O R D"
            style={styles.input}
            placeholderTextColor={"#395b64"}
            secureTextEntry={true}
            onChangeText={setConfirmPassword}
          />
          <TextInput
            placeholder="F I R S T N A M E"
            style={styles.input}
            placeholderTextColor="#395b64"
            onChangeText={setFirstName}
          />
          <TextInput
            placeholder="L A S T N A M E"
            style={styles.input}
            placeholderTextColor="#395b64"
            onChangeText={setLastName}
          />
          <TextInput
            placeholder="U S E R N A M E"
            style={styles.input}
            placeholderTextColor="#395b64"
            onChangeText={setUsername}
          />
          <TouchableOpacity
            style={styles.opacity}
            onPress={() => handleSignup()}
          >
            <View>
              <Text style={{ color: "#42626a" }}>S I G N U P</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
      {validation && (
        <View style={styles.innerdiv}>
          <Text
            style={{
              fontSize: 30,
              color: "#94b6b8",
              fontWeight: "600",
              marginTop: 20,
            }}
          >
            VERIFICATION
          </Text>
          <Text
            style={{
              fontSize: 15,
              color: "#94b6b8",
              fontWeight: "600",
              marginTop: 20,
            }}
          >
            A verification code has been sent to your email address. Please
            enter the code below.
          </Text>
          <TextInput
            placeholder="V E R I F I C A T I O N  C O D E"
            style={styles.input}
            placeholderTextColor="#395b64"
            onChangeText={setCode}
          />
          <TouchableOpacity
            style={styles.opacity}
            onPress={() => VerifyemailAddress()}
          >
            <View>
              <Text style={{ color: "#42626a" }}>V E R I F Y</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </ImageBackground>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  innerdiv: {
    width: 275,
    padding: 10,
    height: 500,
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
    width: 220,
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
