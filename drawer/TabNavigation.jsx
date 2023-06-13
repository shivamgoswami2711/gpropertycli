import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import {StackActions} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../src/screens/Home';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {localLoginAction} from '../redux/actions/user';
import {useDispatch} from 'react-redux';
import home from '../assets/home.png';
import logo from '../assets/logo.png';
import user from '../assets/user.png';
import Profile from '../src/screens/Profile';
import {getHeaderTitle} from '@react-navigation/elements';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import Sell from '../src/screens/Sell';
import PepperMenu from '../src/component/PepperMenu';

const DrawerNavigation = ({navigation}) => {
  const dispatch = useDispatch();
  const Tab = createBottomTabNavigator();
  const [onSerachClick, setOnSerachClick] = useState(false);
  const [searchAddressText, setSearchAddressText] = useState('');
  const [logoutModal, setLogoutModal] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const checkLoginStatus = async () => {
      const uid = await AsyncStorage.getItem('uid');
      if (!uid) {
        navigation.dispatch(StackActions.replace('Login'));
      } else {
        dispatch(localLoginAction(uid));
      }
    };

    checkLoginStatus();
  }, [navigation]);

  useEffect(() => {
    ref.current?.setAddressText(searchAddressText);
  }, []);

  return (
    <Tab.Navigator
      screenOptions={{
        showLabel: false,
        tabBarShowLabel: false,

        tabBarStyle: {
          backgroundColor: '#fff',
          height: 70,
          position: 'absolute',
          bottom: 0,
          right: 0,
          left: 0,
          elevation: 0,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          ...styles.TabShadow,
        },
        labelStyle: {
          fontSize: 12,
        },
      }}>
      <Tab.Screen
        name="Home"
        options={{
          tabBarIcon: ({focused}) => (
            <View>
              <Image
                source={home}
                style={{
                  width: 30,
                  height: 30,
                  tintColor: focused ? '#0426ff' : '#000',
                }}
                resizeMode="contain"
              />
            </View>
          ),
          header: ({navigation, route, options}) => {
            const title = getHeaderTitle(options, route.name);
            return (
              <View
                style={[
                  styles.header,
                  {
                    height: onSerachClick ? '100%' : 60,
                    alignItems: onSerachClick ? 'stretch' : 'center',
                    marginHorizontal: onSerachClick ? 10 : 0,
                  },
                ]}>
                {title !== 'Home' ? (
                  <AntDesign
                    name="arrowleft"
                    style={{padding: 10}}
                    size={25}
                    color="black"
                  />
                ) : (
                  <View></View>
                )}
                <View
                  style={{
                    position: 'absolute',
                    backgroundColor: '#fff',
                    top: onSerachClick ? 10 : 0,
                    borderRadius: 8,
                    left: 0,
                    right: 0,
                    flex: 1,
                    width: '100%',
                    height: '100%',
                  }}>
                  {onSerachClick ? (
                    <GooglePlacesAutocomplete
                      placeholder="Search"
                      autocompletionRequest={{
                        componentRestrictions: {
                          country: ['in'],
                        },
                      }}
                      listViewDisplayed={false}
                      keepResultsAfterBlur={true}
                      fetchDetails={true}
                      textInputProps={{
                        placeholderTextColor: '#000',
                        color: '#000',
                        borderWidth: 1,
                        borderColor: '#ccc',
                      }}
                      onPress={(data, details = null) => {
                        setSearchAddressText(details.name);
                        setOnSerachClick(false);
                        setTimeout(() => {
                          navigation.navigate('Property', {
                            property_for: 'properties',
                            address: details.name,
                          });
                        }, 70);
                      }}
                      renderRow={rowData => {
                        const title = rowData.structured_formatting.main_text;
                        const address =
                          rowData.structured_formatting.secondary_text;
                        return (
                          <View>
                            <Text style={{fontSize: 14, color: '#000'}}>
                              {title}
                            </Text>
                            <Text style={{fontSize: 14, color: '#000'}}>
                              {address}
                            </Text>
                          </View>
                        );
                      }}
                      listEmptyComponent={() => (
                        <View style={{flex: 1}}>
                          <Text style={{color: '#000'}}>
                            No results were found
                          </Text>
                        </View>
                      )}
                      query={{
                        key: 'AIzaSyDxEmw9qvtFiT7LK8GbfLqyPgv3xN7YFZs',
                        language: 'en', // Change language if desired
                      }}
                    />
                  ) : (
                    <Image
                      source={logo}
                      style={{height: 60, width: 120, marginLeft: 30}}
                    />
                  )}
                </View>
                <View>
                  {!onSerachClick ? (
                    <TouchableOpacity
                      style={{marginRight: 20}}
                      onPress={() => setOnSerachClick(!onSerachClick)}>
                      <AntDesign
                        name="search1"
                        style={{padding: 10}}
                        size={25}
                        color="black"
                      />
                    </TouchableOpacity>
                  ) : (
                    <View style={styles.cross}>
                      <TouchableOpacity
                        // style={styles.cross}
                        onPress={() => setOnSerachClick(!onSerachClick)}>
                        <Text style={{color: '#000'}}>cancel</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              </View>
            );
          },
        }}
        component={Home}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({focused}) => (
            <View>
              <AntDesign
                name="plus"
                style={{padding: 10}}
                size={30}
                color={focused ? '#3959f7' : '#000'}
              />
            </View>
          ),
          header: ({navigation, route, options}) => {
            const title = getHeaderTitle(options, route.name);
            return (
              <View
                style={[
                  styles.header,
                  {
                    alignItems: 'center',
                    height: 60,
                    backgroundColor: '#3959f7',
                  },
                ]}>
                {title !== 'Home' ? (
                  <TouchableOpacity onPress={() => navigation.goBack()}>
                    <AntDesign
                      name="arrowleft"
                      style={{padding: 10}}
                      size={30}
                      color="#fff"
                    />
                  </TouchableOpacity>
                ) : (
                  <View></View>
                )}

                <Text
                  style={[styles.headerName, {marginRight: 40, color: '#fff'}]}>
                  Sell
                </Text>
                <View></View>
              </View>
            );
          },
        }}
        name="Sell"
        component={Sell}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({focused}) => (
            <View>
              <Image
                source={user}
                style={{
                  width: 30,
                  height: 30,
                  tintColor: focused ? '#0426ff' : '#000',
                }}
                resizeMode="contain"
              />
            </View>
          ),
          header: ({navigation, route, options}) => {
            const title = getHeaderTitle(options, route.name);
            return (
              <View
                style={[
                  styles.header,
                  {
                    alignItems: 'center',
                    height: 60,
                    backgroundColor: '#3959f7',
                  },
                ]}>
                {title !== 'Home' ? (
                  <TouchableOpacity onPress={() => navigation.goBack()}>
                    <AntDesign
                      name="arrowleft"
                      style={{padding: 10}}
                      size={30}
                      color="#fff"
                    />
                  </TouchableOpacity>
                ) : (
                  <View></View>
                )}

                <Text
                  style={[styles.headerName, {marginRight: 0, color: '#fff'}]}>
                  Profile
                </Text>
                <View>
                  <TouchableOpacity onPress={() => setLogoutModal(true)}>
                    <Entypo
                      name="dots-three-vertical"
                      style={{padding: 10}}
                      size={25}
                      color="#fff"
                    />
                  </TouchableOpacity>
                  <PepperMenu
                    logoutModal={logoutModal}
                    setLogoutModal={setLogoutModal}
                    navigation={navigation}
                  />
                </View>
              </View>
            );
          },
        }}
        name="Profile"
        component={Profile}
      />
    </Tab.Navigator>
  );
};

export default DrawerNavigation;

const styles = StyleSheet.create({
  cross: {
    position: 'absolute',
    top: 10,
    padding: 10,
    right: 10,
    zIndex: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
  },
  headerName: {
    fontSize: 20,
    fontWeight: 800,
  },
  TabShadow: {
    shadowColor: '#ccc',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
  },
  logo: {
    width: 100,
    height: 50,
    marginRight: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  addNewButtonContainer: {
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
  },

  addNewButton: {
    width: 65,
    height: 65,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 3},
    borderWidth: 0.5,
    borderColor: '#ccc',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
