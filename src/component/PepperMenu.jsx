import {StyleSheet, Text, View, Modal, TouchableOpacity} from 'react-native';
import React from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';


const PepperMenu = ({logoutModal, setLogoutModal, navigation}) => {
  async function onLogoutPress() {
    auth()
      .signOut()
      .then(async () => {
        GoogleSignin.signOut();
        await AsyncStorage.removeItem('uid');
        await AsyncStorage.removeItem('profile');
        navigation.dispatch(navigation.replace('Login'));
        setLogoutModal(false);
      });
  }

  return (
    <Modal transparent={true} onRequestClose={() => setLogoutModal(false)} visible={logoutModal}>
      <TouchableOpacity TouchableOpacity={0} onPress={() => setLogoutModal(false)} style={{flex: 1}}>
        <View style={[styles.LogoutCantainer, {backgroundColor: '#fff'}]}>
          <TouchableOpacity
            onPress={() => onLogoutPress()}
            style={styles.Logoutmenu}>
            <Entypo
              name="log-out"
              style={{padding: 10}}
              size={25}
              color="#000"
            />
            <Text style={{color: '#000'}}>Logout</Text>
          </TouchableOpacity>
          <TouchableOpacity
            // onPress={() => deleteAccount()}
            style={styles.Logoutmenu}>
            <AntDesign
              name="delete"
              style={{padding: 10}}
              size={25}
              color="#ccc"
            />
            <Text style={{color: '#ccc'}}>Account</Text>
          </TouchableOpacity>
          <TouchableOpacity
            // onPress={() => deleteAccount()}
            style={styles.Logoutmenu}>
            <Ionicons
              name="notifications-circle"
              style={{padding: 10}}
              size={25}
              color="#000"
            />
            <Text style={{color: '#000'}}>notifications</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.dispatch(navigation.push('PropertyView'))}
            style={styles.Logoutmenu}>
            <AntDesign
              name="hearto"
              style={{padding: 10}}
              size={25}
              color="#000"
            />
            <Text style={{color: '#000'}}>{`saved`}</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default PepperMenu;

const styles = StyleSheet.create({
  LogoutCantainer: {
    position: 'absolute',
    top: 50,
    right: 30,
    width: 170,
    height: 210,
    columnGap: 10,
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems:'flex-start'
  },
  Logoutmenu: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
