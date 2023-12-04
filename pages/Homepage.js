import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const Tab = createBottomTabNavigator();
import Issues from "./slides/Issues";
import UserProfile from "./slides/UserProfile";
import { Ionicons } from "@expo/vector-icons";

const Homepage = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen3444
        name="Issues"
        component={Issues}
        options={{
          tabBarIcon: () => <Ionicons name="home" size={10} color="blue" />,
        }}
      />
      <Tab.Screen name="UserProfile" component={UserProfile} />
    </Tab.Navigator>
  );
};

export default Homepage;

const styles = StyleSheet.create({});
