import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {StackActions} from '@react-navigation/native';
import logo from '../../assets/logo.png';

const Splash = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.dispatch(StackActions.replace('HomePage'));
    }, 500);
  }, []);

  return (
    <View style={styles.spalsh}>
      <Image style={styles.logo} source={logo} />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  spalsh: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: '70%',
    height: '50%',
    resizeMode: 'contain',
  },
});
