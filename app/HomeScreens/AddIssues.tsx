import {
  ScrollView,
  ImageBackground,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { Text, TextInput, List, Button } from "react-native-paper";

const AddIssues = () => {
  const [image, setImage] = useState(true);
  const [location, setLocation] = useState("");
  return (
    <ImageBackground
      source={require("@/assets/images/nativebackground.jpg")}
      style={{
        height: "100%",
        width: "100%",
      }}
    >
      <ScrollView
        scrollEnabled
        alwaysBounceVertical={true}
        contentContainerStyle={{
          padding: 10,
          paddingTop: 50,
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            padding: 20,
            backgroundColor: "rgba(255,255,255,0.5)",
            borderRadius: 10,
          }}
        >
          <Text
            variant="displayMedium"
            style={{
              color: "#A5C9CA",
            }}
          >
            Add Issues
          </Text>
          <View
            style={{
              flex: 1,
              width: "100%",
              height: 200,
              backgroundColor: "rgba(255,255,255,0.5)",
              marginVertical: 20,
              flexDirection: "row",
              paddingTop: 10,
              paddingLeft: 10,
              alignItems: "center",
              gap: 30,
            }}
          >
            <Image
              source={require("@/assets/images/63.jpg")}
              style={{
                width: 131,
                height: 131,
              }}
            />
            <View
              style={{
                padding: 10,
                justifyContent: "center",
              }}
            >
              <TouchableOpacity>
                <Text variant="labelLarge">
                  {!image ? "add image" : "Change image"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {location ? (
            <Text variant="headlineMedium">
              Please select image the location will be automatically updated
            </Text>
          ) : (
            <TextInput
              label={"Location"}
              placeholder="Location"
              style={{ width: "100%", textAlignVertical: "top" }}
              multiline
              value={location}
              onChangeText={setLocation}
              numberOfLines={4}
            />
          )}
          <View
            style={{
              flexDirection: "row",
              padding: 10,
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text
              variant="headlineSmall"
              style={{
                fontWeight: "bold",
              }}
            >
              PINCODE :
            </Text>
            <TextInput
              label={"Pincode"}
              style={{
                width: "70%",
                borderRadius: 10,
              }}
            />
          </View>
          <TextInput
            label={"Description"}
            placeholder="Description"
            style={{ width: "100%", textAlignVertical: "top" }}
            multiline
            numberOfLines={4}
          />
          <View
            style={{
              flexDirection: "row",
              padding: 10,
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text
              variant="headlineSmall"
              style={{
                fontWeight: "bold",
              }}
            >
              CATEGORY :
            </Text>
            <TextInput
              label={"Category"}
              style={{
                width: "70%",
                borderRadius: 10,
              }}
            />
          </View>
          <Button
            mode="elevated"
            style={{
              width: "50%",
              borderRadius: 10,
              marginVertical: 10,
              alignSelf: "center",
              backgroundColor: "#A5C9CA",
            }}
            labelStyle={{
              color: "white",
              fontSize: 20,
            }}
          >
            SUBMIT
          </Button>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default AddIssues;

const styles = StyleSheet.create({});
