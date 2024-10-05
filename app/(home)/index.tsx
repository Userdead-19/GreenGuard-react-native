import { useEffect } from "react";
import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import { Text, View, StyleSheet } from "react-native";
import { useUser as useUser1 } from "@/hooks/UserContext";
import * as jwt from "jwt-decode";
import * as SecureStore from "expo-secure-store";
type DecodedToken = {
  user: {
    _id: string;
    email: string;
    username: string;
    FirstName: string;
    LastName: string;
    anonymousId: string;
  };
};

export default function Page() {
  const { user } = useUser();
  const router = useRouter(); // Use the router hook for navigation
  const { updateUser } = useUser1();

  // Use useEffect to check if the user is signed in and navigate to the home page
  useEffect(() => {
    if (user) {
      setTimeout(() => {
        router.replace("/(main)/Home");
      }, 2000);
    }

    (async () => {
      const token = await SecureStore.getItemAsync("token");
      const decode = await jwt.jwtDecode<DecodedToken>(token || " ");
      console.log(decode);
      updateUser({
        id: decode?.user?._id,
        email: decode.user.email,
        username: decode.user.username,
        firstName: decode.user.FirstName,
        lastName: decode.user.LastName,
        anonymousId: decode.user.anonymousId,
      });
    })();
  }, [user]);

  return (
    <View style={styles.container}>
      <SignedOut>
        <Link href="/(auth)/sign-in" style={styles.link}>
          <Text style={styles.linkText}>Sign In</Text>
        </Link>
        <Link href="/(auth)/sign-up" style={styles.link}>
          <Text style={styles.linkText}>Sign Up</Text>
        </Link>
      </SignedOut>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5", // Light gray background
    padding: 16,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333", // Darker text color
    marginBottom: 20,
  },
  link: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: "#1E90FF", // Blue background for links
    borderRadius: 5,
  },
  linkText: {
    color: "#fff", // White text for links
    fontSize: 18,
  },
});
