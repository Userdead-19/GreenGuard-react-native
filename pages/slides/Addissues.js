import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  LogBox,
  TouchableOpacity,
  Modal,
  ScrollView,
  TextInput,
  PanResponder,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import Icon from "react-native-vector-icons/FontAwesome";
import * as Location from "expo-location";
import DropdownMenu from "../../Components/DropdownMenu";
import { KeyboardAvoidingView } from "react-native";

const Addissues = (props) => {
  console.log(props);

  const navigation = useNavigation();
  const [image, setImage] = React.useState(null);
  const [geoLocation, setGeoLocation] = React.useState(null);
  const [showModal, setShowModal] = React.useState(false);

  const closeModal = () => {
    setShowModal(false);
  };

  const panResponder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gestureState) => {
        // Handle the movement here
        console.log("dx:", gestureState.dx, "dy:", gestureState.dy);
      },
      onPanResponderRelease: () => {
        // Handle the release here
        console.log("PanResponder released");
      },
    })
  ).current;

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    let { status1 } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted" || status1 !== "granted") {
      alert(
        "Sorry, we need camera roll and location permissions to make this work!"
      );
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    let location = await Location.getCurrentPositionAsync({});
    setGeoLocation(location.coords);
    console.log(location);
    if (!result.canceled) {
      setImage(`${result.assets[0].base64}`);

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
    let { status1 } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted" || status1 !== "granted") {
      alert(
        "Sorry, we need camera roll and location permissions to make this work!"
      );
    }
    let location = await Location.getCurrentPositionAsync({});
    setGeoLocation(location.coords);
    console.log(location);
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
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <KeyboardAvoidingView style={styles.keyboardview}>
        <View style={styles.innerdiv} {...panResponder.panHandlers}>
          <Text
            style={{
              fontSize: 30,
              color: "#94b6b8",
              fontWeight: "600",
              marginTop: 20,
            }}
          >
            R E P O R T I S S U E S
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
              ? `Latitude: ${geoLocation.latitude},\n Longitude: ${geoLocation.longitude}`
              : "Please select an image , Geolocation will be added automatically"}
          </Text>
          <View style={{ flexDirection: "row", marginTop: 20 }}>
            <Text
              style={{
                fontSize: 20,
                color: "#94b6b8",
                fontWeight: "800",
              }}
            >
              Pincode:
            </Text>
            <TextInput
              style={{
                fontSize: 20,
                color: "#94b6b8",
                fontWeight: "800",
                borderBottomWidth: 1,
                width: 140,
              }}
              placeholder="Enter Pincode"
            />
          </View>
          <DropdownMenu />
          <TextInput
            placeholder="Enter Description"
            style={{
              fontSize: 20,
              color: "#94b6b8",
              fontWeight: "800",
              borderBottomWidth: 1,
              marginTop: 20,
            }}
          />
          <TouchableOpacity
            style={{
              backgroundColor: "#FCEDF9",
              borderRadius: 20,
              width: 300,
              height: 50,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: 20,
                color: "#94b6b8",
                fontWeight: "800",
              }}
            >
              S U B M I T
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default Addissues;

const styles = StyleSheet.create({
  keyboardview: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#a5c8ca",
  },
  innerdiv: {
    width: "90%",
    height: "95%",
    backgroundColor: "rgba(255,255,255,0.5)",
    borderRadius: 20,
    flexDirection: "column",
    alignItems: "center",
    gap: 15,
    marginTop: 20,
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
    width: 280,
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
  container1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
});
