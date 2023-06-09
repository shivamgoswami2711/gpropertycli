import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import logo from '../../assets/logo.png';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Video from 'react-native-video';
import {useDispatch, useSelector} from 'react-redux';
import {oneproperty} from '../../redux/actions/post';
import {useIsFocused} from '@react-navigation/native';
import {BackHandler} from 'react-native';
import MapView, {Marker} from 'react-native-maps';

const WIDTH = Dimensions.get('window').width;

const Post = ({route, navigation}) => {
  const postId = route.params.id;
  const [carouselIndex, setCarouselIndex] = useState(0);
  const videoRef = useRef(null);
  const propertyData = useSelector(state => state.post);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [carouseldata, setCarouseldata] = useState([]);

  const property = propertyData && propertyData.property;
  const data = property && property[0];

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
  }, [propertyData]);

  const renderItem = ({item}) => {
    if (item.type === 'image') {
      return <Image source={item.source} style={styles.image} />;
    } else if (item.type === 'video') {
      return (
        <Video
          ref={videoRef}
          source={item.source}
          style={styles.video}
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

  // useEffect(() => {
  //   const backAction = () => {
  //     navigation.goBack(); // Navigate to the previous screen
  //     return true; // Return true to indicate that the back action is handled
  //   };

  //   const backHandler = BackHandler.addEventListener(
  //     "hardwareBackPress",
  //     backAction
  //   );

  //   return () => backHandler.remove(); // Clean up the event listener when the component is unmounted
  // }, [router]);

  useEffect(() => {
    dispatch(oneproperty(postId));
  }, [dispatch, postId]);

  // useEffect(() => {
  //   if (isFocused) {
  //     videoRef.current?.playAsync();
  //   } else {
  //     videoRef.current?.pauseAsync();
  //   }
  // }, [isFocused]);

  // useEffect(() => {
  //   if (carouselIndex !== 0) {
  //     videoRef.current?.pauseAsync();
  //   }
  // }, [carouselIndex]);

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
  if (propertyData.loading) {
    return (
      <View>
        <ActivityIndicator size={20} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.postContainer}>
      {/* corosuel */}
      <View style={styles.carouselCaontainer}>
        <Carousel
          layout={'default'}
          layoutCardOffset={0}
          data={carouseldata}
          renderItem={renderItem}
          onSnapToItem={Post => setCarouselIndex(Post)}
          sliderWidth={WIDTH}
          itemWidth={WIDTH - 20}
          enableSnap
          snapToInterval={WIDTH - 60}
          decelerationRate="fast"
        />
        <Pagination
          dotsLength={carouseldata.length}
          activeDotIndex={carouselIndex}
          containerStyle={{
            marginTop: -20,
          }}
          dotStyle={{
            width: 10,
            height: 10,
            borderRadius: 5,
            marginHorizontal: 8,
            backgroundColor: 'rgba(163, 162, 162,1)',
          }}
          inactiveDotStyle={{
            width: 10,
            height: 10,
            borderRadius: 5,
            marginHorizontal: 8,
            backgroundColor: 'black',
          }}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
        />
      </View>
      {/* logo view */}
      <View style={styles.logoContainer}>
        <Image source={logo} style={styles.logo} />
        <View style={styles.ViewContainer}>
          {/* icon */}
          <AntDesign name="eye" size={24} color="black" />
          <Text style={{color: '#000'}}>270</Text>
        </View>
      </View>
      {/* contact */}
      <View>
        <Text style={styles.priceText}>
          {`₹ ${formatNumber(
            data && data?.expected_price === null
              ? data?.monthly_rent
              : data?.expected_price,
          )}`}
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => console.log('heloo')}
          style={styles.button}>
          <Text style={styles.buttonText}>i am interested</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => console.log('heloo')}
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
      {/* map */}
      <View>
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

      {/* details */}
      <View>
        <Text style={styles.Title}>description</Text>
        {data && data.property_description && (
          <Text style={styles.descriptionText}>
            {data.property_description}
          </Text>
        )}
        <Text style={styles.Title}>Listed By Laxmi Uike</Text>
      </View>
      <View style={styles.detailsContainer}>
        <View>
          <Text style={[styles.textDetails, {color: '#000'}]}>
            <FontAwesome5
              style={styles.icons}
              name="building"
              size={18}
              color="black"
            />{' '}
            Property Type: {data && data?.property_type}
          </Text>
          <Text style={{color: '#000'}}>
            <MaterialIcons
              style={styles.icons}
              name="date-range"
              size={18}
              color="black"
            />{' '}
            Possession Date: {formatDate()}
          </Text>
          <Text style={{color: '#000'}}>
            <MaterialCommunityIcons
              style={styles.icons}
              name="highway"
              size={18}
              color="black"
            />{' '}
            Facing Side: West
          </Text>
          <Text style={{color: '#000'}}>
            <MaterialCommunityIcons
              style={styles.icons}
              name="mailbox-open-up-outline"
              size={18}
              color="black"
            />{' '}
            Open Side: {(data && data?.open_side) || 0}
          </Text>
          <Text style={{color: '#000'}}>
            <AntDesign
              style={styles.icons}
              name="areachart"
              size={18}
              color="black"
            />{' '}
            Area: 870sq/ft
          </Text>
          <Text style={{color: '#000'}}>
            <Entypo
              style={styles.icons}
              name="price-tag"
              size={18}
              color="black"
            />{' '}
            Price (in sq/ft): 6896
          </Text>
          <Text style={{color: '#000'}}>
            <FontAwesome
              style={styles.icons}
              name="bathtub"
              size={18}
              color="black"
            />{' '}
            bathroom: {(data && data?.bathrooms) || 0}
          </Text>
          <Text style={{color: '#000'}}>
            <MaterialCommunityIcons
              name="bed-queen-outline"
              size={18}
              color="black"
            />{' '}
            Beds: {(data && data?.beds) || 0}
          </Text>
          <Text style={{color: '#000'}}>
            <MaterialCommunityIcons
              name="wardrobe-outline"
              size={18}
              color="black"
            />{' '}
            Wardrobe: 0
          </Text>
          <Text style={{color: '#000'}}>
            <MaterialCommunityIcons name="balcony" size={18} color="black" />{' '}
            balcony: 2
          </Text>
          <Text style={{color: '#000'}}>
            <MaterialCommunityIcons
              name="bed-queen-outline"
              size={18}
              color="black"
            />{' '}
            Bedroom: {data && data?.bedrooms}
          </Text>
        </View>
      </View>
      {/* post */}
      <View></View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  postContainer: {
    marginHorizontal: 5,
    marginVertical: 20,
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
    marginTop: -30,
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
