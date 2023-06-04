import {
    Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import auth from '@react-native-firebase/auth';

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [isSmsCodeSent, setIsSmsCodeSent] = useState(false);
  const [confirm, setConfirm] = useState(null);

  const sendSmsCode = async phoneNumber => {
    try {
      let confirmationResult = await auth().signInWithPhoneNumber(
        `+91${phoneNumber}`,
        true,
      );

      Promise.resolve();
      setIsSmsCodeSent(true);
      setPhoneNumber('');
      setConfirm(confirmationResult);
    } catch (error) {
      Alert.alert("something went wrong please try after sometime")
    }
  };

  async function confirmCode() {
    try {
      const result = await confirm.confirm(otp);
      console.log(result)
    } catch (error) {
      Alert.alert("something went wrong please try after sometime");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Login</Text>
      <View style={styles.form}>
        <TextInput
          placeholderTextColor={'#000'}
          style={styles.input}
          placeholder={isSmsCodeSent?"OTP":"Enter 10 digit phone number"}
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
        />
        {isSmsCodeSent ? (
          <TouchableOpacity
            style={styles.button}
            onPress={() => confirmCode()}>
            <Text style={styles.buttonText}>varify</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.button}
            onPress={() => sendSmsCode(phoneNumber)}>
            <Text style={styles.buttonText}>Send OTP</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 50,
  },
  form: {
    width: '80%',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    marginBottom: 20,
    color: '#000',
  },
  button: {
    width: '100%',
    height: 50,
    borderRadius: 10,
    backgroundColor: '#1E90FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
