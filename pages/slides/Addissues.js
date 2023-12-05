import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  LogBox,
  TouchableOpacity,
  Modal,
  Button,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import Icon from "react-native-vector-icons/FontAwesome";

const Addissues = () => {
  const navigation = useNavigation();
  const [image, setImage] = React.useState(null);
  const [geoLocation, setGeoLocation] = React.useState(null);
  const [showModal, setShowModal] = React.useState(false);

  const closeModal = () => {
    setShowModal(false);
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      setImage(`${result.assets[0].base64}`);
      console.log(`${result.assets[0].base64}`);
      const payload = {
        image: `${result.assets[0].base64}`,
      };
      console.log("making an api call");
      //   axios
      //     .post(`${url}/image`, payload)
      //     .then((res) => {
      //       console.log(res.data);
      //     })
      //     .catch((err) => {
      //       console.log(err);
      //     });
    }
  };
  LogBox.ignoreAllLogs();

  const requestCameraPermission = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
    }

    ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      base64: true,
      allowsEditing: true,
      quality: 1,
    }).then((result) => {
      console.log(result);
      if (!result.canceled) {
        setImage(`${result.assets[0].base64}`);
        // const payload = {
        //   image: `${result.assets[0].base64}`,
        // };
        // axios
        //   .post(`${url}/image`, payload)
        //   .then((res) => {
        //     console.log(res.data);
        //   })
        //   .catch((err) => {
        //     console.log(err);
        //   });
      }
    });
  };

  const ModalComponent = ({ showModal, closeModal }) => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={() => closeModal()}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#e6f7f1",
                borderRadius: 20,

                gap: 20,
              }}
              onPress={() => {
                closeModal();
                pickImage();
              }}
            >
              <Icon name="image" size={30} color="#94b6b8" />
              <Text>Pick image from Gallery </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#e6f7f1",
                borderRadius: 20,

                gap: 20,
              }}
              onPress={() => {
                closeModal();
                requestCameraPermission();
              }}
            >
              <Icon name="camera" size={30} color="#94b6b8" />
              <Text>Take image from Camera </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <ImageBackground
      source={require("../../assets/nativebackground.jpg")}
      style={styles.container}
    >
      <View style={styles.innerdiv}>
        <Text
          style={{
            fontSize: 30,
            color: "#94b6b8",
            fontWeight: "800",
            marginTop: 20,
          }}
        >
          Report an Issue
        </Text>
        {image && (
          <View style={styles.camerabg}>
            <Image
              source={{ uri: `data:image/png;base64,${image}` }}
              style={styles.image}
            />
            <View
              style={{
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  color: "#94b6b8",
                  fontWeight: "800",
                  marginTop: 20,
                }}
              >
                Edit image
              </Text>

              <TouchableOpacity>
                <Icon
                  name="camera"
                  size={30}
                  color="#94b6b8"
                  onPress={() => {
                    setShowModal(true);
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
        {!image && (
          <View style={styles.camerabg}>
            <Image
              source={require("../../assets/noimage.jpg")}
              style={styles.image}
            />
            <View
              style={{
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  color: "#94b6b8",
                  fontWeight: "800",
                  marginTop: 20,
                }}
              >
                Add image
              </Text>

              <TouchableOpacity
                onPress={() => {
                  setShowModal(true);
                }}
              >
                <Icon name="camera" size={30} color="#94b6b8" />
              </TouchableOpacity>
            </View>
          </View>
        )}
        <Text
          style={{
            fontSize: 20,
            color: "#94b6b8",
            fontWeight: "800",
            marginTop: 20,
          }}
        >
          {geoLocation
            ? `Latitude: ${geoLocation.latitude}, Longitude: ${geoLocation.longitude}`
            : "Please select an image , Geolocation will be added automatically"}
        </Text>
        <ModalComponent showModal={showModal} closeModal={closeModal} />
      </View>
    </ImageBackground>
  );
};

export default Addissues;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },

  innerdiv: {
    width: "90%",
    height: "90%",
    backgroundColor: "rgba(255,255,255,0.5)",
    borderRadius: 20,
    flexDirection: "column",
    alignItems: "center",
    gap: 20,
  },
  image: {
    width: 150,
    height: 150,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 20,
  },
  camerabg: {
    flexDirection: "row",
    backgroundColor: "#e6f7f1",
    borderRadius: 20,
    width: 300,
    gap: 20,
    marginTop: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    gap: 20,
  },
});
