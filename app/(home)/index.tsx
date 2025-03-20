import { useEffect } from "react";
import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import { Text, View, StyleSheet, ActivityIndicator, Image } from "react-native";
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
  const router = useRouter();
  const { updateUser } = useUser1();

  // UseEffect for decoding the token and updating user
  useEffect(() => {
    if (user) {
      setTimeout(() => {
        router.replace("/(main)/Home");
      }, 3000);
    }

    const decodeTokenAndSetUser = async () => {
      const token = await SecureStore.getItemAsync("token");
      if (token) {
        try {
          const decoded = jwt.jwtDecode<DecodedToken>(token);
          updateUser({
            id: decoded?.user?._id,
            email: decoded?.user.email,
            username: decoded?.user.username,
            firstName: decoded?.user.FirstName,
            lastName: decoded?.user.LastName,
            anonymousId: decoded?.user.anonymousId,
          });
        } catch (error) {
          console.log("Error decoding token:", error);
        }
      }
    };

    decodeTokenAndSetUser();
  }, [user]);

  return (
    <View style={styles.container}>
      {/* Add a logo image at the top */}
      <Image
        source={require("D:\\Exploration\\greenguard-expo\\assets\\images\\react-logo.png")}
        style={styles.logo}
      />

      <SignedOut>
        <Link href="/(auth)/sign-in" style={styles.link}>
          <Text style={styles.linkText}>Sign In</Text>
        </Link>
        <Link href="/(auth)/sign-up" style={styles.link}>
          <Text style={styles.linkText}>Sign Up</Text>
        </Link>
      </SignedOut>

      <SignedIn>
        <Text style={styles.welcomeText}>Welcome! Redirecting to Home...</Text>
        {/* Add a loading indicator while redirecting */}
        <ActivityIndicator size="large" color="#1E90FF" />
      </SignedIn>
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
  logo: {
    width: 120, // Set logo width
    height: 120, // Set logo height
    marginBottom: 40, // Add space between logo and links
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333", // Darker text color
    marginBottom: 20,
  },
  link: {
    marginVertical: 10,
    padding: 15, // Add more padding for a larger touch area
    backgroundColor: "#1E90FF", // Blue background for links
    borderRadius: 8, // Make corners more rounded
    width: "80%", // Set a fixed width for the buttons
    alignItems: "center", // Center text inside the button
  },
  linkText: {
    color: "#fff", // White text for links
    fontSize: 18,
    fontWeight: "600", // Make the text a bit bolder
  },
});
