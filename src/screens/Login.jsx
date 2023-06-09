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
  KeyboardAvoidingView,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import profilePic from '../../assets/profile.jpg';
import {launchImageLibrary} from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/AntDesign';
import {useDispatch, useSelector} from 'react-redux';
import {LoginAction, setuser} from '../../redux/actions/user';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import axios from 'axios';
import NetInfo from '@react-native-community/netinfo';

GoogleSignin.configure({
  webClientId:
    '806711796840-9ea9tuubbodopmof276r248hi49u0ud3.apps.googleusercontent.com',
});

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
  const [city, setCity] = useState('');
  const [token, setToken] = useState('');
  const [logintype, setLogintype] = useState('yes');
  const [isSmsCodeSent, setIsSmsCodeSent] = useState(false);
  const [confirm, setConfirm] = useState(null);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState('');
  const [googleLogin, setGoogleLogin] = useState(false);
  const [playservices, setPlayservices] = useState(true);
  const otpRef = useRef(null);
  const [netinformation, setNetinformation] = useState(true);
  const [loginprocess, setLoginprocess] = useState(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setNetinformation(state.isConnected);
    });
    getToken();
    // Clean up the event listener when the component is unmounted
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (otpRef.current) {
      setTimeout(() => otpRef.current.focusField(1), 250);
    }
  }, [otpRef.current]);

  async function getToken() {
    const fcmtoken = await AsyncStorage.getItem('fcmToken');
    setToken(fcmtoken);
  }
  const sendSmsCode = async phoneNumber => {
    if (phoneNumber && phoneNumber.length == 10) {
      try {
        setLoading(true);
        setGoogleLogin(false);
        let confirmationResult = await auth().signInWithPhoneNumber(
          `+91${phoneNumber}`,
          true,
        );
        setIsSmsCodeSent(true);
        setConfirm(confirmationResult);
        setLoading(false);
        Promise.resolve();
      } catch (error) {
        setLoading(false);
        Alert.alert('something went wrong please try after sometime');
      }
    } else {
      Alert.alert('please enter correct number');
      setLoginprocess(false);
    }
  };

  async function onGoogleButtonPress() {
    try {
      setLoginprocess(true);
      // Check if your device supports Google Play
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      // Get the users ID token
      const {idToken} = await GoogleSignin.signIn();

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      setGoogleLogin(true);
      // Sign-in the user with the credential
      return auth().signInWithCredential(googleCredential);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        setLoginprocess(false);
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        setPlayservices(true);
      }
    }
  }

  // useEffect(() => {
  //   console.log(profile)
  //   if (!profile) {
  //     setName(profile ? profile.first_name : '')
  //     setLName(profile ? profile.last_name : '')
  //     setEmail(profile ? profile.email : '')
  //   }
  // }, [profile]);

  async function confirmCode() {
    if (loginprocess) return;
    try {
      setLoginprocess(true);
      const result = await confirm.confirm(otp);
      const {data} = await axios.get(`/getuser?uid=${result.user.uid}`);

      if (data.length == 1) {
        await AsyncStorage.setItem('uid', result.user.uid);
        dispatch(setuser(data));
        setUid(result.user.uid);
        setLoginprocess(false);
        navigation.dispatch(navigation.replace('HomePage'));
      } else {
        setProfileModule(true);
        setUid(result.user.uid);
        setLoginprocess(false);
      }
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
    setLoginprocess(true);
    if (name && lName && email && phoneNumber) {
      let formdata = new FormData();
      formdata.append('uid', uid);
      formdata.append('first_name', name);
      formdata.append('last_name', lName);
      formdata.append('email', email);
      formdata.append('contact_number', phoneNumber);
      formdata.append('token', token);
      formdata.append('city', city);
      formdata.append('logintype', logintype);
      image &&
        formdata.append('image', {
          uri: image?.assets[0]?.uri,
          type: 'image/jpeg',
          name: image?.assets[0]?.uri.split('/').pop(),
        });
      dispatch(LoginAction(formdata));
      await AsyncStorage.setItem('uid', uid);
      setUid('');
      setConfirm('');
      setProfileModule(false);
      setGoogleLogin(false);
      setLoginprocess(false);
      navigation.dispatch(navigation.replace('HomePage'));
    } else {
      if (!name) return Alert.alert('please add name');
      if (!lName) return Alert.alert('please add last name');
      if (!email) return Alert.alert('please add email');
      if (!phoneNumber) return Alert.alert('please add number');
    }
  }

  return (
    <View style={{flex: 1}}>
      {loginprocess && (
        <View
          style={{
            height: 35,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#FFFF00',
            zIndex: 1,
          }}>
          <Text style={{fontSize: 16, color: 'blue'}}>processing....</Text>
        </View>
      )}
      {!netinformation && (
        <View
          style={{
            zIndex: 1,
            height: 35,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'red',
          }}>
          <Text style={{fontSize: 16, color: '#fff'}}>Offline 😞</Text>
        </View>
      )}
      <View style={styles.container}>
        <Image
          style={styles.loginPic}
          source={
            isSmsCodeSent
              ? require('../../assets/otppic.png')
              : require('../../assets/loginPic.jpg')
          }
        />
        <Text style={styles.heading}>
          {isSmsCodeSent ? 'Varify Number' : 'Login'}
        </Text>
        <View style={styles.form}>
          {isSmsCodeSent ? (
            <View>
              <View style={styles.formNumberEdit}>
                <Text style={{color: '#000', fontSize: 18}}>{phoneNumber}</Text>
                <TouchableOpacity
                  style={{marginLeft: 5}}
                  onPress={() => {
                    setLoginprocess(false);
                    setIsSmsCodeSent(false);
                  }}>
                  <Icon name="edit" size={25} color="#000" />
                </TouchableOpacity>
              </View>
              <OTPInputView
                ref={otpRef}
                autoFocusOnLoad={false}
                style={{width: '80%', height: 80, color: '#000'}}
                pinCount={6}
                code={otp}
                editable
                onCodeChanged={val => setOtp(val)}
                codeInputFieldStyle={styles.underlineStyleBase}
                codeInputHighlightStyle={styles.underlineStyleHighLighted}
                onCodeFilled={code => {
                  setOtp(code);
                }}
              />
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
            <TouchableOpacity
              style={[
                styles.button,
                {
                  backgroundColor:
                    otp.length == 6 && !loginprocess ? '#1E90FF' : '#ccc',
                },
              ]}
              onPress={() => confirmCode()}>
              <Text style={styles.buttonText}>verify</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.button}
              onPress={() => sendSmsCode(phoneNumber)}>
              <Text style={styles.buttonText}>
                {loading ? 'Sending... OTP' : 'Send OTP'}
              </Text>
            </TouchableOpacity>
          )}
        </View>
        <View>
          <TouchableOpacity
            style={[
              styles.button,
              {
                paddingHorizontal: 10,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                columnGap: 10,
                width: 250,
                marginTop: 100,
              },
            ]}
            onPress={() => {
              playservices
                ? () => {
                    onGoogleButtonPress().then(async result => {
                      const {data} = await axios.get(
                        `/getuser?uid=${result.user.uid}`,
                      );
                      if (data.length == 1) {
                        await AsyncStorage.setItem('uid', result.user.uid);
                        dispatch(setuser(data));
                        setUid(result.user.uid);
                        setLoginprocess(false);
                        navigation.dispatch(navigation.replace('HomePage'));
                      } else {
                        setLogintype('no');
                        setProfileModule(true);
                        setUid(result.user.uid);
                        setUid(result.user.uid);
                        setName(result.user.displayName);
                        setEmail(result.user.email);
                        setLoginprocess(false);
                      }
                    });
                  }
                : '';
            }}>
            <Icon name="google" size={25} color="#fff" />
            <Text style={styles.buttonText}>signup with google</Text>
          </TouchableOpacity>
        </View>
        <Modal visible={profileModule} transparent={true} animationType="slide">
          <View style={styles.modalCantainer}>
            <View
              style={[
                styles.modalBottomCantainer,
                {height: googleLogin ? 600 : 600},
              ]}>
              <KeyboardAvoidingView behavior="position">
                <View>
                  <View style={styles.profileImgCantainer}>
                    <Image
                      style={styles.profile}
                      source={
                        image.didCancel || !image
                          ? profilePic
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

                <View style={styles.NameCaintainer}>
                  <View>
                    <Text style={styles.inputLabal}>City</Text>
                    <TextInput
                      placeholder="City"
                      placeholderTextColor={'#ccc'}
                      style={styles.inputFild}
                      value={city}
                      onChangeText={value => setCity(value)}
                    />
                  </View>
                  {googleLogin && (
                    <View>
                      <Text style={styles.inputLabal}>Number</Text>
                      <TextInput
                        placeholder="Number"
                        placeholderTextColor={'#ccc'}
                        style={styles.inputFild}
                        value={phoneNumber}
                        onChangeText={value => setPhoneNumber(value)}
                      />
                    </View>
                  )}
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
              </KeyboardAvoidingView>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  loginPic: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
  },
  borderStyleBase: {
    width: 30,
    height: 45,
  },

  borderStyleHighLighted: {
    borderColor: '#03DAC6',
  },

  underlineStyleBase: {
    width: 45,
    height: 45,
    borderWidth: 1,
    marginHorizontal: 3,
    color: '#000',
  },

  underlineStyleHighLighted: {
    borderColor: '#1E90FF',
  },
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
    fontSize: 16,
    letterSpacing: 3,
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
