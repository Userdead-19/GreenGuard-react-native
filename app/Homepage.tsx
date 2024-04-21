import { TouchableOpacity, StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./HomeScreens/Home";
import Issues from "./HomeScreens/Issues";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import AddIssues from "./HomeScreens/AddIssues";
import Profile from "./HomeScreens/Profile";
import Menu from "./HomeScreens/BottomSreen";

const tabs = createBottomTabNavigator();
const Homepage = () => {
  const Customtabbar = ({
    children,
    onPress,
  }: {
    children: React.ReactNode;
    onPress: () => void;
  }) => (
    <TouchableOpacity
      style={{
        justifyContent: "center",
        alignItems: "center",
        ...styles.shadow,
      }}
      onPress={onPress}
    >
      <View style={{ width: 70, height: 70, borderRadius: 35 }}>
        {children}
      </View>
    </TouchableOpacity>
  );

  return (
    <NavigationContainer>
      <tabs.Navigator
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
        <tabs.Screen
          name="Home"
          component={Home}
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" color={color} size={size} />
            ),
            headerShown: false,
          }}
        />
        <tabs.Screen
          name="Issues"
          component={Issues}
          options={{
            tabBarLabel: "Issues",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="dump-truck"
                size={34}
                color={color}
              />
            ),
            headerShown: false,
          }}
        />
        <tabs.Screen
          name="add issue"
          component={AddIssues}
          options={{
            tabBarIcon: ({ size, color }) => (
              <Ionicons name="add-circle" size={60} color={"#395b64"} />
            ),

            headerShown: false,
          }}
        />
        <tabs.Screen
          name="UserProfile"
          component={Profile}
          options={{
            tabBarLabel: "Profile",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person" color={color} size={size} />
            ),
            headerShown: false,
          }}
        />
        <tabs.Screen
          name="Menu"
          component={Menu}
          options={{
            tabBarLabel: "Menu",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="menu" color={color} size={size} />
            ),
            headerShown: false,
          }}
        />
      </tabs.Navigator>
    </NavigationContainer>
  );
};

export default Homepage;
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
