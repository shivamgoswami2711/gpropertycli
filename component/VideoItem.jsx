import React, { useRef, useEffect } from "react";
import { Video } from "expo-av";
import { StyleSheet, Text } from "react-native";

const VideoItem = ({ item, index, onViewableItemsChanged }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const handleViewableItemsChanged = ({ viewableItems }) => {
      const isViewable = viewableItems.some(
        (item) => item.index === index && item.isViewable
      );
      if (isViewable) {
        // Video is viewable, start playing
        videoRef.current?.playAsync();
      } else {
        // Video is not viewable, pause or stop playing
        videoRef.current?.pauseAsync();
        // Or videoRef.current?.stopAsync();
      }
    };

    onViewableItemsChanged(handleViewableItemsChanged);

    return () => {
      onViewableItemsChanged(null); // Clean up the listener
    };
  }, [index, onViewableItemsChanged]);

  return (
    <Video
      useNativeControls
      style={styles.video}
      resizeMode="contain"
      shouldPlay={true}
      ref={videoRef}
      source={{
        uri: `https://gpropertypay.com/public/videos/${item?.video}`,
      }}
    />
  );
};

const styles = StyleSheet.create({
  video: {
    width: "100%",
    height: 220,
    marginHorizontal: 10,
  },
  footer: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
    marginBottom: 100,
  },
});

export default VideoItem;
