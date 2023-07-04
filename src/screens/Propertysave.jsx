import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Linking,
  FlatList,
  Image,
} from 'react-native';
import React, {useCallback, useEffect} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import profileImg from '../../assets/profile.jpg';
import {useDispatch, useSelector} from 'react-redux';
import {Property_seved} from '../../redux/actions/properties';

const Propertysave = ({route, navigation}) => {
  const dispatch = useDispatch();
  const {property_id} = route.params;
  const {profile} = useSelector(state => state.user);
  const {Propertyseved} = useSelector(state => state.property);

  useEffect(() => {
    dispatch(Property_seved(profile.uid, 23));
    console.log(profile.uid);
  }, [dispatch]);
  return (
    <View>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign
            name="arrowleft"
            style={{padding: 10}}
            size={30}
            color="#fff"
          />
        </TouchableOpacity>
        <Text
          style={{color: '#fff', fontSize: 20,marginLeft:-50, textTransform: 'capitalize'}}>
          Interested
        </Text>
        <View></View>
      </View>
      <FlatList
        data={Propertyseved}
        style={{marginTop: 20}}
        renderItem={({item, index}) => (
          <View key={item.id} style={styles.caintainer}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                style={styles.profileImage}
                source={
                  item.profile_image ? {uri: item.profile_image} : profileImg
                }
              />
              <Text
                style={{
                  color: '#000',
                }}>{`${item.first_name} ${item.last_name}`}</Text>
            </View>
            <TouchableOpacity
              onPress={() => Linking.openURL(`tel:${item.contact_number}`)}
              style={[
                styles.buttontop,
                {
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                },
              ]}>
              <AntDesign
                style={[styles.icons]}
                name={'phone'}
                size={18}
                color={'#fff'}
              />
              <Text style={[styles.buttonText]}>call</Text>
            </TouchableOpacity>
          </View>
        )}
        ItemSeparatorComponent={() => (
          <View style={{width: 10, height: '100%'}} />
        )}
        ListHeaderComponent={() => <View style={{width: 12}} />}
      />
    </View>
  );
};

export default Propertysave;

const styles = StyleSheet.create({
  caintainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    marginHorizontal: 20,
    alignItems: 'center',
    borderRadius: 8,
    padding: 5,
    margin: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  header: {
    height: 60,
    backgroundColor: '#3959f7',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 100,
    resizeMode: 'contain',
  },
  buttontop: {
    padding: 12,
    backgroundColor: '#1E90FF',
    borderRadius: 8,
    width: 100,
  },
  icons: {
    paddingRight: 10,
  },
});
