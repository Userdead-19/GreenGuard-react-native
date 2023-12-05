import {
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const tabs = createBottomTabNavigator();
import { Ionicons } from "@expo/vector-icons";
import UserProfile from "./slides/UserProfile";
import Issues from "./slides/Issues";
import Addissues from "./slides/Addissues";
import { colors } from "react-native-elements";

const Homepage = () => {
  const Customtabbar = ({ children, onPress }) => (
    <TouchableOpacity
      style={{
        top: -40,
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
    <tabs.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 25,
          left: 20,
          right: 20,
          elevation: 0,
          backgroundColor: "#ffffff",
          borderRadius: 15,
          height: 90,
          ...styles.shadow,
        },
      }}
    >
      <tabs.Screen
        name="Issues"
        component={Issues}
        options={{
          tabBarLabel: "Issues",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="alert" color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
      <tabs.Screen
        name="add issue"
        component={Addissues}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="add-circle" size={60} color={colors} />
          ),
          tabBarButton: (props) => <Customtabbar {...props} />,
          headerShown: false,
        }}
      />
      <tabs.Screen
        name="UserProfile"
        component={UserProfile}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
    </tabs.Navigator>
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
