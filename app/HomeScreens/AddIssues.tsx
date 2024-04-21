import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState, useEffect } from "react";

const Home = () => {
  const [image, setImage] = useState(null);
  const [pincode, setPincode] = useState("");
  const [location, setLocation] = useState("Geoloation");
  return (
    <ImageBackground
      source={require("D:\\Exploration\\greenguard\\assets\\images\\nativebackground.jpg")}
      style={{
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
      }}
    >
      <ScrollView
        style={{
          width: "100%",
          height: "100%",
        }}
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
          paddingTop: 10,
        }}
      >
        <KeyboardAvoidingView
          style={{
            width: "100%",
            height: "90%",
            justifyContent: "center",
            alignItems: "center",
          }}
          behavior="padding"
        >
          <View style={styles.container}>
            <Text style={styles.heading}>R E P O R T I S S U E</Text>
            <View style={styles.iamgeContainer}>
              <Image
                source={require("@/assets/images/63.jpg")}
                style={{
                  height: 160,
                  width: 160,
                }}
              />
              <TouchableOpacity
                style={{
                  padding: 10,
                  borderRadius: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                {image ? (
                  <Text style={styles.imagetext}>Retake Image</Text>
                ) : (
                  <Text style={styles.imagetext}>Select Image</Text>
                )}
              </TouchableOpacity>
            </View>
            <Text
              style={{
                color: "#395b64",
                fontSize: 20,
                fontWeight: "500",
              }}
            >
              Check if the geoLocation is correct
            </Text>
            <TextInput
              value={location}
              placeholder="GEOLOCATION"
              multiline={true}
              style={{
                backgroundColor: "white",
                padding: 10,
                borderRadius: 10,
                width: "100%",
                marginBottom: 20,
                color: "#395b64",
                fontSize: 20,
                height: 100,
                textAlignVertical: "top",
              }}
              onChangeText={setLocation}
              placeholderTextColor={"#395b64"}
            />
            <View
              style={{
                height: 30,
                marginTop: -20,
                width: "100%",
                flexDirection: "row",
                paddingLeft: 20,
                gap: 10,
              }}
            >
              <Text
                style={{
                  color: "#395b64",
                  fontSize: 20,
                  fontWeight: "500",
                }}
              >
                PinCode:
              </Text>
              <TextInput
                value={pincode}
                placeholder="enter your pincode"
                style={{
                  borderBottomWidth: 2,
                  width: "70%",
                  fontSize: 20,
                  color: "#395b64",
                  borderColor: "#395b64",
                }}
                placeholderTextColor={"#395b64"}
                onChangeText={setPincode}
                keyboardType="number-pad"
              />
            </View>
            <TextInput
              placeholder="Description"
              multiline={true}
              numberOfLines={10}
              style={{
                backgroundColor: "white",
                padding: 10,
                borderRadius: 10,
                width: "100%",
                marginBottom: 20,
                color: "#395b64",
                fontSize: 20,
                height: 200,
                maxHeight: 200,
                textAlignVertical: "top",
                textDecorationStyle: "solid",
                textDecorationLine: "underline",
                flexWrap: "wrap",
              }}
              placeholderTextColor={"#395b64"}
            />
            <TouchableOpacity
              style={{
                backgroundColor: "rgba(56, 90, 99,0.7)",
                padding: 10,
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                width: 150,
                marginTop: -20,
                height: 50,
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 23,
                  fontWeight: "bold",
                }}
              >
                S U B M I T
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </ImageBackground>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    height: 880,
    width: "95%",
    padding: 20,
    alignItems: "center",
    backgroundColor: "rgba(218, 237, 234,0.7)",
    borderRadius: 20,
    gap: 20,
  },
  heading: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#395b64",
    marginBottom: 20,
  },
  iamgeContainer: {
    height: 230,
    width: "100%",
    backgroundColor: "rgba(56, 90, 99,0.4)",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 20,
  },
  imagetext: { color: "#395b64", fontSize: 20, fontWeight: "500" },
});
