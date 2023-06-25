/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import 'react-native-gesture-handler';
import axios from "axios";
axios.defaults.baseURL = "https://gpropertypay.com/api";


AppRegistry.registerComponent(appName, () => App);
    