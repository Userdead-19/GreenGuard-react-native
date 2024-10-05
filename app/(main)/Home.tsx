import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useUser } from "@/hooks/UserContext";

const Home = () => {
  const user = useUser();
  console.log(user);
  return (
    <View>
      <Text>Home</Text>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
