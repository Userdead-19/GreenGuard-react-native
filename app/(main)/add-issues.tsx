import {
  ScrollView,
  ImageBackground,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Text, TextInput, Button } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { useUser } from "@/hooks/UserContext";

const AddIssues = () => {
  const [image, setImage] = useState<string | null>(null);
  const [location, setLocation] = useState<string>("");
  const [coords, setCoords] = useState<Location.LocationObject | null>(null);
  const [pincode, setPincode] = useState<string>("");
  const [imageBase64, setImageBase64] = useState<string | null>(null); // State for base64 string
  const user = useUser();
  const [category, setCategory] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [issueTitle, setIssueTitle] = useState<string>(""); // New state for issue title
  const [contact, setContact] = useState<string>(""); // New state for contact

  // Function to open a dialog asking whether to take a photo or pick from gallery
  const chooseImageSource = async () => {
    Alert.alert(
      "Select Image",
      "Would you like to take a new picture or choose from gallery?",
      [
        {
          text: "Take Photo",
          onPress: () => takePhoto(),
        },
        {
          text: "Choose from Gallery",
          onPress: () => pickImage(),
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ]
    );
  };

  // Take a photo with the camera
  // Take a photo with the camera
  const takePhoto = async () => {
    let cameraPermission = await ImagePicker.requestCameraPermissionsAsync();

    if (cameraPermission.granted === false) {
      Alert.alert("Permission Denied", "You need to grant camera permission.");
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true, // Request base64 format
    });

    if (!result.canceled) {
      if (result.assets && result.assets.length > 0) {
        const selectedImage = result.assets[0];

        // Since camera typically uses JPEG, set the MIME type accordingly
        const base64Image = `data:image/jpeg;base64,${selectedImage.base64}`;

        setImage(selectedImage.uri); // Set the image URI
        setImageBase64(base64Image); // Set base64 string with MIME type
      }
    }
  };

  // Pick an image from the gallery
  const pickImage = async () => {
    let galleryPermission =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (galleryPermission.granted === false) {
      Alert.alert(
        "Permission Denied",
        "You need to grant permission to access the gallery."
      );
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true, // Request base64 format
    });

    if (!result.canceled) {
      if (result.assets && result.assets.length > 0) {
        const selectedImage = result.assets[0];

        // Determine the MIME type based on file extension or metadata
        let mimeType = "image/jpeg"; // Default to JPEG
        if (selectedImage.uri.toLowerCase().endsWith(".png")) {
          mimeType = "image/png";
        } else if (selectedImage.uri.toLowerCase().endsWith(".gif")) {
          mimeType = "image/gif";
        }

        // Prepend the MIME type to the base64 string
        const base64Image = `data:${mimeType};base64,${selectedImage.base64}`;

        setImage(selectedImage.uri); // Set the image URI
        setImageBase64(base64Image); // Set base64 string with MIME type
      }
    }
  };

  // Access the user's location
  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "You need to grant location permission."
      );
      return;
    }

    let locationResult = await Location.getCurrentPositionAsync({});
    const address = await Location.reverseGeocodeAsync(locationResult.coords);
    const locationName = address[0]?.city
      ? `${address[0].city}, ${address[0].region}`
      : "Unknown Location";
    console.log(locationResult);
    setCoords(locationResult);
    setLocation(locationName);
    setPincode(address[0]?.postalCode || "");
  };

  const submitIssue = async () => {
    if (
      !imageBase64 ||
      !location ||
      !pincode ||
      !category ||
      !description ||
      !issueTitle
    ) {
      Alert.alert(
        "Error",
        "Please fill in all the fields and upload an image."
      );
      return;
    }
    const token = await SecureStore.getItemAsync("token"); // Get the token from SecureStore
    // Define the API endpoint
    const apiEndpoint = "https://greenguard.onrender.com/issues/create"; // Replace with your actual API endpoint

    // Create the request payload
    const issueData = {
      IssueImage: imageBase64, // Base64 image string
      IssueLocation: location,
      IssuePincode: pincode,
      IssueDescription: description,
      IssueType: category,
      IssueTitle: issueTitle, // Send the issue title
      IssueContact: contact, // Send the contact info
      IssueLatitude: coords?.coords.latitude,
      IssueLongitude: coords?.coords.longitude,
      createdBy: user.anonymousId,
      ForwardedByPeople: [user.id],
    };
    /*    IssueTitle: string;
    IssueDescription: string;
    IssueStatus: string;
    Views: number;
    IssueType: string;
    IssueImage: string;
    IssueDate: string;
    IssueLocation: string;
    IssueLatitude: number;
    IssueLongitude: number;
    IssueContact: string;
    IssuePincode: string;
    ForwardedByPeople: string[]; */
    try {
      const response = await axios.post(apiEndpoint, issueData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 201) {
        Alert.alert("Success", "Issue submitted successfully!");
        // Clear the fields
        setImage(null);
        setLocation("");
        setPincode("");
        setCategory("");
        setDescription("");
        setImageBase64(null);
        setIssueTitle(""); // Clear issue title
        setContact(""); // Clear contact
      } else {
        Alert.alert("Error", response.data || "Failed to submit issue.");
      }
      console.log(response.data);
    } catch (error: any) {
      console.error(error.message);
      Alert.alert("Error", "Something went wrong. Please try again later.");
    }
  };

  useEffect(() => {
    getLocation();
    const date = new Date().toISOString();
    console.log(date); // Automatically get location when the component loads
  }, []);

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
            backgroundColor: "rgba(255,255,255,0.6)",
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

          {/* Issue Title Field */}
          <TextInput
            label={"Issue Title"}
            value={issueTitle}
            onChangeText={setIssueTitle}
            placeholder="Enter the issue title"
            style={{ width: "100%", marginVertical: 10 }}
          />

          {/* Contact Field */}
          <TextInput
            label={"Contact"}
            value={contact}
            onChangeText={setContact}
            placeholder="Enter contact information"
            style={{ width: "100%", marginVertical: 10 }}
          />

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
            {image ? (
              <Image
                source={{ uri: image }}
                style={{
                  width: 131,
                  height: 131,
                }}
              />
            ) : (
              <Image
                source={require("@/assets/images/63.jpg")}
                style={{
                  width: 131,
                  height: 131,
                }}
              />
            )}
            <View
              style={{
                padding: 10,
                justifyContent: "center",
              }}
            >
              <TouchableOpacity onPress={chooseImageSource}>
                <Text variant="labelLarge">
                  {image ? "Change Image" : "Add Image"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {location ? (
            <TextInput
              label="Location"
              value={location}
              onChangeText={setLocation}
              style={{
                width: "100%",
                borderRadius: 10,
                marginVertical: 10,
              }}
            />
          ) : (
            <Text variant="headlineMedium">
              Please select image, the location will be automatically updated
            </Text>
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
              value={pincode}
              onChangeText={setPincode}
            />
          </View>

          <TextInput
            label={"Description"}
            value={description}
            onChangeText={setDescription}
            style={{
              width: "100%",
              marginVertical: 10,
              height: 100,
            }}
            multiline
          />
          <TextInput
            label={"Category"}
            value={category}
            onChangeText={setCategory}
            style={{
              width: "100%",
              marginVertical: 10,
            }}
          />
          <Button mode="contained" onPress={submitIssue}>
            Submit
          </Button>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default AddIssues;
