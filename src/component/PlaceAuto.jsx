import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

const PlaceAuto = () => {
  return (
    <View style={{flex: 1}}>
        <GooglePlacesAutocomplete
          placeholder="Search"
          listViewDisplayed={false}
          keepResultsAfterBlur={true}
          textInputProps={{
            placeholderTextColor: '#000',
            color: '#000',
          }}
          onPress={(data, details = null) => {
            console.log(details.description);
            setLocation(details.description);
          }}
          listEmptyComponent={() => (
            <View style={{flex: 1}}>
              <Text>No results were found</Text>
            </View>
          )}
          query={{
            key: 'AIzaSyDxEmw9qvtFiT7LK8GbfLqyPgv3xN7YFZs',
            language: 'en', // Change language if desired
          }}
        />
    </View>
  );
};

export default PlaceAuto;

const styles = StyleSheet.create({});
