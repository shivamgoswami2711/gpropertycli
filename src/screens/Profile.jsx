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
import React, {useState, useEffect} from 'react';
import profileImg from '../../assets/profile.jpg';
import property from '../../assets/logo.png';
import {launchImageLibrary} from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import {userUpdate} from '../../redux/actions/user';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  deleteProperty,
  oneForUpdateproperty,
  userproperty,
} from '../../redux/actions/properties';
const WIDTH = Dimensions.get('window').width;

const Profile = ({navigation}) => {
  const dispatch = useDispatch();
  const {profile} = useSelector(state => state.user);
  const {propertyadded} = useSelector(state => state.property);
  const userId = profile.id;

  useEffect(() => {
    if (!userId) navigation.dispatch(navigation.push('Login'));
  }, [profile]);

  useEffect(() => {
    console.log('propertyadded');
    dispatch(userproperty({id: userId, uid: profile.uid}));
  }, [dispatch]);

  const [profileModule, setProfileModule] = useState(false);
  const [name, setName] = useState(profile ? profile.first_name : '');
  const [lName, setLName] = useState(profile ? profile.last_name : '');
  const [email, setEmail] = useState(profile ? profile.email : '');

  const [image, setImage] = useState('');

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
      formdata.append('uid', profile.uid);
      formdata.append('first_name', name);
      formdata.append('last_name', lName);
      formdata.append('email', email);
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
      if (!name) Alert.alert('please add name');
      if (!lName) Alert.alert('please add last name');
      if (!email) Alert.alert('please add email');
    }
  }

  function editpropertyFunc(id) {
    dispatch(oneForUpdateproperty({id: 304, uid: profile.uid}));
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

  return (
    <View>
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
        <Text style={styles.headingProperty}>properties</Text>
      </View>
      <FlatList
        data={propertyadded}
        style={{marginBottom:70}}
        renderItem={({item, index}) => (
          <TouchableOpacity
            key={index}
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
              <View style={{justifyContent: 'space-between', width: 170}}>
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
                  height: 130,
                }}>
                <TouchableOpacity onPress={() => showAlertforProperty(item.id)}>
                  <Entypo name="cross" size={30} color="#000" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => editpropertyFunc()}>
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
          </TouchableOpacity>
        )}
      />

      <Modal visible={profileModule} transparent={true} animationType="slide">
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
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
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
    height: 550,
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
    height: 150,
    margin: 20,
    borderRadius: 20,
    backgroundColor: '#fff',
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
});
