import * as React from "react";
import {
  TextInput,
  Button,
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Text,
} from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { Checkbox } from "react-native-paper";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import * as jwt from "jwt-decode";
import { useUser } from "@/hooks/UserContext";

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [firstName, setFirstName] = React.useState(""); // New state for first name
  const [lastName, setLastName] = React.useState(""); // New state for last name
  const [confirmPassword, setConfirmPassword] = React.useState(""); // For password confirmation
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState("");
  const { updateUser } = useUser();
  const [agreeTerms, setAgreeTerms] = React.useState(false); // For the terms and conditions checkbox

  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
      }

      await signUp.create({
        emailAddress,
        password,
        username,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setPendingVerification(true);
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });
      const response = await axios.post(
        "https://greenguard.onrender.com/user/user",
        {
          email: emailAddress,
          clientid: completeSignUp?.id,
          FirstName: firstName, // Pass first name
          LastName: lastName, // Pass last name
          username,
        }
      );
      await SecureStore.setItemAsync("token", response.data.token);
      const token = await SecureStore.getItemAsync("token");
      const decode = await jwt.jwtDecode<any>(token || " ");
      console.log(decode);
      updateUser({
        id: decode?.user?._id,
        email: decode.user.email,
        username: decode.user.username,
        firstName: decode.user.FirstName,
        lastName: decode.user.LastName,
        anonymousId: decode.user.anonymousId,
      });
      if (completeSignUp.status === "complete") {
        console.log(completeSignUp);
        await setActive({ session: completeSignUp.createdSessionId });
        router.replace({ pathname: "/(main)/Home" });
      } else {
        console.error(JSON.stringify(completeSignUp, null, 2));
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <ImageBackground
      source={require("D:\\Exploration\\greenguard-expo\\assets\\images\\nativebackground.jpg")} // Use your background image path
      style={styles.background}
    >
      <View style={styles.signUpContainer}>
        <Text style={styles.title}>SIGNUP</Text>

        {!pendingVerification && (
          <>
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              value={emailAddress}
              placeholder="Email..."
              placeholderTextColor="#aaa"
              onChangeText={(email) => setEmailAddress(email)}
            />
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              value={username}
              placeholder="Username..."
              placeholderTextColor="#aaa"
              onChangeText={(name) => setUsername(name)}
            />
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              value={firstName} // First name input
              placeholder="First Name..."
              placeholderTextColor="#aaa"
              onChangeText={(name) => setFirstName(name)}
            />
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              value={lastName} // Last name input
              placeholder="Last Name..."
              placeholderTextColor="#aaa"
              onChangeText={(name) => setLastName(name)}
            />
            <TextInput
              style={styles.input}
              value={password}
              placeholder="Password..."
              placeholderTextColor="#aaa"
              secureTextEntry={true}
              onChangeText={(password) => setPassword(password)}
            />
            <TextInput
              style={styles.input}
              value={confirmPassword}
              placeholder="Confirm Password..."
              placeholderTextColor="#aaa"
              secureTextEntry={true}
              onChangeText={(password) => setConfirmPassword(password)}
            />

            <View style={styles.checkboxContainer}>
              <Checkbox
                status={agreeTerms ? "checked" : "unchecked"}
                onPress={() => {
                  setAgreeTerms(!agreeTerms);
                }}
              />
              <Text style={styles.checkboxText}>
                Agree To Terms & Conditions
              </Text>
            </View>

            <TouchableOpacity
              style={styles.signUpButton}
              onPress={onSignUpPress}
              disabled={!agreeTerms} // Disable the sign-up button if terms are not agreed
            >
              <Text style={styles.signUpButtonText}>SIGNUP</Text>
            </TouchableOpacity>
          </>
        )}

        {pendingVerification && (
          <>
            <TextInput
              style={styles.input}
              value={code}
              placeholder="Verification Code..."
              placeholderTextColor="#aaa"
              onChangeText={(code) => setCode(code)}
            />
            <TouchableOpacity
              style={styles.verifyButton}
              onPress={onPressVerify}
            >
              <Text style={styles.verifyButtonText}>Verify Email</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
  signUpContainer: {
    backgroundColor: "#f0f8ff",
    width: "80%",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  input: {
    width: "100%",
    height: 40,
    backgroundColor: "#fff",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  checkboxText: {
    marginLeft: 10,
    color: "#333",
  },
  signUpButton: {
    backgroundColor: "#ccc",
    paddingVertical: 10,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
    marginVertical: 15,
  },
  signUpButtonText: {
    color: "#333",
    fontWeight: "bold",
    fontSize: 16,
  },
  verifyButton: {
    backgroundColor: "#ccc",
    paddingVertical: 10,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
    marginVertical: 15,
  },
  verifyButtonText: {
    color: "#333",
    fontWeight: "bold",
    fontSize: 16,
  },
});
