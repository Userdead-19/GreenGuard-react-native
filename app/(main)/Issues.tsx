import {
  ImageBackground,
  StyleSheet,
  View,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import React, { useEffect } from "react";
import { Divider, Text, Button, Appbar } from "react-native-paper";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import { useUser } from "@/hooks/UserContext";

const IssueComponent = ({
  issue,
  user,
  ForwardIssue,
}: {
  issue: any;
  user: any;
  ForwardIssue: Function;
}) => {
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
        Anonymous id : {issue.createdBy}
      </Text>
      <Text variant="bodySmall">location : {issue.IssueLocation}</Text>
      <Divider
        style={{
          marginVertical: 10,
          borderWidth: 0.5,
        }}
      />
      <Image
        source={{ uri: issue.IssueImage }}
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
        {issue.ForwardedByPeople &&
        issue.ForwardedByPeople.includes(user.id) ? (
          <Button
            disabled={true}
            labelStyle={{
              fontSize: 9,
            }}
          >
            Forwarding Done
          </Button>
        ) : (
          <Button
            onPress={() => {
              ForwardIssue(issue._id);
            }}
          >
            Forward
          </Button>
        )}

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
  const user = useUser();
  const [issues, setIssues] = React.useState<any>([]);

  const ForwardIssue = async (issueId: string) => {
    const token = await SecureStore.getItemAsync("token");
    console.log(token); // Ensure token is printed correctly here

    if (!token) {
      Alert.alert("Error", "Token is missing");
      return;
    }

    try {
      const response = await axios.put(
        `https://greenguard.onrender.com/issues/${issueId}/${user.id}/forward`,
        {}, // Empty request body for PUT
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pass headers here
          },
        }
      );

      issues.forEach((element: any) => {
        if (element._id === issueId) {
          element.ForwardedByPeople.push(user.id);
        }
      });

      setIssues(issues);
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to forward issue");
    }
  };

  const retrieveIssues = async () => {
    const token = await SecureStore.getItemAsync("token");
    try {
      const response = await axios.get(
        "https://greenguard.onrender.com/issues/all",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIssues(response.data);
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to retrieve issues");
    }
  };

  useEffect(() => {
    retrieveIssues();
  }, []);

  return (
    <ImageBackground
      source={require("@/assets/images/nativebackground.jpg")}
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
          {issues.map((issue: any, index: any) => (
            <IssueComponent
              key={issue._id}
              issue={issue}
              user={user}
              ForwardIssue={ForwardIssue}
            />
          ))}
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default Issues;
