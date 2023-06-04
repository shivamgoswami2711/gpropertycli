import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
import MapView, { Marker } from "react-native-maps";
const WIDTH = Dimensions.get("window").width;

const MapHeader = ({title}) => {
  return (
    <View>
      <View style={styles.mapContainer}>
        <MapView style={styles.map} />
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </View>
  );
};

export default MapHeader;

const styles = StyleSheet.create({
  mapContainer: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },
  map: {
    height: 300,
    width: WIDTH - 30,
    marginHorizontal: 10,
  },
  titleContainer: {
    paddingVertical: 20,
    marginHorizontal: 20,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
  },
});
