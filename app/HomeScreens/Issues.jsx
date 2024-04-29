import {
  ImageBackground,
  StyleSheet,
  View,
  Image,
  ScrollView,
} from "react-native";
import React from "react";
import { Divider, Text, Button, Appbar } from "react-native-paper";

const IssueComponent = ({ Anonymousid, location, image, key }) => {
  return (
    <View
      style={{
        backgroundColor: "rgba(255,255,255,0.5)",
        width: "100%",
        padding: 20,
        borderRadius: 10,
        gap: 10,
      }}
    >
      <Text
        variant="titleMedium"
        style={{
          fontWeight: "bold",
        }}
      >
        Anonymous id : {Anonymousid}
      </Text>
      <Text variant="bodySmall">location : {location}</Text>
      <Divider
        style={{
          marginVertical: 10,
          borderWidth: 0.5,
        }}
      />
      <Image
        source={require("@/assets/images/63.jpg")}
        style={{
          width: "100%",
          height: 200,
          borderRadius: 10,
        }}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 5,
          borderWidth: 0.5,
          borderRadius: 10,
        }}
      >
        <Button>Forward</Button>
        <Divider
          style={{
            borderWidth: 0.5,
            height: "100%",
          }}
        />
        <Button>Share</Button>
        <Divider
          style={{
            borderWidth: 0.5,
            height: "100%",
          }}
        />
        <Button icon={"comment"}>Comment</Button>
      </View>
    </View>
  );
};

const Issues = () => {
  let isssueArr = [1, 2, 3, 4];
  return (
    <ImageBackground
      source={require("D:\\Exploration\\greenguard\\assets\\images\\nativebackground.jpg")}
      style={{
        width: "100%",
        height: "100%",
        alignItems: "center",
      }}
    >
      <Appbar.Header
        style={{
          backgroundColor: "rgba(255,255,255,0.5)",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <Appbar.Content title="Issues" />
      </Appbar.Header>
      <ScrollView
        alwaysBounceVertical={true}
        style={{
          width: "100%",
          padding: 20,
        }}
      >
        <View
          style={{
            width: "100%",
            gap: 10,
            paddingBottom: 20,
          }}
        >
          {isssueArr.map((index) => (
            <IssueComponent
              key={index}
              Anonymousid="123456"
              location="!!!"
              image="@/assets/images/63.jpg"
            />
          ))}
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default Issues;
