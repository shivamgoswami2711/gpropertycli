import React, {memo, useEffect, useCallback, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import profile from '../../assets/profile.jpg';
import MapHeader from '../component/MapHeader';
import {propertiespage} from '../../redux/actions/properties';
import Icon from 'react-native-vector-icons/Fontisto';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MapView, {Marker} from 'react-native-maps';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {StackActions} from '@react-navigation/native';
import TopFilter from '../component/TopFilter';
import NetInfo from '@react-native-community/netinfo';
import FlatlistComponent from '../component/FlatlistSmailCard';
import {propertyHome} from '../../redux/actions/home';

function formatNumber(num = 0) {
  if (num) {
    if (num >= 10000000) {
      return (num / 100000).toFixed(1).replace(/\.0$/, '') + 'C';
    }
    if (num >= 100000) {
      return (num / 100000).toFixed(1).replace(/\.0$/, '') + 'L';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
    }
    return num;
  }
  return ' ';
}

const Homeproperty = ({route, navigation}) => {
  const home = useSelector(state => state.home);
  const dispatch = useDispatch();
  const [filter, setFilter] = useState({});
  const [propertyFor, setProperty_for] = useState('');
  const [property_type, setProperty_type] = useState('');
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

  let address = home.address;

  useEffect(() => {
    dispatch(propertyHome(property_type, address));
  }, [dispatch, home.address, property_type]);

  const renderFooter = () => {
    if (!home.loading) return null;

    return (
      <View style={styles.footer}>
        <ActivityIndicator size="small" color="#000000" />
      </View>
    );
  };

  const TopF = useCallback(
    (property_type, setProperty_type, propertyFor, setProperty_for) => {
      return (
        <TopFilter
          property_type={property_type}
          setProperty_type={setProperty_type}
          propertyFor={propertyFor}
          setProperty_for={setProperty_for}
          forOption={false}
        />
      );
    },
    [property_type],
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
    <View>
      <View style={styles.addNewButtonContainer}>
        <TouchableOpacity
          style={styles.addNewButton}
          activeOpacity={0.5}
          onPress={() => navigation.navigate('Sell')}>
          <AntDesign name="plus" size={40} color="black" />
        </TouchableOpacity>
      </View>
      <ScrollView style={{backgroundColor: '#fff'}}>
        {TopF(property_type, setProperty_type, propertyFor, setProperty_for)}
        {home?.coordinates.length ? (
          <MapHeader
            title={'properties'}
            coordinates={home?.coordinates}
            navigation={navigation}
          />
        ) : (
          <></>
        )}

        <View style={styles.horizontalListContainer}>
          {home?.rent.length !== 0 && (
            <View style={styles.horizontalListTextContainer}>
              <Text style={styles.horizontalListText}>Rent</Text>
            </View>
          )}
          <FlatList
            data={home?.rent || []}
            renderItem={({index, item}) => (
              <FlatlistComponent
                index={index}
                item={item}
                router={navigation}
              />
            )}
            horizontal={true}
            ListFooterComponent={renderFooter}
            keyExtractor={(item, Property) => item.id + '' + Property}
            ItemSeparatorComponent={() => (
              <View style={{width: 15, height: '100%'}} />
            )}
            ListHeaderComponent={() => <View style={{width: 12}} />}
          />
          {home?.sell.length !== 0 && (
            <View style={styles.horizontalListTextContainer}>
              <Text style={styles.horizontalListText}>Buy</Text>
            </View>
          )}
          <FlatList
            data={home?.sell || []}
            renderItem={({index, item}) => (
              <FlatlistComponent
                index={index}
                item={item}
                router={navigation}
              />
            )}
            horizontal={true}
            ListFooterComponent={renderFooter}
            keyExtractor={(item, Property) => item.id + '' + Property}
            ItemSeparatorComponent={() => (
              <View style={{width: 15, height: '100%'}} />
            )}
            ListHeaderComponent={() => <View style={{width: 12}} />}
          />
        </View>
        {!home?.loading && home?.rent.length == 0 && home?.sell.length == 0 && (
          <View
            style={{
              height: 500,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              style={{width: 150, height: 150, resizeMode: 'contain'}}
              source={require('../../assets/search404.png')}
            />
            <Text
              style={{
                color: '#ccc',
                fontWeight: 800,
                fontSize: 30,
                marginTop: 20,
              }}>
              Sorry result not found
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  addNewButtonContainer: {
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    position: 'absolute',
    right: 30,
    bottom: 90,
    zIndex: 1,
  },
  addNewButton: {
    width: 65,
    height: 65,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 3},
    borderWidth: 0.5,
    borderColor: '#ccc',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  horizontalListContainer: {
    paddingBottom: 5,
    marginBottom: 100,
  },
  horizontalListTextContainer: {
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderColor: '#ccc',
    marginBottom: 1,
  },
  horizontalListText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 30,
    color: '#000',
    textTransform: 'capitalize',
  },
  footer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    marginBottom: 100,
  },
  mainContainer: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 3},
    borderWidth: 1,
    borderColor: '#ccc',
    shadowOpacity: 0.25,
    marginHorizontal: 10,
    shadowRadius: 4,
    elevation: 2,
    borderRadius: 8,
    marginTop: 10,
  },
  videoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  map: {
    width: '100%',
    height: 200,
    marginHorizontal: 10,
  },
  playButton: {
    position: 'absolute',
    alignSelf: 'center',
    zProperty: 1,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 50,
    padding: 10,
  },
  playIcon: {
    fontSize: 30,
    color: 'white',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    padding: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 0.5,
    borderColor: '#ccc',
    color: '#000',
  },
  detailText: {
    height: 90,
    paddingTop: 20,
    paddingHorizontal: 20,
    fontSize: 14,
    color: '#000',
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
    padding: 20,
    borderBottomWidth: 0.5,
    borderColor: '#ccc',
  },
  dimenSionText: {
    fontSize: 14,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    marginRight: 10,
    color: '#000',
  },
  imgandDateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 16,
    marginLeft: 16,
  },
  dateContainerText: {
    fontSize: 14,
    marginTop: 5,
    paddingHorizontal: 20,
    color: '#000',
  },
});

export default Homeproperty;
