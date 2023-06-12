import React, {useState, useEffect} from 'react';
import {
  View,
  Dimensions,
  StyleSheet,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';

const WIDTH = Dimensions.get('window').width;

const MapScreen = ({
  setLat,
  setLong,
  location,
  setLocation,
  region,
  setRegion,
}) => {
  useEffect(() => {
    getLocationAsync();
  }, []);

  const getLocationAsync = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'Location ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(
          coords => {
            setLocation(coords && coords.coords);
            setRegion({
              latitude: coords && coords.coords.latitude,
              longitude: coords && coords.coords.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            });
          },
          error => {
            // See error code charts below.
            Alert.alert(error.message);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const handleMapPress = event => {
    const {coordinate} = event.nativeEvent;
    setLocation(coordinate);
    setLat(coordinate.latitude);
    setLong(coordinate.longitude);
  };

  return (
    <View style={styles.container}>
      {location && region && (
        <MapView
          style={styles.map}
          region={region}
          onPress={handleMapPress}>
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title="Current Location"
          />
        </MapView>
      )}
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  map: {
    height: 250,
    width: WIDTH,
    marginHorizontal: 10,
  },
});
