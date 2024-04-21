import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import Constants from "expo-constants";
import { Text } from "react-native";
import * as SecureStore from "expo-secure-store";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Signin from "./app/Signin";
import Signup from "./app/Signup";
import Homepage from "./app/Homepage";
const Stack = createNativeStackNavigator();

const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

const App = () => {
  return (
    <ClerkProvider
      publishableKey={
        Constants.expoConfig?.extra?.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY ?? ""
      }
      tokenCache={tokenCache}
    >
      <SignedIn>
        <Homepage />
      </SignedIn>
      <SignedOut>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Signin" component={Signin} />
            <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen name="Homepage" component={Homepage} />
          </Stack.Navigator>
        </NavigationContainer>
      </SignedOut>
    </ClerkProvider>
  );
};

export default App;
