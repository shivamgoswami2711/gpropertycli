/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import {View} from 'react-native';
import store from './redux/store';
import {NavigationContainer} from '@react-navigation/native';
import TabNavigation from './drawer/TabNavigation';
import {Provider as ReduxProvider} from 'react-redux';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Sell from './src/screens/Sell';
import Login from './src/screens/Login';
import Post from './src/screens/Post';
import Property from './src/screens/Property';
import Splash from './src/screens/Splash';
import EdtProperty from './src/screens/EdtProperty';
import PropertyView from './src/screens/PropertyView';
import Propertysave from './src/screens/Propertysave';
import { notificationListener, requestUserPermission } from './src/Include/notification';


function App() {
  const Stack = createNativeStackNavigator();
  useEffect(() => {
    requestUserPermission()
    notificationListener()
  }, [])
  

  return (
    <View style={{flex: 1, marginTop: 2}}>
      <ReduxProvider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Splash">
            <Stack.Screen
              name="Splash"
              options={{headerShown: false}}
              component={Splash}
            />
            <Stack.Screen
              name="HomePage"
              options={{headerShown: false}}
              component={TabNavigation}
            />
            <Stack.Screen
              name="Login"
              options={{headerShown: false}}
              component={Login}
            />
            <Stack.Screen
              name="Post"
              options={{headerShown: false}}
              component={Post}
            />
            <Stack.Screen
              name="Property"
              options={{headerShown: false}}
              component={Property}
            />
            <Stack.Screen
              name="propertysave"
              options={{headerShown: false}}
              component={Propertysave}
            />
            <Stack.Screen
              name="EdtProperty"
              options={{headerShown: false}}
              component={EdtProperty}
            />
            <Stack.Screen
              name="PropertyView"
              options={{headerShown: false}}
              component={PropertyView}
            />
            <Stack.Screen
              name="Sell"
              options={{headerShown: false}}
              component={Sell}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ReduxProvider>
    </View>
  );
}

export default App;
