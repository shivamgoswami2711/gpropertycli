import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  ActivityIndicator,
  Modal,
  TextInput,
  FlatList,
  Alert,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import logo from '../../assets/logo.png';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Video from 'react-native-video';
import {useDispatch, useSelector} from 'react-redux';
import {
  contactForm,
  oneproperty,
  I_am_interested,
  Recently_view_check,
  I_amnt_interested,
} from '../../redux/actions/post';
import {useIsFocused} from '@react-navigation/native';
import MapView, {Marker} from 'react-native-maps';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const Post = ({route, navigation}) => {
  const postId = route.params.id;
  const [carouselIndex, setCarouselIndex] = useState(0);
  const videoRef = useRef(null);
  const {property, loading} = useSelector(state => state.post);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [carouseldata, setCarouseldata] = useState([]);

  const [contactModal, setContactModal] = useState(false);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [contactnumber, setContactnumber] = useState('');
  const [recentlyViewCheck, setrecentlyViewCheck] = useState([]);
  const {profile} = useSelector(state => state.user);
  const {recently_view_check} = useSelector(state => state.post);

  useEffect(() => {
    const imageData = data && data.images;
    if (imageData) {
      const images = JSON.parse(imageData).map(img => {
        return {
          type: 'image',
          source: {
            uri: `https://gpropertypay.com/public/uploads/${img.images}`,
          },
        };
      });
      const video =
        data && data.video
          ? [
              {
                type: 'video',
                source: {
                  uri: `https://gpropertypay.com/public/videos/${
                    data && data.video
                  }`,
                },
              },
            ]
          : [];
      setCarouseldata([...video, ...images]);
    }
  }, [property]);

  useEffect(() => {
    dispatch(
      Recently_view_check({
        id: profile.id,
        uid: profile.uid,
        property_id: postId,
      }),
    );
  }, [dispatch, postId]);

  useEffect(() => {
    setrecentlyViewCheck(recently_view_check);
  }, [recently_view_check]);

  const renderItem = ({item}) => {
    if (item.type === 'image') {
      return (
        <Image
          source={item.source}
          style={{
            height: 300,
            resizeMode: 'contain',
            backgroundColor: '#ccc',
            width: WIDTH,
          }}
        />
      );
    } else if (item.type === 'video') {
      return (
        <Video
          ref={videoRef}
          source={item.source}
          style={{height: 300, width: WIDTH, backgroundColor: '#ccc'}}
          useNativeControls
          paused={isFocused && carouselIndex !== 0}
          shouldPlay={carouselIndex === 0}
          pictureInPicture={true}
          resizeMode="contain"
        />
      );
    }
  };

  function formatDate() {
    const date = new Date(data && data.created_at);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  useEffect(() => {
    dispatch(oneproperty(postId));
  }, [dispatch, postId]);

  function formatNumber(number = 0) {
    if (number) {
      const abbreviations = {
        K: 1000,
        M: 1000000,
        B: 1000000000,
        T: 1000000000000,
      };

      for (const key in abbreviations) {
        if (number >= abbreviations[key]) {
          const formattedNumber = number / abbreviations[key];
          return formattedNumber.toFixed(0) + key;
        }
      }

      return number.toString();
    }
    return ' ';
  }
  if (loading) {
    return (
      <View>
        <ActivityIndicator size={20} />
      </View>
    );
  }
  function submitProfile() {
    if (name && address && contactnumber) {
      const data = {
        uid: profile.uid,
        property_id: postId,
        name,
        address,
        contact_number: contactnumber,
      };
      dispatch(contactForm(data));
      setContactModal(false);
      Alert.alert('Sended');
    } else {
      if (!name) Alert.alert('please enter name');
      if (!address) Alert.alert('please enter address');
      if (!contactnumber) Alert.alert('please enter number');
    }
  }

  function Interested() {
    if (recentlyViewCheck.length == 0) {
      const data = {
        uid: profile.uid,
        id: profile.id,
        property_id: postId,
      };
      dispatch(I_am_interested(data));
      setrecentlyViewCheck([{}]);
    } else {
      const data = {
        uid: profile.uid,
        id: profile.id,
        property_id: postId,
      };
      dispatch(I_amnt_interested(data));
      setrecentlyViewCheck([]);
    }
  }
  const data = property;

  return (
    <ScrollView style={styles.postContainer}>
      {/* corosuel */}
      <View style={styles.carouselCaontainer}>
        <FlatList
          horizontal={true}
          data={carouseldata}
          keyExtractor={(item, idex) => idex.toString()}
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          renderItem={renderItem}
        />
        
      </View>
      <View>
        {/* logo view */}
        <View style={styles.logoContainer}>
          <Image source={logo} style={styles.logo} />
          <View style={styles.ViewContainer}>
            {/* icon */}
            <AntDesign name="eye" size={24} color="black" />
            <Text style={styles.textcolor}>{data?.views}</Text>
          </View>
        </View>
        {/* contact */}
        <View>
          <Text style={styles.priceText}>
            {`${data && data.property_type} available for ${
              data && data.property_for
            } (₹${formatNumber(
              data && data?.expected_price === null
                ? data?.monthly_rent
                : data?.expected_price,
            )})`}
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => Interested()}
            style={[
              styles.button,
              {
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              },
            ]}>
            <AntDesign
              style={[styles.icons]}
              name={recentlyViewCheck.length == 0 ? 'hearto' : 'heart'}
              size={18}
              color={recentlyViewCheck.length == 0 ? '#fff' : '#f04305'}
            />
            <Text style={[styles.buttonText]}>
              {recentlyViewCheck.length == 0 ? 'save' : 'saved'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setContactModal(true)}
            style={styles.button}>
            <Text style={styles.buttonText}>contact</Text>
          </TouchableOpacity>
        </View>
        {/* info */}
        <View style={styles.infoContainer}>
          <Text style={styles.sizeText}>
            {data && data?.saleable_area}{' '}
            {data && data?.saleable_area_size_in == 'Feet'
              ? `sp/${data && data?.saleable_area_size_in}`
              : data && data?.saleable_area_size_in}
          </Text>
          <Text style={styles.location}>{data && data?.location}</Text>
        </View>

        {/* details */}
        <View>
          <Text style={styles.Title}>description</Text>
          {data && data.property_description && (
            <Text style={styles.descriptionText}>
              {data.property_description}
            </Text>
          )}
          <Text style={styles.Title}>
            Listed By {data && data.first_name}{' '}
            {`(${data && data.added_by_type})`}
          </Text>
        </View>
        <View style={styles.detailsContainer}>
          <View>
            {data?.property_type && (
              <View style={styles.textDetailsView}>
                <Text style={[styles.textDetails, styles.textcolor]}>
                  <FontAwesome5
                    style={styles.icons}
                    name="building"
                    size={18}
                    color="black"
                  />{' '}
                  Property Type:
                </Text>
                <Text style={styles.textcolor}>{data?.property_type}</Text>
              </View>
            )}
            {data?.possession_date && (
              <View style={styles.textDetailsView}>
                <Text style={styles.textcolor}>
                  <MaterialIcons
                    style={styles.icons}
                    name="date-range"
                    size={18}
                    color="black"
                  />{' '}
                  Possession Date:
                </Text>
                <Text style={styles.textcolor}>{formatDate()}</Text>
              </View>
            )}
            {data?.facing_side && (
              <View style={styles.textDetailsView}>
                <Text style={styles.textcolor}>
                  <MaterialCommunityIcons
                    style={styles.icons}
                    name="highway"
                    size={18}
                    color="black"
                  />{' '}
                  Facing Side:
                </Text>
                <Text style={styles.textcolor}>{data?.facing_side}</Text>
              </View>
            )}
            {data?.facing_road_width && (
              <View style={styles.textDetailsView}>
                <Text style={styles.textcolor}>
                  <MaterialCommunityIcons
                    name="greenhouse"
                    size={18}
                    color="black"
                  />{' '}
                  facing road width{`(${data.facing_road_width_in})`}:
                </Text>
                <Text style={styles.textcolor}>{data.facing_road_width}</Text>
              </View>
            )}
            {data?.open_side && (
              <View style={styles.textDetailsView}>
                <Text style={styles.textcolor}>
                  <MaterialCommunityIcons
                    style={styles.icons}
                    name="mailbox-open-up-outline"
                    size={18}
                    color="black"
                  />{' '}
                  Open Side:
                </Text>
                <Text style={styles.textcolor}>{data?.open_side || 0}</Text>
              </View>
            )}
            {data?.saleable_area && (
              <View style={styles.textDetailsView}>
                <Text style={styles.textcolor}>
                  <AntDesign
                    style={styles.icons}
                    name="areachart"
                    size={18}
                    color="black"
                  />{' '}
                  Area: 870sq/ft
                </Text>
                <Text style={styles.textcolor}>{data.saleable_area}</Text>
              </View>
            )}
            {data?.carpet_area && (
              <View style={styles.textDetailsView}>
                <Text style={styles.textcolor}>
                  <MaterialCommunityIcons
                    name="bed-queen-outline"
                    size={18}
                    color="black"
                  />{' '}
                  other_bedroom/{data.carpet_area_size_in}:
                </Text>
                <Text style={styles.textcolor}>{data.carpet_area}</Text>
              </View>
            )}
            {data?.expected_price_in_sqft && (
              <View style={styles.textDetailsView}>
                <Text style={styles.textcolor}>
                  <Entypo
                    style={styles.icons}
                    name="price-tag"
                    size={18}
                    color="black"
                  />{' '}
                  Price (in sq/ft):
                </Text>
                <Text style={styles.textcolor}>
                  {data.expected_price_in_sqft}
                </Text>
              </View>
            )}
            {data?.bathrooms && (
              <View style={styles.textDetailsView}>
                <Text style={styles.textcolor}>
                  <FontAwesome
                    style={styles.icons}
                    name="bathtub"
                    size={18}
                    color="black"
                  />{' '}
                  bathroom:
                </Text>
                <Text style={styles.textcolor}>{data.bathrooms}</Text>
              </View>
            )}
            {data?.beds && (
              <View style={styles.textDetailsView}>
                <Text style={styles.textcolor}>
                  <MaterialCommunityIcons
                    name="bed-queen-outline"
                    size={18}
                    color="black"
                  />{' '}
                  Beds:
                </Text>
                <Text style={styles.textcolor}>{data.beds}</Text>
              </View>
            )}
            {data?.wardrobe && (
              <View style={styles.textDetailsView}>
                <Text style={styles.textcolor}>
                  <MaterialCommunityIcons
                    name="wardrobe-outline"
                    size={18}
                    color="black"
                  />{' '}
                  Wardrobe:
                </Text>
                <Text style={styles.textcolor}>{data.wardrobe}</Text>
              </View>
            )}
            {data?.ac && (
              <View style={styles.textDetailsView}>
                <Text style={styles.textcolor}>
                  <Entypo name="progress-empty" size={18} color="black" /> ac:
                </Text>
                <Text style={styles.textcolor}>{data.ac}</Text>
              </View>
            )}
            {data?.tv && (
              <View style={styles.textDetailsView}>
                <Text style={styles.textcolor}>
                  <Entypo name="tv" size={18} color="black" /> tv:
                </Text>
                <Text style={styles.textcolor}>{data.tv}</Text>
              </View>
            )}
            {data?.balcony && (
              <View style={styles.textDetailsView}>
                <Text style={styles.textcolor}>
                  <MaterialCommunityIcons
                    name="balcony"
                    size={18}
                    color="black"
                  />{' '}
                  balcony:
                </Text>
                <Text style={styles.textcolor}>{data.balcony}</Text>
              </View>
            )}
            {data?.bedrooms && (
              <View style={styles.textDetailsView}>
                <Text style={styles.textcolor}>
                  <MaterialCommunityIcons
                    name="bed-queen-outline"
                    size={18}
                    color="black"
                  />{' '}
                  bedrooms:
                </Text>
                <Text style={styles.textcolor}>{data.bedrooms}</Text>
              </View>
            )}
            {data?.security_deposit && (
              <View style={styles.textDetailsView}>
                <Text style={styles.textcolor}>
                  <MaterialCommunityIcons
                    name="currency-rupee"
                    size={18}
                    color="black"
                  />{' '}
                  security deposit:
                </Text>
                <Text style={styles.textcolor}>{data.security_deposit}</Text>
              </View>
            )}
            {data?.booking_price && (
              <View style={styles.textDetailsView}>
                <Text style={styles.textcolor}>
                  <MaterialCommunityIcons
                    name="currency-rupee"
                    size={18}
                    color="black"
                  />{' '}
                  booking price:
                </Text>
                <Text style={styles.textcolor}>{data.booking_price}</Text>
              </View>
            )}
            {data?.maintance_charge && (
              <View style={styles.textDetailsView}>
                <Text style={styles.textcolor}>
                  <MaterialCommunityIcons
                    name="currency-rupee"
                    size={18}
                    color="black"
                  />{' '}
                  maintance charge:
                </Text>
                <Text style={styles.textcolor}>{data.maintance_charge}</Text>
              </View>
            )}
            {data?.available_from && (
              <View style={styles.textDetailsView}>
                <Text style={styles.textcolor}>
                  <MaterialCommunityIcons
                    name="calendar"
                    size={18}
                    color="black"
                  />{' '}
                  available from:
                </Text>
                <Text style={styles.textcolor}>{data.available_from}</Text>
              </View>
            )}
            {data &&
              data.property_for == 'rent' &&
              JSON.parse(data.room_data)[0].no_of_rooms && (
                <View style={{paddingVertical: 20}}>
                  <Text
                    style={{
                      fontSize: 18,
                      textTransform: 'capitalize',
                      color: '#000',
                      padding: 20,
                      borderTopWidth: 1,
                      borderColor: '#ccc',
                      fontWeight: 800,
                    }}>
                    room Data
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                      marginHorizontal: 10,
                      paddingBottom: 10,
                    }}>
                    <Text style={{fontWeight: 'bold', color: '#000'}}>
                      Room Type
                    </Text>
                    <Text style={{fontWeight: 'bold', color: '#000'}}>
                      Number Of Rooms
                    </Text>
                    <Text style={{fontWeight: 'bold', color: '#000'}}>
                      Price
                    </Text>
                    <Text style={{fontWeight: 'bold', color: '#000'}}>
                      Remove
                    </Text>
                  </View>
                  {data.room_data &&
                    JSON.parse(data.room_data).map((item, idx) => (
                      <View style={styles.room_dataStyle} key={idx}>
                        <Text style={{color: '#000'}}>{item.room_type}</Text>
                        <Text style={{color: '#000'}}>{item.no_of_rooms}</Text>
                        <Text style={{color: '#000'}}>{item.price}</Text>
                      </View>
                    ))}
                </View>
              )}
            <Text
              style={{
                fontSize: 18,
                textTransform: 'capitalize',
                color: '#000',
                padding: 20,
                borderTopWidth: 1,
                borderColor: '#ccc',
                fontWeight: 800,
              }}>
              additional
            </Text>
            {data?.additional_facility && (
              <View style={[styles.textDetailsView, {flexDirection: 'column'}]}>
                <Text style={styles.textcolor}>
                  <AntDesign name="star" size={18} color="black" /> additional
                  facility:
                </Text>
                <Text style={[styles.textcolor, {marginTop: 10}]}>
                  {data.additional_facility.replaceAll(',', ',  ')}
                </Text>
              </View>
            )}
            {data?.property_status && (
              <View style={styles.textDetailsView}>
                <Text style={styles.textcolor}>
                  <AntDesign name="star" size={18} color="black" /> property
                  status:
                </Text>
                <Text style={styles.textcolor}>
                  {data.property_status.replaceAll('_', ' ')}
                </Text>
              </View>
            )}
            {data?.furnishing_status && (
              <View style={styles.textDetailsView}>
                <Text style={styles.textcolor}>
                  <MaterialCommunityIcons
                    name="bed-queen-outline"
                    size={18}
                    color="black"
                  />{' '}
                  furnishing status:
                </Text>
                <Text style={styles.textcolor}>
                  {data.furnishing_status.replaceAll('_', ' ')}
                </Text>
              </View>
            )}
            {data?.property_age && (
              <View style={styles.textDetailsView}>
                <Text style={styles.textcolor}>
                  <MaterialCommunityIcons
                    name="timer-sand"
                    size={18}
                    color="black"
                  />{' '}
                  property age:
                </Text>
                <Text style={styles.textcolor}>{data.property_age} Year</Text>
              </View>
            )}
            {data?.car_parking_open && (
              <View style={styles.textDetailsView}>
                <Text style={styles.textcolor}>
                  <MaterialCommunityIcons
                    name="parking"
                    size={18}
                    color="black"
                  />{' '}
                  car parking open:
                </Text>
                <Text style={styles.textcolor}>{data.car_parking_open}</Text>
              </View>
            )}
            {data?.car_parking_close && (
              <View style={styles.textDetailsView}>
                <Text style={styles.textcolor}>
                  <MaterialCommunityIcons
                    name="parking"
                    size={18}
                    color="black"
                  />{' '}
                  car parking close:
                </Text>
                <Text style={styles.textcolor}>{data.car_parking_close}</Text>
              </View>
            )}
            {data?.floor && (
              <View style={styles.textDetailsView}>
                <Text style={styles.textcolor}>
                  <MaterialCommunityIcons
                    name="home-floor-g"
                    size={18}
                    color="black"
                  />{' '}
                  floor:
                </Text>
                <Text style={styles.textcolor}>{data.floor}</Text>
              </View>
            )}
            {data?.total_floor && (
              <View style={styles.textDetailsView}>
                <Text style={styles.textcolor}>
                  <MaterialCommunityIcons
                    name="home-floor-g"
                    size={18}
                    color="black"
                  />{' '}
                  total floor:
                </Text>
                <Text style={styles.textcolor}>{data.total_floor}</Text>
              </View>
            )}
            {data?.open_side && (
              <View style={styles.textDetailsView}>
                <Text style={styles.textcolor}>
                  <MaterialCommunityIcons
                    name="mailbox-open"
                    size={18}
                    color="black"
                  />{' '}
                  open_side:
                </Text>
                <Text style={styles.textcolor}>{data.open_side}</Text>
              </View>
            )}
            {data?.overlooking && (
              <View style={[styles.textDetailsView, {flexDirection: 'column'}]}>
                <Text style={styles.textcolor}>
                  <MaterialCommunityIcons
                    name="looks"
                    size={18}
                    color="black"
                  />{' '}
                  overlooking:
                </Text>
                <Text style={[styles.textcolor, {marginTop: 10}]}>
                  {data.overlooking.replaceAll(',', ',  ')}
                </Text>
              </View>
            )}
            <Text
              style={{
                fontSize: 18,
                textTransform: 'capitalize',
                color: '#000',
                padding: 20,
                borderTopWidth: 1,
                borderColor: '#ccc',
                fontWeight: 800,
              }}>
              tenants
            </Text>
            {data?.ownershiptype && (
              <View style={styles.textDetailsView}>
                <Text style={styles.textcolor}>
                  <AntDesign name="user" size={18} color="black" /> ownership:
                </Text>
                <Text style={styles.textcolor}>
                  {data.ownershiptype.replaceAll('_', ' ')}
                </Text>
              </View>
            )}
            {data?.preferred_tenants && (
              <View style={styles.textDetailsView}>
                <Text style={styles.textcolor}>
                  <Entypo name="user" size={18} color="black" /> preferred
                  tenants:
                </Text>
                <Text style={styles.textcolor}>{data.preferred_tenants}</Text>
              </View>
            )}
            {data?.gender_preference && (
              <View style={styles.textDetailsView}>
                <Text style={styles.textcolor}>
                  <Entypo name="user" size={18} color="black" /> gender
                  preference:
                </Text>
                <Text style={styles.textcolor}>{data.gender_preference}</Text>
              </View>
            )}
            {data?.maximum_tentants_allowed && (
              <View style={styles.textDetailsView}>
                <Text style={styles.textcolor}>
                  <Entypo name="user" size={18} color="black" /> maximum
                  tentants allowed:
                </Text>
                <Text style={styles.textcolor}>
                  {data.maximum_tentants_allowed}
                </Text>
              </View>
            )}
            {data?.work_preference && (
              <View style={styles.textDetailsView}>
                <Text style={styles.textcolor}>
                  <Entypo name="user" size={18} color="black" /> work
                  preference:
                </Text>
                <Text style={styles.textcolor}>{data.work_preference}</Text>
              </View>
            )}
            {data?.food_preference && (
              <View style={styles.textDetailsView}>
                <Text style={styles.textcolor}>
                  <Entypo name="user" size={18} color="black" /> food
                  preference:
                </Text>
                <Text style={styles.textcolor}>{data.food_preference}</Text>
              </View>
            )}
            {data?.expected_duration_of_stay && (
              <View style={[styles.textDetailsView, {flexDirection: 'column'}]}>
                <Text style={styles.textcolor}>
                  <Entypo name="user" size={18} color="black" /> expected
                  duration of stay:
                </Text>
                <Text style={[styles.textcolor, {marginTop: 10}]}>
                  {data.expected_duration_of_stay}
                </Text>
              </View>
            )}
            {data?.special_requirement && (
              <View style={[styles.textDetailsView, {flexDirection: 'column'}]}>
                <Text style={styles.textcolor}>
                  <Entypo name="text-document" size={18} color="black" />{' '}
                  requirement:
                </Text>
                <Text style={[styles.textcolor, {marginTop: 10}]}>
                  {data.special_requirement}
                </Text>
              </View>
            )}
            <Text
              style={{
                fontSize: 18,
                textTransform: 'capitalize',
                color: '#000',
                padding: 20,
                borderTopWidth: 1,
                borderColor: '#ccc',
                fontWeight: 800,
              }}>
              Flooring
            </Text>
            {data?.living_room && (
              <View style={styles.textDetailsView}>
                <Text style={styles.textcolor}>
                  <Entypo name="colours" size={18} color="black" /> living room:
                </Text>
                <Text style={styles.textcolor}>{data.living_room}</Text>
              </View>
            )}
            {data?.kitchen && (
              <View style={styles.textDetailsView}>
                <Text style={styles.textcolor}>
                  <Entypo name="colours" size={18} color="black" /> kitchen:
                </Text>
                <Text style={styles.textcolor}>{data.kitchen}</Text>
              </View>
            )}
            {data?.master_bedroom && (
              <View style={[styles.textDetailsView, {flexDirection: 'column'}]}>
                <Text style={styles.textcolor}>
                  <Entypo name="colours" size={18} color="black" /> master
                  bedroomm
                </Text>
                <Text style={[styles.textcolor, {marginTop: 10}]}>
                  {data.master_bedroom}
                </Text>
              </View>
            )}
            {data?.bathroom && (
              <View style={styles.textDetailsView}>
                <Text style={styles.textcolor}>
                  <Entypo name="colours" size={18} color="black" /> bathroom:
                </Text>
                <Text style={styles.textcolor}>{data.bathroom}</Text>
              </View>
            )}
            {data?.balcony && (
              <View style={styles.textDetailsView}>
                <Text style={styles.textcolor}>
                  <Entypo name="colours" size={18} color="black" /> balcony:
                </Text>
                <Text style={styles.textcolor}>{data.balcony}</Text>
              </View>
            )}
            {data?.other_bedroom && (
              <View style={[styles.textDetailsView, {flexDirection: 'column'}]}>
                <Text style={styles.textcolor}>
                  <Entypo name="colours" size={18} color="black" /> other
                  bedroom:
                </Text>
                <Text style={[styles.textcolor, {marginTop: 10}]}>
                  {data.other_bedroom}
                </Text>
              </View>
            )}
          </View>
        </View>
      </View>
      {/* map */}
      <View>
        <Text
          style={{
            fontSize: 18,
            textTransform: 'capitalize',
            color: '#000',
            padding: 20,
            borderTopWidth: 1,
            borderColor: '#ccc',
            fontWeight: 800,
          }}>
          location
        </Text>
        {data && (
          <MapView
            style={styles.map}
            region={{
              latitude: parseFloat(data.lat), // Replace with the latitude of the point
              longitude: parseFloat(data.long), // Replace with the desired longitude
              latitudeDelta: 0.007922,
              longitudeDelta: 0.000421,
            }}>
            <Marker
              coordinate={{
                latitude: parseFloat(data.lat),
                longitude: parseFloat(data.long),
              }}
            />
          </MapView>
        )}
      </View>
      <Modal visible={contactModal} transparent={true} animationType="slide">
        <TouchableOpacity
          TouchableOpacity={0}
          style={styles.modalCantainer}
          onPress={() => setContactModal(false)}>
          <View style={styles.modalBottomCantainer}>
            <View>
              <View style={styles.profileImgCantainer}></View>
            </View>
            <View style={styles.emailCaintainer}>
              <Text style={styles.inputLabal}>Name</Text>
              <TextInput
                placeholder="Name"
                placeholderTextColor={'#ccc'}
                style={styles.inputEmailFild}
                defaultValue={name}
                onChangeText={value => setName(value)}
              />
            </View>
            <View style={styles.emailCaintainer}>
              <Text style={styles.inputLabal}>Address</Text>
              <TextInput
                placeholder="Last Name"
                placeholderTextColor={'#ccc'}
                style={styles.inputEmailFild}
                value={address}
                onChangeText={value => setAddress(value)}
              />
            </View>
            <View style={styles.emailCaintainer}>
              <Text style={styles.inputLabal}>Contact number</Text>
              <TextInput
                placeholder="Contact number"
                placeholderTextColor={'#ccc'}
                style={styles.inputEmailFild}
                keyboardType="phone-pad"
                value={contactnumber}
                onChangeText={value => setContactnumber(value)}
              />
            </View>
            <View>
              <TouchableOpacity
                style={styles.contactSubmit}
                onPress={() => submitProfile()}>
                <Text style={styles.buttonText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  textDetailsView: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 30,
    padding: 10,
  },
  room_dataStyle: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    borderRadius: 8,
    marginBottom: 4,
    marginHorizontal: 5,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 3,
  },
  textcolor: {
    color: '#000',
    fontSize: 18,
  },
  modalCantainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalBottomCantainer: {
    height: 420,
    backgroundColor: '#f2f2f2',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 3,
      height: -10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  postContainer: {
    marginHorizontal: 5,
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
  contactSubmit: {
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
  Title: {
    fontSize: 18,
    marginLeft: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    marginLeft: 20,
    color: '#000',
  },
  descriptionText: {
    marginLeft: 20,
  },
  logoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 0,
    alignItems: 'center',
    marginHorizontal: 10,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  ViewContainer: {
    marginRight: 16,
    color: '#000',
  },
  map: {
    height: 180,
    width: WIDTH - 30,
    marginHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginBottom: 10,
  },
  logo: {
    width: 150,
    height: 100,
    resizeMode: 'contain',
  },
  priceText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 16,
    marginBottom: 20,
    color: '#000',
    textTransform: 'capitalize',
  },
  button: {
    padding: 12,
    backgroundColor: '#1E90FF',
    borderRadius: 8,
    width: 150,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  detailsContainer: {
    marginLeft: 20,
    color: '#000',
  },
  infoContainer: {
    paddingTop: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  icons: {
    paddingRight: 10,
  },
  sizeText: {
    marginLeft: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  location: {
    marginLeft: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  detailTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingVertical: 10,
    textTransform: 'capitalize',
    color: '#000',
  },
  carouselCaontainer: {
    // borderWidth: 1,
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    resizeMode: 'contain',
  },
  video: {
    width: '100%',
    height: 300,
    borderRadius: 10,
  },
});

export default Post;
