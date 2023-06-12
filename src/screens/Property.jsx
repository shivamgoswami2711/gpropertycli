import React, {memo, useEffect, useCallback, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import profile from '../../assets/profile.jpg';
import logo from '../../assets/logo.png';
import Filter from '../../component/Filter';
import MapHeader from '../component/MapHeader';
import {propertiespage} from '../../redux/actions/properties';
import Icon from 'react-native-vector-icons/Fontisto';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MapView, {Marker} from 'react-native-maps';
import {StackActions} from '@react-navigation/native';

function formatNumber(num = 0) {
  if (num) {
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'G';
    }
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
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
        }, 150);
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
            {item?.property_type} {item?.property_for}{' '}
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
            <Text style={styles.dimenSionText}>1000 sq/Feet</Text>
          </View>
        </View>
        <View style={styles.imgandDateContainer}>
          <Image style={styles.profilePic} source={profile} />
          <Text style={styles.dateContainerText}>
            <Icon name="date" size={12} color="#900" /> {formatDate()}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
});

const Property = ({route, navigation}) => {
  const {property_for} = route.params;
  const {address} = route.params;
  const dispatch = useDispatch();
  const [filter, setFilter] = useState({});
  const propertyData = useSelector(state => state.property);
  const [searchAddress, setSearchAddress] = useState(address);
  const [currentPage, setCurrentPage] = useState(
    propertyData?.current_page || 1,
  );

  useEffect(() => {
    dispatch(propertiespage(1, filter, property_for));
  }, [dispatch, filter, property_for]);

  const loadMoreData = () => {
    if (propertyData?.last_page > currentPage) {
      dispatch(propertiespage(currentPage + 1, filter, property_for));
      setCurrentPage(currentPage + 1);
    }
  };

  const renderFooter = () => {
    if (!propertyData.loading) return null;

    return (
      <View style={styles.footer}>
        <ActivityIndicator size="small" color="#000000" />
      </View>
    );
  };

  return (
    <View>
      <Filter
        max_price={propertyData?.max_price}
        min_price={propertyData?.min_price}
        property_type={propertyData?.property_type}
        title={property_for}
        callback={setFilter}
      />

      <FlatList
        data={propertyData?.property || []}
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
              title={property_for}
              coordinates={propertyData?.coordinates}
              navigation={navigation}
            />,
            [],
          )
        }
        onEndReached={loadMoreData}
        ListFooterComponent={renderFooter}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
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
    textTransform: 'capitalize',
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

export default Property;
