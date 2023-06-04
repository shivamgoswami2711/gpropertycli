/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {View} from 'react-native';
import store from './redux/store';
import { NavigationContainer } from '@react-navigation/native'
import DrawerNavigation from './drawer/DrawerNavigation';
import { Provider as ReduxProvider } from "react-redux";

function App() {
  return (
    <View style={{flex: 1,marginTop:2}}>
    <ReduxProvider store={store}>
      <NavigationContainer>
        <DrawerNavigation />
      </NavigationContainer>
      </ReduxProvider>
    </View>
  );
}

export default App;
