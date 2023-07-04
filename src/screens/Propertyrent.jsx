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
import Filter from '../../component/Filter';
import MapHeader from '../component/MapHeader';
import {propertiesrentpage} from '../../redux/actions/properties';
import Icon from 'react-native-vector-icons/Fontisto';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MapView, {Marker} from 'react-native-maps';
import {StackActions} from '@react-navigation/native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import TopFilter from '../component/TopFilter';
import NetInfo from '@react-native-community/netinfo';

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

const PropertyListComponet = memo(({item, navigation}) => {
  function formatDate() {
    const date = new Date(item?.created_at);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => {
        const pushAction = StackActions.push(`Post`, {id: item.id});
        setTimeout(() => {
          navigation.dispatch(pushAction);
        }, 40);
      }}>
      <View style={styles.mainContainer}>
        <View>
          <View style={styles.videoContainer}>
            <MapView
              style={styles.map}
              scrollEnabled={false}
              zoomTapEnabled={true}
              zoomControlEnabled={true}
              region={{
                latitude: parseFloat(item.lat),
                longitude: parseFloat(item.long),
                latitudeDelta: 0.0357922,
                longitudeDelta: 0.0315421,
              }}>
              <Marker
                coordinate={{
                  latitude: parseFloat(item.lat),
                  longitude: parseFloat(item.long),
                }}
              />
            </MapView>
          </View>
        </View>
        <View>
          <Text style={styles.title}>
            {item?.property_type} for {item?.property_for}{' '}
            {` (${
              item?.property_for == 'sell'
                ? formatNumber(item?.expected_price)
                : formatNumber(item?.monthly_rent)
            })`}
          </Text>
          <Text
            numberOfLines={3}
            ellipsizeMode="tail"
            style={styles.detailText}>
            <EvilIcons name="location" size={13} color="#900" />
            {item?.location}
          </Text>
          <View style={styles.dateContainer}>
            <Text style={styles.dateContainerText}>
              {item?.bedrooms} Bedrooms
            </Text>
            <Text style={styles.dateContainerText}>
              {item?.bathrooms} Bathrooms
            </Text>
            <Text style={styles.dimenSionText}>
              {item.saleable_area}{' '}
              {item?.saleable_area_size_in == 'Feet'
                ? `sp/${item?.saleable_area_size_in}`
                : item?.saleable_area_size_in}
            </Text>
          </View>
        </View>
        <View style={styles.imgandDateContainer}>
          <Image
            style={styles.profilePic}
            source={
              item.profile_image
                ? {
                    uri: `https://gpropertypay.com/public/uploads/${item.profile_image}`,
                  }
                : profile
            }
          />
          <Text style={styles.dateContainerText}>
            <Icon name="date" size={12} color="#900" /> {formatDate()}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
});

const Propertyrent = ({route, navigation}) => {
  const {property_for} = route.params;
  const dispatch = useDispatch();
  const [filter, setFilter] = useState({});
  const [propertyFor, setProperty_for] = useState(property_for || '');
  const [property_type, setProperty_type] = useState('');
  const propertyrentData = useSelector(state => state.property);
  const [searchAddress, setSearchAddress] = useState('');
  const [searchAddressSend, setSearchAddressSend] = useState('');
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

  const [currentPage, setCurrentPage] = useState(
    propertyrentData?.current_page || 1,
  );

  useEffect(() => {
    if (searchAddress.length == 0) {
      setSearchAddressSend('');
    }
  }, [searchAddress]);

  useEffect(() => {
    setSearchAddress(searchAddressSend ? searchAddressSend : '');
  }, [searchAddressSend]);

  useEffect(() => {
    dispatch(propertiesrentpage(1, filter, propertyFor));
  }, [dispatch, filter, propertyFor, searchAddressSend]);
  const loadMoreData = () => {
    if (propertyrentData?.last_page > currentPage) {
      dispatch(propertiesrentpage(currentPage + 1, filter, propertyFor));
      setCurrentPage(currentPage + 1);
    }
  };
  console.log(propertyrentData)

  const renderFooter = () => {
    return (
      <View style={styles.footer}>
        {propertyrentData.loading && (
          <ActivityIndicator size="small" color="#000000" />
        )}
      </View>
    );
  };

  const filterCom = useCallback(
    (
      propertyrentData,
      searchAddressSend,
      property_type,
      propertyFor,
      setProperty_for,
      setFilter,
    ) => {
      return (
        <Filter
          max_price={propertyrentData?.max_price}
          min_price={propertyrentData?.min_price}
          property_type={propertyrentData?.property_type}
          title={propertyFor}
          location={searchAddressSend}
          ptype={property_type}
          setPtype={setProperty_type}
          pFor={propertyFor}
          setPfor={setProperty_for}
          callback={setFilter}
        />
      );
    },
    [searchAddressSend, property_type, propertyFor],
  );
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
    <View style={{backgroundColor: '#fff'}}>
      <View>
        <ScrollView
          style={{marginHorizontal: 20, marginTop: 10, flexGrow: 1}}
          horizontal={true}
          keyboardShouldPersistTaps={'always'}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            width: '100%',
          }}
          nestedScrollEnabled={true}>
          <GooglePlacesAutocomplete
            placeholder="Search"
            ref={ref => {
              ref?.setAddressText(searchAddress);
            }}
            listViewDisplayed={false}
            keepResultsAfterBlur={true}
            fetchDetails={true}
            textInputProps={{
              onChangeText: text => {
                setSearchAddress(text);
              },
              placeholderTextColor: '#000',
              color: '#000',
              backgroundColor: '#efecec61',
            }}
            onPress={(data, details = null) => {
              setSearchAddressSend(details.name);
            }}
            renderRow={rowData => {
              const title = rowData.structured_formatting.main_text;
              const address = rowData.structured_formatting.secondary_text;
              return (
                <View>
                  <Text style={{fontSize: 14, color: '#000'}}>{title}</Text>
                  <Text style={{fontSize: 14, color: '#000'}}>{address}</Text>
                </View>
              );
            }}
            query={{
              key: 'AIzaSyDxEmw9qvtFiT7LK8GbfLqyPgv3xN7YFZs',
              language: 'en', // Change language if desired
            }}
          />
        </ScrollView>
      </View>
      {filterCom(
        propertyrentData,
        searchAddressSend,
        property_type,
        propertyFor,
        setProperty_for,
        setFilter,
      )}
      {TopF(property_type, setProperty_type, propertyFor, setProperty_for)}
      <FlatList
        data={propertyrentData?.propertyrent || []}
        renderItem={({Property, item}) => (
          <PropertyListComponet
            Property={Property}
            item={item}
            navigation={navigation}
          />
        )}
        keyExtractor={(item, Property) => item.id + '' + Property}
        ItemSeparatorComponent={() => <View style={{height: 15}} />}
        ListHeaderComponent={() =>
          useCallback(
            <MapHeader
              title={propertyFor}
              coordinates={propertyrentData?.coordinates}
              navigation={navigation}
            />,
            [],
          )
        }
        onEndReached={loadMoreData}
        ListFooterComponent={renderFooter}
      />
      {!propertyrentData.loading &&
        propertyrentData?.propertyrent.length == 0 && (
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
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    marginBottom: 150,
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

export default Propertyrent;
