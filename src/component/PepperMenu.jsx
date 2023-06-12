import {StyleSheet, Text, View, Modal, TouchableOpacity} from 'react-native';
import React from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
const PepperMenu = ({logoutModal, setLogoutModal,navigation}) => {
  const {profile} = useSelector(state => state.user);
  const dispatch = useDispatch();

  async function onLogoutPress() {
    console.log("hello")
    await AsyncStorage.removeItem("uid")
    await AsyncStorage.removeItem("profile")
    navigation.dispatch(navigation.push('Login'));
    setLogoutModal(false);
  }

  function deleteAccount() {
    setLogoutModal(false);
  }

  return (
    <Modal transparent={true} visible={logoutModal}>
      <TouchableOpacity onPress={() => setLogoutModal(false)} style={{flex: 1}}>
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
            <Text>Logout</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => deleteAccount()}
            style={styles.Logoutmenu}>
            <AntDesign
              name="delete"
              style={{padding: 10}}
              size={25}
              color="#000"
            />
            <Text>Account</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default PepperMenu;

const styles = StyleSheet.create({
  LogoutCantainer: {
    position:"absolute",
    top:50,
    right:30,
    width: 150,
    height: 150,
    columnGap: 10,
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  Logoutmenu: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});