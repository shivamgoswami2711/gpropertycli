import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

const DrawerHeader = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
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
        {paddingTop: insets.top + 8, paddingBottom: insets.bottom + 8},
      ]}>
      <TouchableOpacity onPress={() => handleDrawerToggle()}>
        <Entypo name="menu" size={35} color="black" />
      </TouchableOpacity>
      {isSearchOpen ? (
        <View>
          <ScrollView
            style={{flex: 1}}
            horizontal={true}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{
              flexDirection: 'column',
              justifyContent: 'space-around',
              width: '100%',
            }}
            nestedScrollEnabled={true}>
            <GooglePlacesAutocomplete
              placeholder="Search......"
              listViewDisplayed={false}
              keepResultsAfterBlur={true}
              textInputProps={{
                placeholderTextColor: '#000',
                color: '#000',
              }}
              onPress={(data, details = null) => {
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
          </ScrollView>
        </View>
      ) : (
        <Text style={styles.title}>Gproperty</Text>
      )}
      <View style={styles.right}>
        <TouchableOpacity onPress={handleSearchToggle}>
          <EvilIcons name="search" size={25} color="black" />
        </TouchableOpacity>
        <Image
          style={styles.profilePic}
          source={{
            uri: 'https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-default-avatar-profile-icon-vector-social-media-user-image-vector-illustration-227787227.jpg',
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    backgroundColor: '#FF',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
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
