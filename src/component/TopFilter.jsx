import {StyleSheet, Text, ScrollView, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';

const TopFilter = ({setFilter, filter}) => {
  const [pfor, setPfor] = useState('');
  const [ptype, setPtype] = useState('');

  function setPforState(item) {
    const copy = {...filter};
    copy.propertyFor = item;
    setFilter(copy);
    setPfor(item);
  }
  function setPtypeState(item) {
    const copy = {...filter};
    copy.property_type = item;
    setFilter(copy);
    setPtype(item);
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
          borderColor: pfor == 'rent' ? 'blue' : '#787777',
          height: 40,
          borderWidth: 1,
          justifyContent: 'center',
          borderRadius: 10,
          marginHorizontal: 8,
        }}>
        <Text
          style={{
            fontSize: 18,
            color: pfor == 'rent' ? 'blue' : '#787777',
            padding: 5,
            paddingHorizontal: 10,
          }}>
          Rent
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setPforState('sell');
        }}
        TouchableOpacity={0.6}
        style={{
          //   width: 100,
          borderColor: pfor == 'sell' ? 'blue' : '#787777',
          height: 40,
          borderWidth: 1,
          justifyContent: 'center',
          borderRadius: 10,
          marginHorizontal: 8,
        }}>
        <Text
          style={{
            fontSize: 18,
            color: pfor == 'sell' ? 'blue' : '#000',
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
          borderColor: ptype == 'Apartments' ? 'blue' : '#787777',
          height: 40,
          borderWidth: 1,
          justifyContent: 'center',
          borderRadius: 10,
        }}>
        <Text
          style={{
            fontSize: 18,
            color: ptype == 'Apartments' ? 'blue' : '#787777',
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
          borderColor: ptype == 'House' ? 'blue' : '#787777',
          height: 40,
          borderWidth: 1,
          justifyContent: 'center',
          borderRadius: 10,
        }}>
        <Text
          style={{
            fontSize: 18,
            color: ptype == 'House' ? 'blue' : '#787777',
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
          borderColor: ptype == 'Villa' ? 'blue' : '#787777',
          height: 40,
          borderWidth: 1,
          justifyContent: 'center',
          borderRadius: 10,
        }}>
        <Text
          style={{
            fontSize: 18,
            color: ptype == 'Villa' ? 'blue' : '#787777',
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
          borderColor: ptype == 'Shop' ? 'blue' : '#787777',
          height: 40,
          borderWidth: 1,
          justifyContent: 'center',
          borderRadius: 10,
        }}>
        <Text
          style={{
            fontSize: 18,
            color: ptype == 'Shop' ? 'blue' : '#787777',
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
          borderColor: ptype == 'Office' ? 'blue' : '#787777',
          height: 40,
          borderWidth: 1,
          justifyContent: 'center',
          borderRadius: 10,
        }}>
        <Text
          style={{
            fontSize: 18,
            color: ptype == 'Office' ? 'blue' : '#787777',
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
          borderColor: ptype == 'Hostel' ? 'blue' : '#787777',
          height: 40,
          borderWidth: 1,
          justifyContent: 'center',
          borderRadius: 10,
        }}>
        <Text
          style={{
            fontSize: 18,
            color: ptype == 'Hostel' ? 'blue' : '#787777',
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
          borderColor: ptype == 'Pg' ? 'blue' : '#787777',
          height: 40,
          borderWidth: 1,
          justifyContent: 'center',
          borderRadius: 10,
        }}>
        <Text
          style={{
            fontSize: 18,
            color: ptype == 'Pg' ? 'blue' : '#787777',
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
          borderColor: ptype == 'Plot' ? 'blue' : '#787777',
          height: 40,
          borderWidth: 1,
          justifyContent: 'center',
          borderRadius: 10,
        }}>
        <Text
          style={{
            fontSize: 18,
            color: ptype == 'Plot' ? 'blue' : '#787777',
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
          borderColor: ptype == 'Farm' ? 'blue' : '#787777',
          height: 40,
          borderWidth: 1,
          justifyContent: 'center',
          borderRadius: 10,
        }}>
        <Text
          style={{
            fontSize: 18,
            color: ptype == 'Farm' ? 'blue' : '#787777',
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
