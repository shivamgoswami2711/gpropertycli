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
import profilepic from '../../assets/profile.jpg';
import {useDispatch, useSelector} from 'react-redux';
import {recentlyView} from '../../redux/actions/user';

const PropertyView = ({navigation}) => {
  const dispatch = useDispatch();
  const [pageNumber, setPageNumber] = useState(1);
  const {profile, recentlyViewData} = useSelector(state => state.user);

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
          style={{color: '#fff', fontSize: 20, textTransform: 'capitalize'}}>
          recently view
        </Text>
        <View></View>
      </View>
      <View>
        <FlatList
          style={{marginTop: 20}}
          data={recentlyViewData}
          onEndReached={loadMoreData}
          ItemSeparatorComponent={() => <View style={{height: 15}} />}
          renderItem={(item, index) => (
            <View key={index} style={styles.ViewCantainer}>
              <View>
                <Image style={styles.profilePic} source={profilepic} />
              </View>
              <View>
                <Text style={styles.text}>{item.name}</Text>
                <Text style={styles.text}>{item.address}</Text>
                <TouchableOpacity
                  onPress={() => Linking.openURL(`tel:${item.contact_number}`)}>
                  <Text style={styles.text}>
                    {item.contact_number}{' '}
                    <Ionicons
                      name="call-outline"
                      style={{padding: 10, marginLeft: 5}}
                      size={20}
                      color="#000"
                    />
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default PropertyView;

const styles = StyleSheet.create({
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
