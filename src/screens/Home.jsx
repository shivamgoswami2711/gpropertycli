import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  View,
  FlatList,
} from 'react-native';
import React, {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import skyline from '../../assets/skyline.jpg';
import housebuy from '../../assets/housebuy.png';
import housereant from '../../assets/housereant.png';
import housesale from '../../assets/housesale.png';
import FlatlistComponent from '../component/FlatlistSmailCard';
import {propertyHome} from '../../redux/actions/home';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = ({navigation}) => {
  const home = useSelector(state => state.home);
  const property = useSelector(state => state.property);
  const dispatch = useDispatch();


  // useEffect(() => {
  //   const propileCheck = async () => {
  //     const profileData = await AsyncStorage.getItem('profile');
  //     if (!profileData) {
  //       console.log("hello me tha guru")
  //       console.log(profileData)
  //       await AsyncStorage.removeItem('uid');
  //       navigation.dispatch(navigation.push('Login'));
  //     }
  //   };
  //   setTimeout(() => {
  //     propileCheck()
  //   }, 100);
  // }, []);

  useEffect(() => {
    const type = ['sell', 'rent'];
    type.forEach(type => dispatch(propertyHome(type)));
  }, [dispatch]);

  const renderFooter = useCallback(() => {
    if (!home?.loading) return null;

    return (
      <View style={styles.footer}>
        <ActivityIndicator size="small" color="#000000" />
      </View>
    );
  });

  return (
    <View>
      {property.uploading && (
        <View
          style={{
            height: 35,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#454b52',
          }}>
          <Text style={{fontSize: 16, color: '#ff9e3d'}}>Uploading......</Text>
        </View>
      )}
      <ScrollView>
        <View style={styles.container}>
          <Image source={skyline} style={styles.backgroundImage} />
          <View style={styles.cardContainer}>
            <View style={styles.card}>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() =>
                  navigation.navigate('Property', {property_for: 'buy'})
                }>
                <View style={styles.menuContainer}>
                  <Image source={housebuy} style={styles.menuIcon} />
                  <Text style={styles.menuTitle}>{`Buy \nproperty`}</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() =>
                  navigation.navigate('Property', {property_for: 'rent'})
                }>
                <View style={styles.menuContainer}>
                  <Image source={housereant} style={styles.menuIcon} />
                  <Text style={styles.menuTitle}>{`Rent \nproperty`}</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => navigation.navigate('Sell')}>
                <View style={styles.menuContainer}>
                  <Image source={housesale} style={styles.menuIcon} />
                  <Text style={styles.menuTitle}>{`Sell \nproperty`}</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View>
          <View style={styles.horizontalListContainer}>
            <View style={styles.horizontalListTextContainer}>
              <Text style={styles.horizontalListText}>Buy property</Text>
            </View>
            <FlatList
              style={styles.FlatListStyle}
              data={home?.property?.sell}
              renderItem={({index, item}) => (
                <FlatlistComponent
                  index={index}
                  item={item}
                  router={navigation}
                />
              )}
              horizontal={true}
              keyExtractor={item => item.id}
              ListFooterComponent={renderFooter}
              ItemSeparatorComponent={() => (
                <View style={{width: 15, height: '100%'}} />
              )}
              ListHeaderComponent={() => <View style={{width: 12}} />}
            />
          </View>
          <View style={styles.horizontalListContainer}>
            <View style={styles.horizontalListTextContainer}>
              <Text style={styles.horizontalListText}>Rent property</Text>
            </View>
            <FlatList
              data={home?.property?.rent}
              renderItem={({index, item}) => (
                <FlatlistComponent
                  index={index}
                  item={item}
                  router={navigation}
                />
              )}
              ListFooterComponent={renderFooter}
              horizontal={true}
              navigation={item => item.id}
              ItemSeparatorComponent={() => (
                <View style={{width: 10, height: '100%'}} />
              )}
              ListHeaderComponent={() => <View style={{width: 12}} />}
            />
          </View>
        </View>
        <View style={[styles.container, {height: 120}]}>
          <Image
            source={{uri: 'https://gpropertypay.com/public/assets/footer.jpg'}}
            style={styles.backgroundImage}
          />
          <View style={styles.cardContainer}></View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 270,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  cardContainer: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  menuContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
    marginHorizontal: 20,
  },
  menuIcon: {
    width: 45,
    height: 45,
    marginRight: 12,
    marginBottom: 5,
  },
  menuTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    lineHeight: 16,
    color: '#000',
  },
  horizontalListContainer: {
    paddingVertical: 5,
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
});
