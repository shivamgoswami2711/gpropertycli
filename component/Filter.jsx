import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Picker} from '@react-native-picker/picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Inputrange from './Inputerange';

const PropertySelector = ({
  options,
  propValue,
  propName,
  onValueChange,
  disable = true,
}) => {
  return (
    <View style={styles.propertySelector}>
      <Text style={styles.pickerTitle}>{propName}</Text>
      <View style={styles.propertySelectorContainer}>
        <Picker
          selectedValue={propValue}
          style={{
            width: 150,
            marginTop: -10,
            color: !disable ? '#ccc' : '#000',
          }}
          onValueChange={onValueChange}
          enabled={disable}>
          {options.map((option, Filter) => (
            <Picker.Item
              key={Filter}
              label={option.label}
              value={option.value}
            />
          ))}
        </Picker>
      </View>
    </View>
  );
};

const Filter = ({
  max_price,
  min_price,
  property_type,
  title,
  location,
  ptype,
  setPtype,
  pFor,
  setPfor,
  callback,
}) => {
  const [filterContainerOn, setFilterContainerOn] = useState(false);
  const [minMaxValue, setMinMaxValue] = useState({
    min: min_price,
    max: max_price,
  });
  useEffect(() => {
    setTimeout(() => {
      callback({
        property_type: ptype,
        propertyFor: pFor == 'buy'?"sell":"rent",
        location,
        min: minMaxValue.min,
        max: minMaxValue.max,
      });
    }, 500);
  }, [ptype, minMaxValue, pFor, location, ptype, pFor]);

  const property2Options = [
    {label: 'All', value: ''},
    ...property_type.map(item => {
      return {label: item, value: item};
    }),
  ];

  useEffect(() => {
    setMinMaxValue({min: min_price, max: max_price});
  }, [max_price, min_price]);

  function formatNumber(number = 0) {
    if (number) {
      const abbreviations = {
        K: 1000,
        M: 1000000,
        B: 1000000000,
        T: 1000000000000,
      };

      for (const key in abbreviations) {
        if (number >= abbreviations[key]) {
          const formattedNumber = number / abbreviations[key];
          return formattedNumber.toFixed(0) + key;
        }
      }

      return number.toString();
    }
    return ' ';
  }

  const property_forOption = [
    {label: 'All', value: ''},
    {label: 'Sell', value: 'sell'},
    {label: 'Rent', value: 'rent'},
  ];

  return (
    <View style={styles.filtermainCaonteiner}>
      <View style={styles.filterTextCaonteiner}>
        {!filterContainerOn ? (
          <TouchableOpacity
            onPress={() => setFilterContainerOn(!filterContainerOn)}>
            <Text style={styles.filterText}>
              <AntDesign name="filter" size={20} color="black" />
              {/* filter */}
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => setFilterContainerOn(!filterContainerOn)}>
            <Text style={styles.filterText}>
              <Entypo
                name="cross"
                style={{padding: 10}}
                size={25}
                color="black"
              />
            </Text>
          </TouchableOpacity>
        )}
      </View>
      {filterContainerOn && (
        <View style={styles.filterMainContainer}>
          <View style={styles.filterMaxMinContainer}>
            <PropertySelector
              propName="Property for"
              options={property_forOption}
              propValue={pFor}
              disable={title == 'properties'}
              onValueChange={value => setPfor(value)}
            />
            <PropertySelector
              propName="Property type"
              title=""
              options={property2Options}
              propValue={ptype}
              onValueChange={value => setPtype(value)}
            />
          </View>
          <View style={styles.MaxMinMainContainer}>
            <View style={styles.minMaxValueContainer}>
              <Text style={styles.minmaxTitle}>
                Min {formatNumber(minMaxValue.min)}
              </Text>
              <Text style={styles.minmaxTitle}>
                Max {formatNumber(minMaxValue.max)}
              </Text>
            </View>
            <Inputrange
              min={Number(min_price)}
              max={Number(max_price)}
              onValueChange={value => setMinMaxValue(value)}
            />
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  filtermainCaonteiner: {
    position: 'absolute',
    zIndex: 1,
    backgroundColor: '#fff',
    right: 0,
    marginLeft: 10,
  },
  filterMainContainer: {
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    // backgroundColor: "#fff",
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 3},
    borderWidth: 0.5,
    borderColor: '#ccc',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 2,
  },
  filterTextCaonteiner: {
    paddingVertical: 8,
    borderBottomWidth: 0.5,
    borderColor: '#ccc',
    marginTop: 5,
  },
  filterText: {
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    textAlign: 'right',
    marginRight: 16,
    paddingLeft: 10,
    color: '#000',
  },
  propertySelector: {
    flex: 2,
  },
  textInput: {
    height: 40,
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  filterMaxMinContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    gap: 20,
    padding: 15,
  },
  propertySelectorContainer: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  pickerTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#000',
  },
  minMaxValueContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginVertical: 8,
  },
  minmaxTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
});
export default Filter;
