import { useSignIn } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import {
  Text,
  TextInput,
  Button,
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import * as jwt from "jwt-decode";
import { useUser } from "@/hooks/UserContext";

export default function Page() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { updateUser } = useUser();
  const onSignInPress = React.useCallback(async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });
      const token = await axios.post(
        `https://greenguard.onrender.com/user/login`,
        {
          identifier: emailAddress,
        }
      );
      await SecureStore.setItemAsync("token", token.data.token);
      const decode = await jwt.jwtDecode<any>(token.data.token || " ");
      console.log(decode);
      updateUser({
        id: decode?.user?._id,
        email: decode.user.email,
        username: decode.user.username,
        firstName: decode.user.FirstName,
        lastName: decode.user.LastName,
        anonymousId: decode.user.anonymousId,
      });
      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/");
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  }, [isLoaded, emailAddress, password]);

  return (
    <ImageBackground
      source={require("D:\\Exploration\\greenguard-expo\\assets\\images\\nativebackground.jpg")} // Use the background image path
      style={styles.background}
    >
      <View style={styles.loginContainer}>
        <Text style={styles.title}>LOGIN</Text>

        <TextInput
          style={styles.input}
          autoCapitalize="none"
          value={emailAddress}
          placeholder="Username"
          placeholderTextColor="#aaa"
          onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
        />
        <TextInput
          style={styles.input}
          value={password}
          placeholder="Password"
          placeholderTextColor="#aaa"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />

        <TouchableOpacity style={styles.loginButton} onPress={onSignInPress}>
          <Text style={styles.loginButtonText}>LOGIN</Text>
        </TouchableOpacity>

        <Text style={styles.text}>
          Don't Have An Account?{" "}
          <Link href="/sign-up" style={styles.signUpLink}>
            <Text>SIGN UP</Text>
          </Link>
        </Text>
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
  loginContainer: {
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
  loginButton: {
    backgroundColor: "#ccc",
    paddingVertical: 10,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
    marginVertical: 15,
  },
  loginButtonText: {
    color: "#333",
    fontWeight: "bold",
    fontSize: 16,
  },
  text: {
    color: "#333",
    fontSize: 14,
  },
  signUpLink: {
    fontWeight: "bold",
    color: "#333",
  },
  orText: {
    marginVertical: 10,
    color: "#333",
    fontSize: 16,
  },
  googleButton: {
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  googleIcon: {
    width: 24,
    height: 24,
  },
});
