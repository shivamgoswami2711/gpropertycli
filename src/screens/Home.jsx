// import React, { useEffect, useMemo, useCallback } from "react";
// import {
//   View,
//   Text,
//   ScrollView,
//   Image,
//   StyleSheet,
//   FlatList,
//   ActivityIndicator,
//   TouchableOpacity,
// } from "react-native";
// // import { useDispatch, useSelector } from "react-redux";
// // import { propertyHome } from "../redux/actions/home";
// // import { useRouter } from "expo-router";
// // import FlatlistComponent from "../../component/FlatlistSmailCard";

// const Home = () => {
// //   const home = useSelector((state) => state.home);
// //   const dispatch = useDispatch();
// //   const router = useRouter();

// //   useEffect(() => {
// //     const type = ["sell", "rent"];
// //     type.forEach((type) => dispatch(propertyHome(type)));
// //   }, [dispatch]);

// //   const renderFooter = useCallback(() => {
// //     if (!home?.loading) return null;

// //     return (
// //       <View style={styles.footer}>
// //         <ActivityIndicator size="small" color="#000000" />
// //       </View>
// //     );
// //   }, [home?.loading]);

import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  View,
} from 'react-native';
import React, {useCallback} from 'react';
import skyline from '../../assets/skyline.jpg';
import housebuy from '../../assets/housebuy.png';
import housereant from '../../assets/housereant.png';
import housesale from '../../assets/housesale.png';

const Home = ({navigation}) => {
  
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
      <View style={styles.addNewButtonContainer}>
        <TouchableOpacity style={styles.addNewButton}></TouchableOpacity>
      </View>
      <ScrollView>
        <View style={styles.container}>
          <Image source={skyline} style={styles.backgroundImage} />
          <View style={styles.cardContainer}>
            <View style={styles.card}>
              <TouchableOpacity onPress={console.log('hello')}>
                <View style={styles.menuContainer}>
                  <Image source={housebuy} style={styles.menuIcon} />
                  <Text style={styles.menuTitle}>{`Buy \nproperty`}</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={console.log('hello')}>
                <View style={styles.menuContainer}>
                  <Image source={housereant} style={styles.menuIcon} />
                  <Text style={styles.menuTitle}>{`Rent \nproperty`}</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('Sell')}>
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
            {/* <FlatList
              style={styles.FlatListStyle}
              data={home?.property?.sell}
              renderItem={({index, item}) => (
                <FlatlistComponent
                  index={index}
                  item={item}
                  router={RouterFunc}
                />
              )}
              horizontal={true}
              keyExtractor={item => item.id}
              ListFooterComponent={renderFooter}
              ItemSeparatorComponent={() => (
                <View style={{width: 15, height: '100%'}} />
              )}
              ListHeaderComponent={() => <View style={{width: 12}} />}
            /> */}
          </View>
          <View style={styles.horizontalListContainer}>
            <View style={styles.horizontalListTextContainer}>
              <Text style={styles.horizontalListText}>Rent property</Text>
            </View>
            {/* <FlatList
              data={home?.property?.rent}
              renderItem={({index, item}) => (
                <FlatlistComponent index={index} item={item} router={router} />
              )}
              ListFooterComponent={renderFooter}
              horizontal={true}
              keyExtractor={item => item.id}
              ItemSeparatorComponent={() => (
                <View style={{width: 10, height: '100%'}} />
              )}
              ListHeaderComponent={() => <View style={{width: 12}} />}
            /> */}
          </View>
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
  addNewButtonContainer: {
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    position: 'absolute',
    right: 30,
    bottom: 50,
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
});