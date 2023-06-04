import { Image, Text,StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";

const CustomRadioButton = ({ label, img, selected, onSelect, style }) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 5,
      }}
      onPress={onSelect}
    >
      <View
        style={{
          borderWidth: selected?2:1,
          borderRadius: 4,
          borderColor: selected ? "blue" : "#ccc",
          marginRight: 10,
          padding:20,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {img && (
          <Image
            style={{width:50,height:50,resizeMode:"contain"}}
            source={{
              uri: img,
            }}
          />
        )}
        {label && <Text style={styles.label}>{label}</Text>}
      </View>
    </TouchableOpacity>
  );
};

export default CustomRadioButton;

const styles = StyleSheet.create({
  label:{
    textTransform:"capitalize",
    fontWeight:"bold",
    width:90,
    textAlign:"center"
  }
})