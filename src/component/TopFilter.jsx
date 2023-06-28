import {StyleSheet, Text, ScrollView, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';

const TopFilter = ({property_type, setProperty_type, propertyFor, setProperty_for}) => {

  function setPforState(item) {
    setProperty_for(item);
  }
  function setPtypeState(item) {
    setProperty_type(item);
  }
  return (
    <ScrollView horizontal={true} style={{height: 48, marginTop: 5}}>
      <TouchableOpacity
        onPress={() => {
          setPforState('rent');
        }}
        TouchableOpacity={0.6}
        style={{
          //   width: 100,
          borderColor: propertyFor == 'rent' ? 'blue' : '#787777',
          height: 40,
          borderWidth: 1,
          justifyContent: 'center',
          borderRadius: 10,
          marginHorizontal: 8,
        }}>
        <Text
          style={{
            fontSize: 18,
            color: propertyFor == 'rent' ? 'blue' : '#787777',
            padding: 5,
            paddingHorizontal: 10,
          }}>
          Rent
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setPforState('buy');
        }}
        TouchableOpacity={0.6}
        style={{
          //   width: 100,
          borderColor: propertyFor == 'buy' ? 'blue' : '#787777',
          height: 40,
          borderWidth: 1,
          justifyContent: 'center',
          borderRadius: 10,
          marginHorizontal: 8,
        }}>
        <Text
          style={{
            fontSize: 18,
            color: propertyFor == 'buy' ? 'blue' : '#000',
            padding: 5,
            paddingHorizontal: 10,
          }}>
          Sell
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          setPtypeState('Apartments');
        }}
        TouchableOpacity={0.6}
        style={{
          //   width: 100,
          marginHorizontal: 8,
          borderColor: property_type == 'Apartments' ? 'blue' : '#787777',
          height: 40,
          borderWidth: 1,
          justifyContent: 'center',
          borderRadius: 10,
        }}>
        <Text
          style={{
            fontSize: 18,
            color: property_type == 'Apartments' ? 'blue' : '#787777',
            padding: 5,
            paddingHorizontal: 10,
          }}>
          Apartments
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setPtypeState('House');
        }}
        TouchableOpacity={0.6}
        style={{
          //   width: 100,
          marginHorizontal: 8,
          borderColor: property_type == 'House' ? 'blue' : '#787777',
          height: 40,
          borderWidth: 1,
          justifyContent: 'center',
          borderRadius: 10,
        }}>
        <Text
          style={{
            fontSize: 18,
            color: property_type == 'House' ? 'blue' : '#787777',
            padding: 5,
            paddingHorizontal: 10,
          }}>
          House
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setPtypeState('Villa');
        }}
        TouchableOpacity={0.6}
        style={{
          //   width: 100,
          marginHorizontal: 8,
          borderColor: property_type == 'Villa' ? 'blue' : '#787777',
          height: 40,
          borderWidth: 1,
          justifyContent: 'center',
          borderRadius: 10,
        }}>
        <Text
          style={{
            fontSize: 18,
            color: property_type == 'Villa' ? 'blue' : '#787777',
            padding: 5,
            paddingHorizontal: 10,
          }}>
          Villa
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setPtypeState('Shop');
        }}
        TouchableOpacity={0.6}
        style={{
          //   width: 100,
          marginHorizontal: 8,
          borderColor: property_type == 'Shop' ? 'blue' : '#787777',
          height: 40,
          borderWidth: 1,
          justifyContent: 'center',
          borderRadius: 10,
        }}>
        <Text
          style={{
            fontSize: 18,
            color: property_type == 'Shop' ? 'blue' : '#787777',
            padding: 5,
            paddingHorizontal: 10,
          }}>
          Shop
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setPtypeState('Office');
        }}
        TouchableOpacity={0.6}
        style={{
          //   width: 100,
          marginHorizontal: 8,
          borderColor: property_type == 'Office' ? 'blue' : '#787777',
          height: 40,
          borderWidth: 1,
          justifyContent: 'center',
          borderRadius: 10,
        }}>
        <Text
          style={{
            fontSize: 18,
            color: property_type == 'Office' ? 'blue' : '#787777',
            padding: 5,
            paddingHorizontal: 10,
          }}>
          Office
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setPtypeState('Hostel');
        }}
        TouchableOpacity={0.6}
        style={{
          //   width: 100,
          marginHorizontal: 8,
          borderColor: property_type == 'Hostel' ? 'blue' : '#787777',
          height: 40,
          borderWidth: 1,
          justifyContent: 'center',
          borderRadius: 10,
        }}>
        <Text
          style={{
            fontSize: 18,
            color: property_type == 'Hostel' ? 'blue' : '#787777',
            padding: 5,
            paddingHorizontal: 10,
          }}>
          Hostel
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setPtypeState('Pg');
        }}
        TouchableOpacity={0.6}
        style={{
          //   width: 100,
          marginHorizontal: 8,
          borderColor: property_type == 'Pg' ? 'blue' : '#787777',
          height: 40,
          borderWidth: 1,
          justifyContent: 'center',
          borderRadius: 10,
        }}>
        <Text
          style={{
            fontSize: 18,
            color: property_type == 'Pg' ? 'blue' : '#787777',
            padding: 5,
            paddingHorizontal: 10,
          }}>
          Pg
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setPtypeState('Plot');
        }}
        TouchableOpacity={0.6}
        style={{
          //   width: 100,
          marginHorizontal: 8,
          borderColor: property_type == 'Plot' ? 'blue' : '#787777',
          height: 40,
          borderWidth: 1,
          justifyContent: 'center',
          borderRadius: 10,
        }}>
        <Text
          style={{
            fontSize: 18,
            color: property_type == 'Plot' ? 'blue' : '#787777',
            padding: 5,
            paddingHorizontal: 10,
          }}>
          Plot
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setPtypeState('Farm');
        }}
        TouchableOpacity={0.6}
        style={{
          //   width: 100,
          marginHorizontal: 8,
          borderColor: property_type == 'Farm' ? 'blue' : '#787777',
          height: 40,
          borderWidth: 1,
          justifyContent: 'center',
          borderRadius: 10,
        }}>
        <Text
          style={{
            fontSize: 18,
            color: property_type == 'Farm' ? 'blue' : '#787777',
            padding: 5,
            paddingHorizontal: 10,
          }}>
          Farm
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default TopFilter;

const styles = StyleSheet.create({});
