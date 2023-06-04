import { View, Button } from "react-native";
import * as DocumentPicker from "expo-document-picker";

const CameraScreen = ({setVideo}) => {
  const handleUploadVideo = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({ type: "video/*" });
      if (result.type === "success") {
        const { uri, name, size } = result;
        // Process the selected video file
        setVideo(result)
      }
    } catch (error) {
      console.error("Failed to pick video file:", error);
    }
  };

  return (
    <View style={{ flex: 1, margin: 20 }}>
      <Button
        style={{ marginVertical: 20 }}
        title="Upload"
        onPress={handleUploadVideo}
      />
    </View>
  );
};

export default CameraScreen;
