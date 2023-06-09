import {Alert, Button, Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {NavigationContainer, StackActions} from '@react-navigation/native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import Home from '../src/screens/Home';
import logo from '../assets/logo.png';
import DrawerHeader from './DrawerHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {localLoginAction} from '../redux/actions/user';
import {useDispatch} from 'react-redux';

const CustomDrawer = props => {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.container}>
        <Image style={styles.logo} source={logo} />
        <Text style={styles.title}>Gproperty</Text>
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};

const DrawerNavigation = ({navigation}) => {
  const dispatch = useDispatch();
  const Drawer = createDrawerNavigator();

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

  return (
    <Drawer.Navigator drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{
          headerTitle: props => <DrawerHeader {...props} />,
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;

const styles = StyleSheet.create({
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
});
