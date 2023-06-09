import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import CustomRadioButton from './CustomRadioButton';
import MapScreen from './Mapscreen';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

const TypeOfProperty = ({
  propertyFor,
  propertyType,
  added_by_type,
  setPropertyFor,
  setPropertyType,
  setAdded_by_type,
  setLat,
  setLong,
  setPageNumber,
  scrollRef,
}) => {
  return (
    <View>
      <Text style={styles.heading}>I want to</Text>
      <View style={styles.radioCaontainer}>
        <CustomRadioButton
          label={'sell'}
          selected={propertyFor == 'sell'}
          onSelect={() => setPropertyFor('sell')}
        />
        <CustomRadioButton
          label={'rent'}
          selected={propertyFor == 'rent'}
          onSelect={() => setPropertyFor('rent')}
        />
        <View style={{marginRight: 10, padding: 20}}>
          <Text style={{width: 70}}></Text>
        </View>
      </View>
      <Text style={styles.heading}>Your property type</Text>
      <View style={styles.radioCaontainer}>
        <CustomRadioButton
          label={'Apartment'}
          img={'https://gpropertypay.com/public/assets/apartments.png'}
          selected={propertyType == 'Apartments'}
          onSelect={() => setPropertyType('Apartments')}
        />
        <CustomRadioButton
          label={'House'}
          img={'https://gpropertypay.com/public/assets/house.png'}
          selected={propertyType == 'House'}
          onSelect={() => setPropertyType('House')}
        />
        <CustomRadioButton
          label={'Shop'}
          img={'https://gpropertypay.com/public/assets/shop.png'}
          selected={propertyType == 'Shop'}
          onSelect={() => setPropertyType('Shop')}
        />
      </View>
      <View style={styles.radioCaontainer}>
        <CustomRadioButton
          label={'Villa'}
          img={'https://gpropertypay.com/public/assets/villa.png'}
          selected={propertyType == 'Villa'}
          onSelect={() => setPropertyType('Villa')}
        />
        <CustomRadioButton
          label={'Plot'}
          img={'https://gpropertypay.com/public/assets/plot.png'}
          selected={propertyType == 'Plot'}
          onSelect={() => setPropertyType('Plot')}
        />
        <CustomRadioButton
          label={'Office'}
          img={'https://gpropertypay.com/public/assets/office.png'}
          selected={propertyType == 'Office'}
          onSelect={() => setPropertyType('Office')}
        />
      </View>
      {propertyFor == 'rent' && (
        <View style={styles.radioCaontainer}>
          <CustomRadioButton
            label={'Hostel'}
            img={'https://gpropertypay.com/public/assets/hostel.png'}
            selected={propertyType == 'Hostel'}
            onSelect={() => setPropertyType('Hostel')}
          />
          <CustomRadioButton
            label={'Pg'}
            img={'https://gpropertypay.com/public/assets/pg.png'}
            selected={propertyType == 'Pg'}
            onSelect={() => setPropertyType('Pg')}
          />
          <View style={{marginRight: 10, padding: 20}}>
            <Text style={{width: 70}}></Text>
          </View>
        </View>
      )}
      {propertyFor == 'sell' && (
        <View style={styles.radioCaontainer}>
          <CustomRadioButton
            label={'Farm'}
            img={'https://gpropertypay.com/public/assets/farm.png'}
            selected={propertyType == 'Farm'}
            onSelect={() => setPropertyType('Farm')}
          />
          <View style={{marginRight: 10, padding: 20}}>
            <Text style={{width: 70}}></Text>
          </View>
          <View style={{marginRight: 10, padding: 20}}>
            <Text style={{width: 70}}></Text>
          </View>
        </View>
      )}
      <Text style={styles.heading}>Are You?</Text>
      <View style={styles.radioCaontainer}>
        <CustomRadioButton
          label={'Owner'}
          selected={added_by_type == 'Owner'}
          onSelect={() => setAdded_by_type('Owner')}
        />
        <CustomRadioButton
          label={'Broker'}
          selected={added_by_type == 'Broker'}
          onSelect={() => setAdded_by_type('Broker')}
        />
        <View style={{marginRight: 10, padding: 20}}>
          <Text style={{width: 70}}></Text>
        </View>
      </View>
      <Text style={styles.heading}>Location?</Text>
      <View style={{height: 500, marginHorizontal: 20}}>
        <GooglePlacesAutocomplete
          placeholder="Search"
          textInputProps={{
            placeholderTextColor: '#000',
            returnKeyType: 'search user location',
            color: '#000',
          }}
          styles={{
            container: {
              flex: 0,
              position: 'absolute',
              width: '100%',
              zIndex: 1,
            },
            listView: {backgroundColor: 'white', color: '#000'},
          }}
          onPress={(data, details = null) => {
            // Handle the selected place
            // navigation.navigate('properties')
            console.log(data);
          }}
          listEmptyComponent={() => (
            <View style={{flex: 1}}>
              <Text>No results were found</Text>
            </View>
          )}
          textInputStyle={{
            color: 'black',
          }}
          query={{
            key: 'AIzaSyDxEmw9qvtFiT7LK8GbfLqyPgv3xN7YFZs',
            language: 'en', // Change language if desired
          }}
        />
      </View>
      <MapScreen setLat={setLat} setLong={setLong} />
      <View style={styles.buttonCantainer}>
        <TouchableOpacity
          style={styles.Button}
          onPress={() => {
            scrollRef.current?.scrollTo({
              y: 0,
              animated: true,
            });
            setPageNumber(2);
          }}>
          <Text
            style={{textTransform: 'capitalize', color: '#fff', fontSize: 18}}>
            next
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TypeOfProperty;

const styles = StyleSheet.create({
  radioCaontainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 18,
    padding: 10,
    textTransform: 'capitalize',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    color: '#000',
  },
  buttonCantainer: {
    // position: "relative",
    // bottom: 20,
    // alignItems: "flex-end",
    // marginRight: 30,
    marginHorizontal: 20,
    margin: 20,
  },
  Button: {
    // width: 80,
    padding: 12,
    borderRadius: 8,
    backgroundColor: 'blue',
  },
});
