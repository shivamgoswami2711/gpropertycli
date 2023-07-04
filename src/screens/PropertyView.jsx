import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Linking,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import property from '../../assets/logo.png';
import {useDispatch, useSelector} from 'react-redux';
import {recentlyView} from '../../redux/actions/user';
import NetInfo from '@react-native-community/netinfo';

const PropertyView = ({navigation}) => {
  const dispatch = useDispatch();
  const [pageNumber, setPageNumber] = useState(1);
  const {profile, recentlyViewData} = useSelector(state => state.user);
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

  function loadMoreData() {
    if (recentlyViewData?.last_page > pageNumber) {
      dispatch(
        recentlyView({
          id: profile.id,
          uid: profile.uid,
          pageid: pageNumber + 1,
        }),
      );
      setPageNumber(pageNumber + 1);
    }
  }

  useEffect(() => {
    dispatch(
      recentlyView({id: profile.id, uid: profile.uid, pageid: pageNumber}),
    );
  }, [dispatch]);

  function formatNumber(num = 0) {
    if (num) {
      if (num >= 10000000) {
        return (num / 10000000).toFixed(1).replace(/\.0$/, '') + 'C';
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
          style={{
            color: '#fff',
            fontSize: 20,
            marginLeft: -50,
            textTransform: 'capitalize',
          }}>
          saved
        </Text>
        <View></View>
      </View>
      <View>
        <FlatList
          style={{marginTop: 10, marginBottom: 130}}
          data={recentlyViewData}
          onEndReached={loadMoreData}
          ItemSeparatorComponent={() => <View style={{height: 15}} />}
          renderItem={({item, index}) => (
            <TouchableOpacity
              activeOpacity={0.5}
              key={item.recent_id}
              style={{
                height: 170,
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
                <View style={{justifyContent: 'space-between', width: 200}}>
                  <View style={styles.nameEdit}>
                    <Text
                      style={
                        styles.propertyType
                      }>{`${item.property_type} (${item.property_for})`}</Text>
                    <Text style={styles.propertyType}>{`₹${formatNumber(
                      item.expected_price === null
                        ? item?.monthly_rent
                        : item?.expected_price,
                    )}`}</Text>
                  </View>
                  <Text style={styles.propertyLocation}>{item.location}</Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  marginTop: 10,
                  alignItems: 'center',
                  marginBottom: 10,
                }}></View>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

export default PropertyView;

const styles = StyleSheet.create({
  propertyProfile: {
    width: 170,
    height: 170,
    resizeMode: 'contain',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  propertyCantainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // columnGap: 10,
    // paddingHorizontal: 20,
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
  ViewCantainer: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 20,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 10,
  },
  profilePic: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    borderRadius: 8,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  header: {
    height: 60,
    backgroundColor: '#3959f7',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 16,
    color: '#000',
  },
});
