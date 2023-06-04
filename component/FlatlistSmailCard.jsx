import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React,{memo} from "react";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import profile from "../assets/profile.jpg";

const FlatlistComponent = ({ index, item, router }) => {
  console.log(`${index} home list`)

  function formatDate() {
    const date = new Date(item.created_at);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

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
    <TouchableOpacity
      style={{
        marginVertical: 8,
      }}
      onPress={() => router.push(`/post/${item.id}`)}
    >
      <View key={index} style={styles.FlatlistComponent}>
        <View style={styles.profileContainer}>
          <Text style={styles.propertyType}>
            {item.property_type} (
            {`₹${formatNumber(
              item.expected_price === null
                ? item?.monthly_rent
                : item?.expected_price
            )}`}
            )
          </Text>
          <Image style={styles.profilePic} source={profile} />
        </View>
        <View style={styles.detailContainer}>
          <Image
            style={styles.propertyPic}
            source={{
              uri: `https://gpropertypay.com/public/uploads/${item.image}`,
            }}
          />
          <View>
            <Text
              numberOfLines={5}
              ellipsizeMode="tail"
              style={styles.detailText}
            >
              <Entypo name="location-pin" size={18} color="black" />
              {item.location}
            </Text>
            <Text style={styles.dimenSionText}>
              {item.saleable_area}{" "}
              {item.saleable_area_size_in === "Feet"
                ? "sq/" + item.saleable_area_size_in
                : item.saleable_area_size_in}
            </Text>
          </View>
        </View>
        <View style={styles.dateContainer}>
          {item.bedrooms && (
            <Text style={styles.dateContainerText}>
              {item.bedrooms} Bedroom
            </Text>
          )}
          {item.bathrooms && (
            <Text style={styles.dateContainerText}>
              {item.bathrooms} Bathroom
            </Text>
          )}
          <Text style={styles.dateContainerText}>
            <MaterialIcons name="date-range" size={12} color="black" />
            {formatDate()}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  FlatlistComponent: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: 280,
  },
  profileContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 0.5,
    borderColor: "#ccc",
  },
  propertyType: {
    fontSize: 16,
    fontWeight: "bold",
  },
  profilePic: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginLeft: 16,
  },
  detailContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
    marginTop: 5,
  },
  propertyPic: {
    width: "55%",
    height: 100,
    borderRadius: 6,
  },
  detailText: {
    width: 100,
    height: 80,
    fontSize: 12,
  },
  dimenSionText: {
    fontSize: 12,
    fontWeight: "bold",
    textTransform: "capitalize",
    marginTop: 5,
  },
  dateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },
  dateContainerText: {
    fontSize: 10,
    marginTop: 5,
  },
});
export default memo(FlatlistComponent);
