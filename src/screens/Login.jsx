import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Modal,
  Dimensions,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import profile from '../../assets/profile.jpg';
import {launchImageLibrary} from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/AntDesign';
import {useDispatch} from 'react-redux';
import {LoginAction} from '../../redux/actions/user';

const WIDTH = Dimensions.get('window').width;

const Login = ({navigation}) => {
  const dispatch = useDispatch();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [profileModule, setProfileModule] = useState(false);
  const [name, setName] = useState('');
  const [uid, setUid] = useState('');
  const [lName, setLName] = useState('');
  const [email, setEmail] = useState('');
  const [isSmsCodeSent, setIsSmsCodeSent] = useState(false);
  const [confirm, setConfirm] = useState(null);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState('');

  useEffect(async () => {
    const uid = await AsyncStorage.getItem('uid');
    if (uid) {
      profileModule(true);
    }
  }, []);

  const sendSmsCode = async phoneNumber => {
    if (phoneNumber && phoneNumber.length == 10) {
      try {
        setLoading(true);
        let confirmationResult = await auth().signInWithPhoneNumber(
          `+91${phoneNumber}`,
          true,
        );
        setIsSmsCodeSent(true);
        setConfirm(confirmationResult);
        setLoading(false);
        Promise.resolve();
      } catch (error) {
        Alert.alert('something went wrong please try after sometime');
      }
    } else {
      Alert.alert('please enter correct number');
    }
  };

  const storeUID = async uid => {
    try {
      await AsyncStorage.setItem('uid', uid);
      const profileData = await AsyncStorage.getItem('profile');

      if (!profileData) {
        setProfileModule(true);
      } else {
        navigation.dispatch(navigation.replace('HomePage'));
      }
    } catch (error) {
    }
  };

  async function confirmCode() {
    try {
      const result = await confirm.confirm(otp);
      storeUID(result.user.uid);
      setUid(result.user.uid);
    } catch (error) {
      Alert.alert('you have entered incorrect otp');
    }
  }
  async function pickUpImg() {
    try {
      launchImageLibrary(
        {
          selectionLimit: 1,
          mediaType: 'photo',
          includeBase64: false,
        },
        setImage,
      );
    } catch {
      error => {
        Alert.alert(error);
      };
    }
  }

  async function submitProfile() {
    if (name && lName && email) {
      let formdata = new FormData();
      formdata.append('uid', uid);
      formdata.append('first_name', name);
      formdata.append('last_name', lName);
      formdata.append('email', email);
      formdata.append('contact_number', phoneNumber);
      image &&
        formdata.append('image', {
          uri: image?.assets[0]?.uri,
          type: 'image/jpeg',
          name: image?.assets[0]?.uri.split('/').pop(),
        });
      dispatch(LoginAction(formdata));
      const jsonValue = await AsyncStorage.getItem('profile');
      if (jsonValue != null) {
        setUid('');
        setConfirm('');
        setProfileModule(false);
        navigation.dispatch(navigation.replace('HomePage'));
      }
    } else {
      if (!name) Alert.alert('please add name');
      if (!lName) Alert.alert('please add last name');
      if (!email) Alert.alert('please add email');
    }
  }

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={{color: '#000', fontSize: 20}}>Sending... OTP</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Login</Text>
      <View style={styles.form}>
        {isSmsCodeSent ? (
          <View>
            <View style={styles.formNumberEdit}>
              <Text style={{color: '#000', fontSize: 18}}>{phoneNumber}</Text>
              <TouchableOpacity
                style={{marginLeft: 5}}
                onPress={() => setIsSmsCodeSent(false)}>
                <Icon name="edit" size={25} color="#000" />
              </TouchableOpacity>
            </View>
            <View style={styles.formOtp}>
              <TextInput
                placeholderTextColor={'#000'}
                maxLength={6}
                style={styles.inputOtp}
                placeholder={'OTP'}
                value={otp}
                onChangeText={value => setOtp(value)}
                keyboardType="phone-pad"
              />
            </View>
          </View>
        ) : (
          <TextInput
            placeholderTextColor={'#000'}
            maxLength={10}
            style={styles.input}
            value={phoneNumber}
            onChangeText={value => setPhoneNumber(value)}
            placeholder={'Enter 10 digit phone number'}
            keyboardType="phone-pad"
          />
        )}
        {isSmsCodeSent ? (
          <TouchableOpacity style={styles.button} onPress={() => confirmCode()}>
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
      <Modal visible={profileModule} transparent={true} animationType="slide">
        <View style={styles.modalCantainer}>
          <View style={styles.modalBottomCantainer}>
            <View>
              <View style={styles.profileImgCantainer}>
                <Image
                  style={styles.profile}
                  source={
                    image.didCancel || !image
                      ? profile
                      : {
                          uri: image.assets[0].uri,
                        }
                  }
                />
                <TouchableOpacity
                  onPress={() => pickUpImg()}
                  style={styles.addImgButton}>
                  <Icon name="plus" size={30} color="#fff" />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.NameCaintainer}>
              <View>
                <Text style={styles.inputLabal}>Name</Text>
                <TextInput
                  placeholder="Name"
                  placeholderTextColor={'#ccc'}
                  style={styles.inputFild}
                  value={name}
                  onChangeText={value => setName(value)}
                />
              </View>
              <View>
                <Text style={styles.inputLabal}>Last Name</Text>
                <TextInput
                  placeholder="Last Name"
                  placeholderTextColor={'#ccc'}
                  style={styles.inputFild}
                  value={lName}
                  onChangeText={value => setLName(value)}
                />
              </View>
            </View>
            <View style={styles.emailCaintainer}>
              <Text style={styles.inputLabal}>Email</Text>
              <TextInput
                placeholder="Email"
                placeholderTextColor={'#ccc'}
                style={styles.inputEmailFild}
                value={email}
                onChangeText={value => setEmail(value)}
              />
            </View>
            <View>
              <TouchableOpacity
                style={styles.profileSubmit}
                onPress={() => submitProfile()}>
                <Text style={styles.buttonText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  addImgButton: {
    position: 'absolute',
    backgroundColor: '#000',
    color: '#fff',
    borderRadius: 20,
    width: 30,
    height: 30,
    bottom: 50,
    left: WIDTH - 190,
  },
  formNumberEdit: {
    flexDirection: 'row',
    marginBottom: 10,
  },
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
    color: '#000',
  },
  form: {
    width: '80%',
    alignItems: 'center',
  },
  inputOtp: {
    width: WIDTH - 90,
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    marginBottom: 20,
    color: '#000',
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
  profileSubmit: {
    height: 50,
    borderRadius: 10,
    backgroundColor: '#1E90FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    marginHorizontal: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalCantainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalBottomCantainer: {
    height: 500,
    backgroundColor: '#f2f2f2',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  profile: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  profileImgCantainer: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emailCaintainer: {
    marginHorizontal: 30,
    marginBottom: 20,
  },
  NameCaintainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 30,
    marginBottom: 20,
  },
  inputLabal: {
    color: '#000',
  },
  inputFild: {
    width: 150,
    borderWidth: 1,
    borderColor: '#fff',
    marginTop: 5,
    borderRadius: 8,
    backgroundColor: '#fff',
    color: '#000',
  },
  inputEmailFild: {
    width: WIDTH - 60,
    borderWidth: 1,
    backgroundColor: '#fff',
    borderColor: '#fff',
    marginTop: 5,
    borderRadius: 8,
    color: '#000',
  },
});
