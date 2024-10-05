import { Tabs } from "expo-router";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          backgroundColor: "rgba(231,246, 242, 0.8)",
          height: 90,
          ...styles.shadow,
        },
        tabBarActiveTintColor: "#395b64",
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tabs.Screen
        name="Home"
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" size={34} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="Issues"
        options={{
          tabBarLabel: "Issues",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="dump-truck" size={34} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="add-issues"
        options={{
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="add-circle" size={60} color={"#395b64"} />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="menu"
        options={{
          tabBarLabel: "Menu",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="menu" color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#7f5df0",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});
