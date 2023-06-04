import React, {useState, useEffect} from 'react';
import {
  View,
  Dimensions,
  StyleSheet,
  PermissionsAndroid,
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';

const WIDTH = Dimensions.get('window').width;

const MapScreen = ({setLat, setLong}) => {
  const [location, setLocation] = useState(null);
  const [region, setRegion] = useState(null);

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
            setLocation(coords);
            setRegion({
              latitude: coords.latitude,
              longitude: coords.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            });
          },
          error => {
            // See error code charts below.
            console.log(error.code, error.message);
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
          initialRegion={region}
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
