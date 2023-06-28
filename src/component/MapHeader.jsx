import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React, {memo, useEffect, useState} from 'react';
import MapView, {Marker} from 'react-native-maps';
const WIDTH = Dimensions.get('window').width;
import {StackActions} from '@react-navigation/native';
import { findInitialRegion } from '../Include/SellData';

const MapHeader = ({title, coordinates = [], navigation}) => {
  
  const [initialRegion, setInitialRegion] = useState(null);


  useEffect(() => {
    setInitialRegion(findInitialRegion(coordinates))
  }, [coordinates])
  
  return (
    <View>
      <View style={styles.mapContainer}>
        {coordinates.length !== 0 && (
          <MapView
            style={styles.map}
            zoomControlEnabled={true}
            loadingEnabled={true}
            region={initialRegion}>
            {coordinates.map((item, index) => (
              <Marker
                key={index}
                onPress={() => {
                  const pushAction = StackActions.replace(`Post`, {
                    id: item.id,
                  });
                  navigation.dispatch(pushAction);
                }}
                coordinate={{
                  latitude: parseFloat(item.lat),
                  longitude: parseFloat(item.long),
                }}
              />
            ))}
          </MapView>
        )}
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </View>
  );
};

export default memo(MapHeader);

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
