import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MapView, {Marker} from 'react-native-maps';
const WIDTH = Dimensions.get('window').width;
import { StackActions } from '@react-navigation/native';


const MapHeader = ({title, coordinates = [], navigation}) => {
  return (
    <View>
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          region={{
            latitude: 22.809754, // Replace with the latitude of the point
            longitude: 78.321457, // Replace with the desired longitude
            latitudeDelta: 10.7922,
            longitudeDelta: 10.421,
          }}>
          {coordinates.map((item, index) => (
            <Marker
              key={index}
              onPress={() => {
                const pushAction = StackActions.replace(`Post`, {id: item.id});
                navigation.dispatch(pushAction);
              }}
              coordinate={{
                latitude: parseFloat(item.lat),
                longitude: parseFloat(item.long),
              }}
            />
          ))}
        </MapView>
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
    justifyContent: 'center',
    alignItems: 'center',
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
    borderColor: '#ccc',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    textTransform: 'uppercase',
  },
});
