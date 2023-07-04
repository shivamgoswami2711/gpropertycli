import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import React, {memo} from 'react';
import Icon from 'react-native-vector-icons/Fontisto';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import profile from '../../assets/profile.jpg';
import logo from '../../assets/logo.png';

const FlatlistComponent = ({index, item, router}) => {
  function formatDate() {
    const date = new Date(item.created_at);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

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

  return (
    <TouchableOpacity
      style={{
        marginVertical: 8,
      }}
      activeOpacity={0.5}
      onPress={() => router.navigate(`Post`, {id: item.id})}>
      <View key={index} style={styles.FlatlistComponent}>
        <View style={styles.profileContainer}>
          <Text style={styles.propertyType}>
            {item.property_type} (
            {`₹${formatNumber(
              item.expected_price === null
                ? item?.monthly_rent
                : item?.expected_price,
            )}`}
            )
          </Text>
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
        </View>
        <View style={styles.detailContainer}>
          {item.image ? (
            <Image
              style={styles.propertyPic}
              source={{
                uri: `https://gpropertypay.com/public/uploads/${item.image}`,
              }}
            />
          ) : (
            <Image style={styles.propertyPic} source={logo} />
          )}
          <View>
            <Text
              numberOfLines={5}
              ellipsizeMode="tail"
              style={styles.detailText}>
              <EvilIcons name="location" size={13} color="#900" />
              {item.location}
            </Text>
            <Text style={styles.dimenSionText}>
              {item.saleable_area}{' '}
              {item.saleable_area_size_in === 'Feet'
                ? 'sq/' + item.saleable_area_size_in
                : item.saleable_area_size_in}
            </Text>
          </View>
        </View>
        <View style={styles.dateContainer}>
          {item.bedrooms && (
            <Text style={styles.dateContainerText}>
              {item.bedrooms} Bedroom
            </Text>
          )}
          {item.bathrooms && (
            <Text style={styles.dateContainerText}>
              {item.bathrooms} Bathroom
            </Text>
          )}
          <Text style={styles.dateContainerText}>
            <Icon name="date" size={12} color="#900" /> {formatDate()}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  FlatlistComponent: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: 280,
  },
  profileContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderColor: '#ccc',
  },
  propertyType: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  profilePic: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginLeft: 16,
  },
  detailContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
    marginTop: 5,
  },
  propertyPic: {
    width: '55%',
    height: 100,
    borderRadius: 6,
    resizeMode: 'cover',
  },
  detailText: {
    width: 100,
    height: 80,
    fontSize: 12,
    color: '#000',
  },
  dimenSionText: {
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    marginTop: 5,
    color: '#000',
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
  },
  dateContainerText: {
    fontSize: 10,
    marginTop: 5,
    color: '#000',
  },
});
export default memo(FlatlistComponent);
