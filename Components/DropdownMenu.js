import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

const DropdownMenu = () => {
  const [selectedValue, setSelectedValue] = useState("option1");

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select an option:</Text>
      <Picker
        selectedValue={selectedValue}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
        style={styles.picker}
        itemStyle={{
          backgroundColor: "grey",
          color: "blue",
          fontFamily: "Ebrima",
          fontSize: 17,
        }}
      >
        <Picker.Item label="Option 1" value="Waste Stagmentation" />
        <Picker.Item label="Option 2" value="Water Stagmentation" />
      </Picker>
      <Text style={styles.selectedValue}>Selected Value: {selectedValue}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  picker: {
    width: 200,
    height: 50,
  },
  selectedValue: {
    marginTop: 10,
    fontSize: 16,
  },
});

export default DropdownMenu;
