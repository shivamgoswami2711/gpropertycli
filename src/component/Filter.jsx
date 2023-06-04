import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { Picker } from "@react-native-picker/picker";
// import { AntDesign, Entypo } from "@expo/vector-icons";
import Inputrange from "./Inputerange";

const PropertySelector = ({ options, propValue, onValueChange, disable }) => {
  return (
    <View style={styles.propertySelector}>
      <Text style={styles.pickerTitle}>Property Type</Text>
      <View style={styles.propertySelectorContainer}>
        <Picker
          selectedValue={propValue}
          style={{ width: 150, marginTop: -10 }}
          onValueChange={onValueChange}
          enabled={disable}
        >
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

const Filter = ({ max_price, min_price, property_type, callback, title }) => {
  const [filterContainerOn, setFilterContainerOn] = useState(false);
  const [property1, setProperty1] = useState("");
  const [minMaxValue, setMinMaxValue] = useState({
    min: min_price,
    max: max_price,
  });

  useEffect(() => {
    setTimeout(() => {
      callback({
        property_type: property1,
        min: minMaxValue.min,
        max: minMaxValue.max,
      });
    }, 1000);
  }, [property1, minMaxValue]);

  const property2Options = [
    { label: "All", value: "" },
    ...property_type.map((item) => {
      return { label: item, value: item };
    }),
  ];

  useEffect(() => {
    setMinMaxValue({ min: min_price, max: max_price });
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
    return " ";
  }

  return (
    <View style={styles.filtermainCaonteiner}>
      <View style={styles.filterTextCaonteiner}>
        {!filterContainerOn ? (
          <TouchableOpacity
            onPress={() => setFilterContainerOn(!filterContainerOn)}
          >
            <Text style={styles.filterText}>
              filter
              {/* <AntDesign name="filter" size={20} color="black" /> */}
              filter
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => setFilterContainerOn(!filterContainerOn)}
          >
            <Text style={styles.filterText}>
              cencel
              {/* <Entypo name="cross" style={{padding:10}} size={25} color="black" /> */}
            </Text>
          </TouchableOpacity>
        )}
      </View>
      {filterContainerOn && (
        <View style={styles.filterMainContainer}>
          <View style={styles.filterMaxMinContainer}>
            <PropertySelector
              propName="Property 2"
              options={[{ label: title, value: title }]}
              propValue={property1}
              disable={false}
              onValueChange={(value) => setProperty1(value)}
            />
            <PropertySelector
              propName="Property 2"
              options={property2Options}
              propValue={property1}
              onValueChange={(value) => setProperty1(value)}
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
              onValueChange={(value) => setMinMaxValue(value)}
            />
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  filtermainCaonteiner: {
    position: "absolute",
    zIndex: 1,
    backgroundColor: "#fff",
    right: 0,
    marginLeft: 10,
  },
  filterMainContainer: {
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    // backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 3 },
    borderWidth: 0.5,
    borderColor: "#ccc",
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 2,
  },
  filterTextCaonteiner: {
    paddingVertical: 8,
    borderBottomWidth: 0.5,
    borderColor: "#ccc",
    marginTop: 5,
  },
  filterText: {
    fontSize: 18,
    fontWeight: "bold",
    textTransform: "capitalize",
    textAlign: "right",
    marginRight: 16,
  },
  propertySelector: {
    flex: 2,
  },
  textInput: {
    height: 40,
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  filterMaxMinContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    gap: 20,
    padding: 15,
  },
  propertySelectorContainer: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
  },
  pickerTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
  },
  minMaxValueContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginVertical: 8,
  },
  minmaxTitle: {
    fontSize: 14,
    fontWeight: "bold",
  },
});
export default Filter;
