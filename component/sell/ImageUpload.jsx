import { StyleSheet, Text, View, Button } from "react-native";
import React from "react";
import * as ImagePicker from "expo-image-picker";

const ImageUpload = ({setImages}) => {
  const handleSelectImages = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      console.error("Permission to access media library denied");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      selectionLimit: 15,
      quality: 1,
    });

   if (result) {
        const selectedImages = result.assets.slice(0, 15).map((image) => image);
        // Process the selected images as needed
        setImages(selectedImages)
      // Process the selected images as needed
    }
  };

  return (
    <View style={{margin:20}}>
      <Button title="Select Images" onPress={handleSelectImages} />
    </View>
  );
};

export default ImageUpload;

const styles = StyleSheet.create({});
