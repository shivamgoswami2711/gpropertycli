import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router"
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const DrawerHeader = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const router = useRouter();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleDrawerToggle = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <View
      style={[
        styles.header,
        { paddingTop: insets.top + 8, paddingBottom: insets.bottom + 8 },
      ]}
    >
      <TouchableOpacity onPress={handleDrawerToggle}>
        <Ionicons name="menu-outline" size={35} color="black" />
      </TouchableOpacity>
      {isSearchOpen ? (
        <GooglePlacesAutocomplete
          placeholder="Search"
          onPress={(data, details = null) => {
            // Handle the selected place
            router.push("/property/properties")
            console.log(data)
          }}
          query={{
            key: "AIzaSyDxEmw9qvtFiT7LK8GbfLqyPgv3xN7YFZs",
            language: "en", // Change language if desired
          }}
        />
      ) : (
        <Text style={styles.title}>Gproperty</Text>
      )}
      <View style={styles.right}>
        <TouchableOpacity onPress={handleSearchToggle}>
          <Ionicons name="search-outline" size={25} color="black" />
        </TouchableOpacity>
        <Image
          style={styles.profilePic}
          source={{
            uri: "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-default-avatar-profile-icon-vector-social-media-user-image-vector-illustration-227787227.jpg",
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    backgroundColor: "#FF",
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
  right: {
    flexDirection: "row",
    alignItems: "center",
  },
  profilePic: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginLeft: 16,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    marginLeft: 8,
    borderWidth: 1,
    paddingVertical: 0,
    marginVertical: 10,
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
});

export default DrawerHeader;
