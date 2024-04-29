import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  View,
  Image,
  FlatList,
  ListRenderItem,
} from "react-native";

const AD_IMAGES = [
  require("@/assets/images/adimage2.jpeg"),
  require("@/assets/images/icon-256x256.png"),
  require("@/assets/images/images.jpeg"),
];

interface HomeProps {
  item: any;
}

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const renderItem: ListRenderItem<any> = ({ item }) => (
    <View style={styles.item}>
      <Image source={item} style={styles.image} />
    </View>
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % AD_IMAGES.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  return (
    <ImageBackground
      source={require("@/assets/images/nativebackground.jpg")}
      style={{ width: "100%", height: "100%" }}
    >
      <View style={{ flex: 1, paddingTop: 40, alignItems: "center" }}>
        <FlatList
          data={[AD_IMAGES[currentIndex]]} // Render only the current image
          renderItem={renderItem}
          keyExtractor={(item) => item.toString()} // Unique key for each image
          horizontal={true} // Make the FlatList scroll horizontally
        />
      </View>
    </ImageBackground>
  );
};

export default Home;

const styles = StyleSheet.create({
  item: {
    paddingHorizontal: 10,
  },
  image: {
    width: 300,
    height: 200,
    resizeMode: "cover",
    borderRadius: 10,
  },
});
