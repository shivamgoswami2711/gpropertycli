import {Button, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Home from '../src/screens/Home';
import Sell from '../src/screens/Sell';
import Login from '../src/screens/Login';

const DrawerNavigation = () => {
  const Drawer = createDrawerNavigator();
  
  function Screen1({navigation}) {
    return (
      <>
        <Text>
          Screen 1 Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          Iure eius, quos nihil molestias culpa dolorum quis qui corrupti illum,
          harum praesentium expedita, tempora recusandae veniam sequi esse quia
          ad quod!
        </Text>
        <Button
          title="Go to Screen 2"
          onPress={() => navigation.navigate('Screen2')}
          />
      </>
    );
  }
  
  function Screen2({navigation}) {
    return (
      <>
        <Text>Screen 2 lo</Text>
        <Button
          title="Go to Screen 1"
          onPress={() => navigation.navigate('home')}
          />
      </>
    );
  }
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Sell" component={Sell} />
      <Drawer.Screen name="Login" component={Login} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;

const styles = StyleSheet.create({});
