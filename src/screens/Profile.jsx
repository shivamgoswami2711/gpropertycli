import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  Modal,
  Alert,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import profileImg from '../../assets/profile.jpg';
import property from '../../assets/logo.png';
import {launchImageLibrary} from 'react-native-image-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Octicons from 'react-native-vector-icons/Octicons';
import {
  changePropertyFor,
  updatenumber,
  userUpdate,
} from '../../redux/actions/user';
import {useDispatch, useSelector} from 'react-redux';
import {Picker} from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {
  deleteProperty,
  oneForUpdateproperty,
  userproperty,
} from '../../redux/actions/properties';
import {PropertyStatus} from '../Include/SellData';
import NetInfo from '@react-native-community/netinfo';
import auth from '@react-native-firebase/auth';
const WIDTH = Dimensions.get('window').width;

const Profile = ({navigation}) => {
  const dispatch = useDispatch();
  const {profile} = useSelector(state => state.user);
  const {propertyadded} = useSelector(state => state.property);
  const [confirm, setConfirm] = useState(null);
  const [isSmsCodeSent, setIsSmsCodeSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState('');
  const otpRef = useRef(null);
  const userId = profile.id;

  useEffect(() => {
    if (!userId) {
      if (userId == undefined) {
        navigation.navigate('Home');
      } else {
        navigation.dispatch(navigation.push('Login'));
      }
    }
  }, [profile]);

  function propertyStatusChange(property_for, id, idx) {
    let statusarry = [...propertyStatus];
    statusarry[idx] = {id, property_for};
    setPropertyStatus(statusarry);
    dispatch(changePropertyFor(id, property_for));
  }

  useEffect(() => {
    dispatch(userproperty({id: userId, uid: profile.uid}));
  }, [dispatch, navigation]);

  const [profileModule, setProfileModule] = useState(false);
  const [numberModule, setNumberModule] = useState(false);
  const [uid, setUid] = useState('');
  const [name, setName] = useState(profile ? profile.first_name : '');
  const [lName, setLName] = useState(profile ? profile.last_name : '');
  const [email, setEmail] = useState(profile ? profile.email : '');
  const [city, setCity] = useState(profile ? profile.city : '');
  const [phoneNumber, setPhoneNumber] = useState(
    profile ? profile.contact_number : '',
  );
  const [propertyStatus, setPropertyStatus] = useState([]);
  const [image, setImage] = useState('');
  const [netinformation, setNetinformation] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setNetinformation(state.isConnected);
    });

    // Clean up the event listener when the component is unmounted
    return () => {
      unsubscribe();
    };
  }, []);

  const sendSmsCode = async () => {
    setLoading(true);
    if (profile && profile.contact_number !== phoneNumber) {
      if (phoneNumber && phoneNumber.length == 10) {
        try {
          let confirmationResult = await auth().signInWithPhoneNumber(
            `+91${phoneNumber}`,
            true,
          );

          setConfirm(confirmationResult);
          setIsSmsCodeSent(true);
          setLoading(false);
          Promise.resolve();
        } catch (error) {
          setLoading(false);
          Alert.alert('something went wrong please try after sometime');
        }
      } else {
        Alert.alert('please enter correct number');
      }
    }
  };

  useEffect(() => {
    function pickerArray() {
      let statusarry = [...propertyStatus];
      propertyadded &&
        propertyadded.map((item, idx) => {
          statusarry[idx] = {id: item.id, property_for: item.property_for};
        });
      setPropertyStatus(statusarry);
    }
    setPropertyStatus([]);
    pickerArray();
  }, [propertyadded]);

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

  async function confirmCode() {
    setLoading(true);
    try {
      const result = await confirm.confirm(otp);
      await AsyncStorage.setItem('uid', result.user.uid);
      dispatch(updatenumber(profile.uid, result.user.uid, phoneNumber));
      setUid(result.user.uid);
      setNumberModule(false);
      setPhoneNumber('');
      setIsSmsCodeSent(false);
      setOtp('');
      setLoading(false);
    } catch (error) {
      setLoading(false);
      Alert.alert('you have entered incorrect otp');
    }
  }
  async function submitProfile() {
    if (name && lName && email && phoneNumber && city) {
      let formdata = new FormData();
      formdata.append('uid', profile.uid);
      formdata.append('first_name', name);
      formdata.append('last_name', lName);
      formdata.append('email', email);
      formdata.append('city', city);
      formdata.append('contact_number', phoneNumber);
      image &&
        formdata.append('image', {
          uri: image?.assets[0]?.uri,
          type: 'image/jpeg',
          name: image?.assets[0]?.uri.split('/').pop(),
        });
      dispatch(userUpdate(formdata));
      const jsonValue = await AsyncStorage.getItem('profile');
      if (jsonValue != null) {
        setProfileModule(false);
        setImage('');
      }
    } else {
      if (!name) return Alert.alert('please add name');
      if (!lName) return Alert.alert('please add last name');
      if (!email) return Alert.alert('please add email');
      if (!phoneNumber) return Alert.alert('please add number');
      if (!city) return Alert.alert('please add city');
    }
  }

  function PropertysaveOpem(id) {
    navigation.dispatch(navigation.push(`propertysave`, {property_id: id}));
  }
  function editpropertyFunc(id) {
    dispatch(oneForUpdateproperty({id, uid: profile.uid}));
    navigation.dispatch(navigation.push(`EdtProperty`));
  }

  const showAlertforProperty = id =>
    Alert.alert(
      'Delete Property',
      'do you want to delete is Property',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'ok',
          onPress: () => {
            dispatch(
              deleteProperty({id, uid: profile.uid, user_id: profile.id}),
            );
            Alert.alert('deleted');
          },
          style: 'destructive',
        },
      ],
      {
        cancelable: true,
      },
    );
  if (!netinformation) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#fff',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          style={{width: 300, height: 300, resizeMode: 'contain'}}
          source={require('../../assets/offline.jpg')}
        />
        <Text style={{color: '#ccc', fontSize: 24, fontWeight: 800}}>
          Offline
        </Text>
      </View>
    );
  }

  return (
    <View style={{marginBottom: 100}}>
      <View style={styles.profiledatacaintainer}>
        <View style={styles.profileImgMainCantainer}>
          <Image
            style={styles.profilepic}
            source={
              profile.image
                ? {
                    uri: `https://gpropertypay.com/public/uploads/${profile.image}`,
                  }
                : profileImg
            }
          />
          <Text style={styles.editText} onPress={() => setProfileModule(true)}>
            Edit
          </Text>
        </View>
        <View>
          <Text style={styles.ProfileName}>
            {profile && profile.first_name}
          </Text>
          <Text style={styles.ProfilelastName}>
            {profile && profile.last_name}
          </Text>
          <Text style={styles.Profileemail}>{profile && profile.email}</Text>
          <Text style={styles.Profileemail}>
            {profile && profile.contact_number}
          </Text>
        </View>
      </View>
      <View>
        <View>
          <Text style={styles.headingProperty}>properties</Text>
        </View>
        <FlatList
          data={propertyadded}
          style={{marginBottom: 220}}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                key={index}
                style={{
                  height: 220,
                  margin: 20,
                  borderRadius: 20,
                  backgroundColor: '#fff',
                }}
                onPress={() =>
                  navigation.dispatch(navigation.push(`Post`, {id: item.id}))
                }>
                <View style={styles.propertyCantainer}>
                  <View>
                    <Image
                      style={styles.propertyProfile}
                      source={
                        item.image
                          ? {
                              uri: `https://gpropertypay.com/public/uploads/${item.image}`,
                            }
                          : property
                      }
                    />
                  </View>
                  <View style={{justifyContent: 'space-between', width: '50%'}}>
                    <View style={styles.nameEdit}>
                      <Text
                        style={
                          styles.propertyType
                        }>{`${item.property_type} (${item.property_for})`}</Text>
                    </View>
                    <Text style={styles.propertyLocation}>{item.location}</Text>
                  </View>
                  <View
                    style={{
                      justifyContent: 'space-between',
                      marginVertical: 5,
                      height: 120,
                    }}>
                    <TouchableOpacity
                      onPress={() => showAlertforProperty(item.id)}>
                      <Entypo name="cross" size={30} color="#000" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => editpropertyFunc(item.id)}>
                      <Text
                        style={{
                          color: '#000',
                          backgroundColor: '#c6ddf7',
                          padding: 5,
                          borderRadius: 5,
                        }}>
                        Edit
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    marginTop: 10,
                    alignItems: 'center',
                    marginBottom: 10,
                  }}>
                  <View
                    style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Octicons
                      name="dot-fill"
                      size={40}
                      color={
                        item.admin_status == 'Approved'
                          ? '#03fc3d'
                          : item.admin_status == 'Pending'
                          ? '#f5c542'
                          : '#fc1c03'
                      }
                    />
                    <Text style={{color: '#000'}}>{item.admin_status}</Text>
                  </View>
                  <View style={styles.bedroomcontainer}>
                    <Picker
                      style={styles.bedroompicker}
                      selectedValue={propertyStatus[index]?.property_for}
                      onValueChange={Status => {
                        propertyStatusChange(Status, item.id, index);
                      }}>
                      {PropertyStatus.map(({label, value}) => (
                        <Picker.Item key={label} label={label} value={value} />
                      ))}
                    </Picker>
                  </View>
                  {item.admin_status !== 'Approved' && (
                    <TouchableOpacity
                      style={{
                        marginLeft: '7%',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                      onPress={() => PropertysaveOpem(item.id)}>
                      <AntDesign
                        style={[styles.icons]}
                        name={'hearto'}
                        size={18}
                        color={'#000'}
                      />
                      <Text style={{color: '#000'}}>Interested</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>

      <Modal
        visible={profileModule}
        onRequestClose={() => setProfileModule(false)}
        transparent={true}
        animationType="slide">
        <View style={styles.modalCantainer}>
          <View style={styles.modalBottomCantainer}>
            <View>
              <View style={styles.profileImgCantainer}>
                <Image
                  style={styles.profile}
                  source={
                    image
                      ? image.didCancel
                        ? profile.image
                          ? {
                              uri: `https://gpropertypay.com/public/uploads/${profile.image}`,
                            }
                          : profileImg
                        : {
                            uri: image.assets[0].uri,
                          }
                      : profile.image
                      ? {
                          uri: `https://gpropertypay.com/public/uploads/${profile.image}`,
                        }
                      : profileImg
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
                  defaultValue={name}
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
              {profile && profile.logintype == 'no' ? (
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
              ) : (
                <View>
                  <Text style={styles.inputLabal}>Number</Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text style={{fontSize: 18, color: '#000', marginTop: 8}}>
                      {profile ? profile.contact_number : ''}
                    </Text>
                    <Icon
                      name="edit"
                      onPress={() => {
                        setNumberModule(true);
                        setProfileModule(false);
                      }}
                      style={{marginLeft: 10}}
                      size={25}
                      color="#000"
                    />
                  </View>
                </View>
              )}
            </View>
            <View>
              <TouchableOpacity
                style={styles.profileSubmit}
                onPress={() => submitProfile()}>
                <Text style={styles.buttonText}>Update</Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                style={styles.profileSubmit}
                onPress={() => setProfileModule(false)}>
                <Text style={styles.buttonText}>cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        visible={numberModule}
        onRequestClose={() => {
          setIsSmsCodeSent(false);
          setNumberModule(false);
        }}
        transparent={true}
        animationType="slide">
        <View style={styles.modalCantainer}>
          <View
            style={[
              styles.modalBottomCantainer,
              {height: 400, paddingTop: 30},
            ]}>
            <View style={styles.emailCaintainer}>
              <Text style={styles.inputLabal}>Number</Text>
              <TextInput
                placeholder="Number"
                placeholderTextColor={'#ccc'}
                style={styles.inputEmailFild}
                value={phoneNumber}
                onChangeText={value => setPhoneNumber(value)}
                maxLength={10}
                keyboardType="phone-pad"
              />
            </View>
            {isSmsCodeSent && (
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
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
            )}
            {!isSmsCodeSent ? (
              <View>
                <TouchableOpacity
                  style={[
                    styles.profileSubmit,
                    {
                      backgroundColor:
                        profile && phoneNumber && phoneNumber.length == 10
                          ? profile.contact_number == phoneNumber
                            ? '#ccc'
                            : '#1E90FF'
                          : '#ccc',
                    },
                  ]}
                  onPress={() => sendSmsCode()}>
                  <Text style={styles.buttonText}>
                    {loading ? 'Sending... OTP' : 'Send OTP'}
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View>
                <TouchableOpacity
                  style={styles.profileSubmit}
                  onPress={() => confirmCode()}>
                  <Text style={styles.buttonText}>
                    {loading ? 'Updateing...' : 'Update'}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
            <View>
              <TouchableOpacity
                style={styles.profileSubmit}
                onPress={() => {
                  setIsSmsCodeSent(false);
                  setNumberModule(false);
                }}>
                <Text style={styles.buttonText}>cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  borderStyleHighLighted: {
    borderColor: '#03DAC6',
  },

  underlineStyleBase: {
    width: 45,
    height: 45,
    borderWidth: 1,
    marginHorizontal: 3,
    color: '#000',
    backgroundColor: '#fff',
  },

  underlineStyleHighLighted: {
    borderColor: '#1E90FF',
  },
  headingProperty: {
    fontSize: 18,
    padding: 10,
    textTransform: 'capitalize',
    marginTop: 20,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    color: '#000',
  },
  profiledatacaintainer: {
    height: 200,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    columnGap: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  profileImgMainCantainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  editText: {
    marginTop: 10,
    fontSize: 18,
    color: '#fff',
    backgroundColor: '#5588e0',
    borderRadius: 6,
    padding: 8,
  },
  profilepic: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    borderRadius: 150,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  ProfileName: {
    fontSize: 20,
    color: '#000',
    textTransform: 'capitalize',
  },
  ProfilelastName: {
    fontSize: 20,
    color: '#000',
    textTransform: 'capitalize',
  },
  Profileemail: {
    fontSize: 12,
    color: '#000',
    textTransform: 'capitalize',
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
    forflexDirection: 'row',
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
    height: 630,
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
  propertyProfile: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
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
  propertyCantainer: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 20,
    paddingHorizontal: 20,
  },
  nameEdit: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  propertyType: {
    color: '#000',
    fontSize: 20,
    textTransform: 'capitalize',
  },
  propertyLocation: {
    color: '#000',
    fontSize: 16,
    height: 80,
    textTransform: 'capitalize',
    marginTop: 10,
  },
  bedroomcontainer: {
    justifyContent: 'center',
    width: 190,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginLeft: 20,
    color: '#000',
  },
  bedroompicker: {
    color: '#000',
  },
});
