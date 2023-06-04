import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  Modal,
  Button,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import React, {useState} from 'react';
  import TypeOfProperty from "../component/TypeOfProperty";
import {
  BedroomsNumber,
  typeofName,
  materialType,
  sizeData,
  FacingSide,
  RoomType,
} from '../Include/SellData';
import CustomRadioButton from '../component/CustomRadioButton';
//   import VideoCapture from "../../component/sell/VideoCapture";
//   import ImageUpload from "../../component/sell/ImageUpload";
import DatePicker from 'react-native-modern-datepicker';
import {useCallback} from 'react';
//   import { Video } from "expo-av";

//   const WIDTH = Dimensions.get("window").width;

const Sell = () => {
  const bedroomsNumber = BedroomsNumber();

  bedroomsNumber.push({
    value: '1RK',
    label: '1RK',
  });

  const [selectedValue, setSelectedValue] = useState('');
  const [saleableArea, setSaleableArea] = useState('');

  const [property_for, setProperty_for] = useState('');
  const [lat, setLat] = useState(0);
  const [long, setLong] = useState(0);
  const [property_type, setProperty_type] = useState('');
  const [added_by_type, setAdded_by_type] = useState('');
  const [location, setLocation] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [saleable_area, setSaleable_area] = useState('');
  const [saleable_area_size_in, setSaleable_area_size_in] = useState('');
  const [carpet_area, setCarpet_area] = useState('');
  const [carpet_area_size_in, setCarpet_area_size_in] = useState('');
  const [bathrooms, setBathrooms] = useState('');
  const [balconies, setBalconies] = useState('');
  const [additional_facility, setAdditional_facility] = useState('');
  const [expected_price, setExpected_price] = useState('');
  const [expected_price_in_sqft, setExpected_price_in_sqft] = useState('');
  const [booking_price, setBooking_price] = useState('');
  const [monthly_rent, setMonthly_rent] = useState('');
  const [security_deposit, setSecurity_deposit] = useState('');
  const [maintance_charge, setMaintance_charge] = useState('');
  const [available_from, setAvailable_from] = useState(
    new Date().toDateString(),
  );
  const [property_status, setProperty_status] = useState('');
  const [property_age, setProperty_age] = useState('');
  const [possession_date, setPossession_date] = useState(
    new Date().toDateString(),
  );
  const [description, setDescription] = useState('');
  const [furnishing_status, setFurnishing_status] = useState('');
  const [negotiable, setNegotiable] = useState('no');
  const [wardrobe, setWardrobe] = useState('');
  const [beds, setBeds] = useState('');
  const [ac, setAc] = useState('');
  const [tv, setTv] = useState('');
  const [light, setLight] = useState('');
  const [fan, setFan] = useState('');
  const [exhaust_fan, setExhaust_fan] = useState('');
  const [additional_room, setAdditional_room] = useState([]);
  const [additional_furnishing, setAdditional_furnishing] = useState('');
  const [floor, setFloor] = useState('');
  const [total_floor, setTotal_floor] = useState('');
  const [open_side, setOpen_side] = useState('');
  const [facing_side, setFacing_side] = useState('');
  const [facing_road_width, setFacing_road_width] = useState('');
  const [facing_road_width_in, setFacing_road_width_in] = useState('');
  const [overlooking, setOverlooking] = useState([]);
  const [ownershiptype, setOwnershiptype] = useState('');
  const [living_room, setLiving_room] = useState('');
  const [kitchen, setKitchen] = useState('');
  const [master_bedroom, setMaster_bedroom] = useState('');
  const [bathroom, setBathroom] = useState('');
  const [balcony, setBalcony] = useState('');
  const [other_bedroom, setOther_bedroom] = useState('');
  const [preferred_tenants, setPreferred_tenants] = useState('');
  const [gender_preference, setGender_preference] = useState('');
  const [maximum_tentants_allowed, setMaximum_tentants_allowed] = useState('');
  const [work_preference, setWork_preference] = useState('');
  const [food_preference, setFood_preference] = useState('');
  const [expected_duration_of_stay, setExpected_duration_of_stay] =
    useState('');
  const [special_requirement, setSpecial_requirement] = useState('');
  const [images, setImages] = useState([]);
  const [image, setImage] = useState('');
  const [room_data, setRoom_data] = useState([]);
  const [video, setVideo] = useState('');
  const [views, setViews] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showAvailableDatePicker, setShowAvailableDatePicker] = useState(false);
  const [car_parking_close, setCar_parking_close] = useState('');
  const [car_parking_open, setCar_parking_open] = useState('');

  const [roomType, setRoomType] = useState('');
  const [numberOfRooms, setNumberOfRooms] = useState('');
  const [roomPrice, setRoomPrice] = useState('');
  const [addRoomDataActive, setAddRoomDataActive] = useState(false);
  const [make_display_image, setMake_display_image] = useState('');

  const AddRoomDetails = () => {
    setAddRoomDataActive(false);
    if (roomType && numberOfRooms && roomPrice) {
      const data = {room: roomType, numberOfRooms, price: roomPrice};
      setRoom_data([...room_data, data]);
    }
  };

  const RemoveRoomDetails = index => {
    const data = room_data.filter((_, idx) => idx !== index);
    setRoom_data(data);
  };

  const removeImg = index => {
    const data = images.filter((_, idx) => idx !== index);
    setImages(data);
  };

  const handleValueChange = itemValue => {
    setSelectedValue(itemValue);
  };

  const Addadditional_room = data => {
    if (!additional_room?.includes(data)) {
      setAdditional_room([...additional_room, data]);
    } else {
      const deletedData = additional_room.filter(item => item !== data);
      setAdditional_room(deletedData);
    }
  };
  const Addadditional_facility = data => {
    if (!additional_facility?.includes(data)) {
      setAdditional_facility([...additional_facility, data]);
    } else {
      const deletedData = additional_facility.filter(item => item !== data);
      setAdditional_facility(deletedData);
    }
  };

  const Addadditional_furnishing = data => {
    if (!additional_furnishing?.includes(data)) {
      setAdditional_furnishing([...additional_furnishing, data]);
    } else {
      const deletedData = additional_furnishing.filter(item => item !== data);
      setAdditional_furnishing(deletedData);
    }
  };

  const Addoverlooking = data => {
    if (!overlooking?.includes(data)) {
      setOverlooking([...overlooking, data]);
    } else {
      const deletedData = overlooking.filter(item => item !== data);
      setOverlooking(deletedData);
    }
  };

  const nextpreButtons = useCallback(
    (pre, next) => (
      <View style={styles.buttonCantainer}>
        <TouchableOpacity
          style={styles.Button}
          onPress={() => setPageNumber(pre)}>
          <Text
            style={{
              textTransform: 'capitalize',
              color: '#fff',
              fontSize: 18,
            }}>
            Pre
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.Button}
          onPress={() => setPageNumber(next)}>
          <Text
            style={{
              textTransform: 'capitalize',
              color: '#fff',
              fontSize: 18,
            }}>
            Next
          </Text>
        </TouchableOpacity>
      </View>
    ),
    [setPageNumber, pageNumber],
  );

  const OnAvailableDateslection = date => {
    setShowAvailableDatePicker(false);
    setAvailable_from(date);
  };

  const OnDateslection = date => {
    setShowDatePicker(false);
    setPossession_date(date);
  };

  function submitProperty() {
    console.log('submit');
  }

  return (
    <View>
      <ScrollView>
        {pageNumber == 1 && (
            <TypeOfProperty
              propertyFor={property_for}
              propertyType={property_type}
              added_by_type={added_by_type}
              setPropertyFor={setProperty_for}
              setPropertyType={setProperty_type}
              setAdded_by_type={setAdded_by_type}
              setLat={setLat}
              setLong={setLong}
              setPageNumber={setPageNumber}
            />
          )}
        {pageNumber == 2 && (
          <View>
            {property_type !== typeofName[7] &&
              property_type !== typeofName[8] && (
                <View>
                  {property_type == typeofName[0] ||
                  property_type == typeofName[1] ||
                  property_type == typeofName[2] ||
                  property_type == typeofName[5] ||
                  property_type == typeofName[6] ? (
                    <View>
                      <Text style={styles.heading}>Select Bedroom?</Text>
                      <View style={styles.bedroomcontainer}>
                        <Picker
                          style={styles.bedroompicker}
                          selectedValue={bedrooms}
                          onValueChange={item => setBedrooms(item)}>
                          <Picker.Item key="select" label="select" value="" />
                          {bedroomsNumber.map(({label, value}) => (
                            <Picker.Item
                              key={label}
                              label={label}
                              value={value}
                            />
                          ))}
                        </Picker>
                      </View>
                    </View>
                  ) : (
                    ''
                  )}
                  {property_type == typeofName[3] ||
                  property_type == typeofName[4] ? (
                    <View>
                      <Text style={styles.heading}>Select Bedroom?</Text>
                      <View style={styles.bedroomcontainer}>
                        <Picker
                          style={styles.bedroompicker}
                          selectedValue={bedrooms}
                          onValueChange={item => setBedrooms(item)}>
                          <Picker.Item key="select" label="select" value="" />
                          <Picker.Item key="1Rk" label="1Rk" value="1Rk" />
                        </Picker>
                      </View>
                    </View>
                  ) : (
                    ''
                  )}
                  {property_type == typeofName[0] ||
                  property_type == typeofName[1] ||
                  property_type == typeofName[2] ||
                  property_type == typeofName[3] ||
                  property_type == typeofName[4] ||
                  property_type == typeofName[5] ||
                  property_type == typeofName[6] ? (
                    <View>
                      <Text style={styles.heading}>
                        Tell us your property area?
                      </Text>
                      <View>
                        <Text style={styles.label}>Saleable area</Text>
                        <View style={styles.Saleablemaincontainer}>
                          <TextInput
                            placeholderTextColor={'#000'}
                            style={styles.saleableAreaInput}
                            keyboardType="numeric"
                            value={saleable_area.toString()}
                            onChangeText={setSaleable_area}
                            placeholder="e.g., 123"
                          />
                          <View style={styles.Saleablecontainer}>
                            <Picker
                              style={styles.Saleablepicker}
                              selectedValue={selectedValue}
                              onValueChange={handleValueChange}>
                              {sizeData.map(({label, value}) => (
                                <Picker.Item
                                  key={label}
                                  label={label}
                                  value={value}
                                />
                              ))}
                            </Picker>
                          </View>
                        </View>
                        <View>
                          <Text style={styles.label}>Carpet area</Text>
                          <View
                            style={[
                              styles.Saleablemaincontainer,
                              styles.Carpetarea,
                            ]}>
                            <TextInput
                              placeholderTextColor={'#000'}
                              style={styles.saleableAreaInput}
                              keyboardType="numeric"
                              value={carpet_area.toString()}
                              onChangeText={setCarpet_area}
                              placeholder="e.g., 123"
                            />
                            <View
                              style={[
                                styles.Saleablecontainer,
                                styles.Carpetarea,
                              ]}>
                              <Picker
                                style={styles.Saleablepicker}
                                selectedValue={saleable_area_size_in}
                                onValueChange={setSaleable_area_size_in}>
                                {sizeData.map(({label, value}) => (
                                  <Picker.Item
                                    key={label}
                                    label={label}
                                    value={value}
                                  />
                                ))}
                              </Picker>
                            </View>
                          </View>
                        </View>
                      </View>
                    </View>
                  ) : (
                    <View>
                      <Text style={styles.heading}>
                        Tell us your property area?
                      </Text>
                      <View>
                        <Text style={styles.label}>Saleable area</Text>
                        <View style={styles.Saleablemaincontainer}>
                          <TextInput
                            placeholderTextColor={'#000'}
                            style={styles.saleableAreaInput}
                            keyboardType="numeric"
                            value={saleableArea.toString()}
                            onChangeText={item => setSaleableArea(item)}
                            placeholder="e.g., 123"
                          />
                          <View style={styles.Saleablecontainer}>
                            <Picker
                              style={styles.Saleablepicker}
                              selectedValue={carpet_area_size_in}
                              onValueChange={item =>
                                setCarpet_area_size_in(item)
                              }>
                              {sizeData.map(({label, value}) => (
                                <Picker.Item
                                  key={label}
                                  label={label}
                                  value={value}
                                />
                              ))}
                            </Picker>
                          </View>
                        </View>
                      </View>
                    </View>
                  )}
                  <View>
                    <View>
                      <Text style={styles.heading}>
                        Tell us more about the configuration
                      </Text>
                      <View
                        style={[
                          styles.Saleablemaincontainer,
                          styles.Carpetarea,
                        ]}>
                        <View>
                          <Text style={styles.label}>Bathrooms</Text>
                          <TextInput
                            placeholderTextColor={'#000'}
                            style={styles.saleableAreaInput}
                            keyboardType="numeric"
                            value={bathrooms.toString()}
                            onChangeText={setBathrooms}
                            placeholder="e.g., 123"
                          />
                        </View>
                        <View>
                          <Text style={styles.label}>balconie</Text>
                          <TextInput
                            placeholderTextColor={'#000'}
                            style={styles.saleableAreaInput}
                            keyboardType="numeric"
                            value={balconies.toString()}
                            onChangeText={setBalconies}
                            placeholder="e.g., 123"
                          />
                        </View>
                      </View>
                    </View>

                    <View style={styles.gap}>
                      <View style={styles.radioCaontainer}>
                        <CustomRadioButton
                          label={'Prayer Room'}
                          img={
                            'https://gpropertypay.com/public/assets/prayer_room.png'
                          }
                          selected={additional_room.includes('Prayer Room')}
                          onSelect={() => Addadditional_room('Prayer Room')}
                        />
                        <CustomRadioButton
                          label={'Study Room'}
                          img={
                            'https://gpropertypay.com/public/assets/study_room.png'
                          }
                          selected={additional_room.includes('Study Room')}
                          onSelect={() => Addadditional_room('Study Room')}
                        />
                        <CustomRadioButton
                          label={'Store Room'}
                          img={
                            'https://gpropertypay.com/public/assets/store_room.png'
                          }
                          selected={additional_room.includes('Store Room')}
                          onSelect={() => Addadditional_room('Store Room')}
                        />
                      </View>
                      <CustomRadioButton
                        label={'Servant Room'}
                        img={
                          'https://gpropertypay.com/public/assets/servent_room.png'
                        }
                        selected={additional_room.includes('Servant Room')}
                        onSelect={() => Addadditional_room('Servant Room')}
                      />
                    </View>
                  </View>
                </View>
              )}
            <View>
              <Text style={styles.heading}>What is the expected price</Text>
              <View>
                {property_for == 'sell' ? (
                  <View>
                    <View
                      style={[styles.Saleablemaincontainer, styles.Carpetarea]}>
                      <View style={[styles.Carpetarea]}>
                        <Text style={styles.label}>Price(per sq feet)</Text>
                        <TextInput
                          placeholderTextColor={'#000'}
                          style={styles.saleableAreaInput}
                          keyboardType="numeric"
                          value={expected_price_in_sqft.toString()}
                          onChangeText={setExpected_price_in_sqft}
                          placeholder="e.g., 123"
                        />
                      </View>
                      <View style={[styles.Carpetarea]}>
                        <Text style={styles.label}>Total Price</Text>
                        <TextInput
                          placeholderTextColor={'#000'}
                          style={styles.saleableAreaInput}
                          keyboardType="numeric"
                          value={expected_price.toString()}
                          onChangeText={setExpected_price}
                          placeholder="e.g., 123"
                        />
                      </View>
                    </View>
                    <View
                      style={[styles.Saleablemaincontainer, styles.Carpetarea]}>
                      <View style={[styles.Carpetarea]}>
                        <Text style={styles.label}>Booking Amount</Text>
                        <TextInput
                          placeholderTextColor={'#000'}
                          style={styles.saleableAreaInput}
                          keyboardType="numeric"
                          value={booking_price.toString()}
                          onChangeText={setBooking_price}
                          placeholder="e.g., 123"
                        />
                      </View>
                      <View style={[styles.Carpetarea, {marginRight: 20}]}>
                        <Text style={styles.label}>Negotiable</Text>
                        <CustomRadioButton
                          label={'Negotiable'}
                          selected={negotiable == 'yes'}
                          onSelect={() =>
                            negotiable == 'yes'
                              ? setNegotiable('no')
                              : setNegotiable('yes')
                          }
                        />
                      </View>
                    </View>
                  </View>
                ) : (
                  <View>
                    <View
                      style={[styles.Saleablemaincontainer, styles.Carpetarea]}>
                      <View style={[styles.Carpetarea]}>
                        <Text style={styles.label}>
                          Monthly Rent (in rupees)
                        </Text>
                        <TextInput
                          placeholderTextColor={'#000'}
                          style={styles.saleableAreaInput}
                          keyboardType="numeric"
                          value={monthly_rent.toString()}
                          onChangeText={setMonthly_rent}
                          placeholder="e.g., 123"
                        />
                      </View>
                      <View style={[styles.Carpetarea]}>
                        <Text style={styles.label}>
                          Security Deposit (in ₹)
                        </Text>
                        <TextInput
                          placeholderTextColor={'#000'}
                          style={styles.saleableAreaInput}
                          keyboardType="numeric"
                          value={security_deposit.toString()}
                          onChangeText={setSecurity_deposit}
                          placeholder="e.g., 123"
                        />
                      </View>
                    </View>
                    <View
                      style={[styles.Saleablemaincontainer, styles.Carpetarea]}>
                      <View style={[styles.Carpetarea]}>
                        <Text style={styles.label}>
                          Maintenance Charge(in ₹)
                        </Text>
                        <TextInput
                          placeholderTextColor={'#000'}
                          style={styles.saleableAreaInput}
                          keyboardType="numeric"
                          value={maintance_charge.toString()}
                          onChangeText={setMaintance_charge}
                          placeholder="e.g., 123"
                        />
                      </View>
                      <View style={[styles.Carpetarea, {marginLeft: 20}]}>
                        <Text style={[styles.label, {paddingBottom: 0}]}>
                          Negotiable
                        </Text>
                        <CustomRadioButton
                          label={'Negotiable'}
                          selected={negotiable == 'yes'}
                          onSelect={() =>
                            negotiable == 'yes'
                              ? setNegotiable('no')
                              : setNegotiable('yes')
                          }
                        />
                      </View>
                    </View>
                  </View>
                )}
              </View>

              {property_for == 'rent' && (
                <View>
                  <View style={[styles.Carpetarea]}>
                    <Text style={styles.label}>Available from</Text>
                    <TouchableOpacity
                      style={styles.dateShowCantainer}
                      onPress={() => setShowAvailableDatePicker(true)}>
                      <Text>{available_from}</Text>
                    </TouchableOpacity>
                  </View>
                  <Modal
                    animationType="slide"
                    transparent={true}
                    visible={showAvailableDatePicker}>
                    <View style={styles.DatePickerContainer}>
                      <DatePicker
                        mode="calendar"
                        onSelectedChange={OnAvailableDateslection}
                        options={{
                          backgroundColor: '#FFF',
                          textHeaderColor: '#000',
                          textDefaultColor: '#000',
                          selectedTextColor: '#fff',
                        }}
                        style={{
                          borderRadius: 10,
                          shadowColor: '#000',
                          shadowOffset: {
                            width: 0,
                            height: 2,
                          },
                          shadowOpacity: 0.25,
                          shadowRadius: 3.84,

                          elevation: 5,
                        }}
                      />
                      <View></View>
                    </View>
                  </Modal>
                </View>
              )}
            </View>
            {nextpreButtons(1, 3)}
          </View>
        )}
        {pageNumber == 3 && (
          <View>
            {property_type !== typeofName[7] &&
              property_type !== typeofName[8] && (
                <View>
                  <View>
                    <Text style={styles.heading}>Include</Text>
                    <View style={styles.radioCaontainer}>
                      <CustomRadioButton
                        label={'PLc'}
                        img={'https://gpropertypay.com/public/assets/plc.png'}
                        selected={additional_facility.includes('PLc')}
                        onSelect={() => Addadditional_facility('PLc')}
                      />
                      <CustomRadioButton
                        label={'Car Parking'}
                        img={
                          'https://gpropertypay.com/public/assets/car_parking.png'
                        }
                        selected={additional_facility.includes('Car Parking')}
                        onSelect={() => Addadditional_facility('Car Parking')}
                      />
                      <CustomRadioButton
                        label={'registration'}
                        img={
                          'https://gpropertypay.com/public/assets/registration.png'
                        }
                        selected={additional_facility.includes('registration')}
                        onSelect={() => Addadditional_facility('registration')}
                      />
                    </View>
                    <CustomRadioButton
                      label={'Club Membership'}
                      img={
                        'https://gpropertypay.com/public/assets/club_membership.png'
                      }
                      selected={additional_facility.includes('Club Membership')}
                      onSelect={() => Addadditional_facility('Club Membership')}
                    />
                  </View>
                  {property_type === typeofName[5] ||
                    (property_type === typeofName[6] && (
                      <View style={styles.RoomDetails}>
                        <Text style={styles.heading}>Room Details</Text>
                        <View>
                          <View>
                            <View
                              style={{
                                flexDirection: 'row',
                                justifyContent: 'space-around',
                                marginHorizontal: 10,
                              }}>
                              <Text style={{fontWeight: 'bold'}}>
                                Room Type
                              </Text>
                              <Text style={{fontWeight: 'bold'}}>
                                Number Of Rooms
                              </Text>
                              <Text style={{fontWeight: 'bold'}}>Price</Text>
                              <Text style={{fontWeight: 'bold'}}>Remove</Text>
                            </View>
                            <View style={{marginTop: 20}}>
                              {room_data.map((item, idx) => (
                                <View style={styles.room_dataStyle} key={idx}>
                                  <Text>{item.room}</Text>
                                  <Text>{item.numberOfRooms}</Text>
                                  <Text>{item.price}</Text>
                                  <TouchableOpacity
                                    onPress={() => RemoveRoomDetails(idx)}>
                                    <Text style={{fontWeight: 'bold'}}>
                                      Remove
                                    </Text>
                                  </TouchableOpacity>
                                </View>
                              ))}
                            </View>
                          </View>
                          <TouchableOpacity
                            onPress={() => setAddRoomDataActive(true)}
                            style={{
                              backgroundColor: 'blue',
                              justifyContent: 'center',
                              alignItems: 'center',
                              borderRadius: 8,
                              marginVertical: 20,
                              marginHorizontal: 30,
                              height: 50,
                            }}>
                            <Text
                              style={{
                                padding: 10,
                                textTransform: 'capitalize',
                                color: '#fff',
                                fontSize: 18,
                              }}>
                              Add Room Details
                            </Text>
                          </TouchableOpacity>
                        </View>

                        <Modal
                          animationType="slide"
                          transparent={true}
                          visible={addRoomDataActive}>
                          <View style={styles.addRoomForm}>
                            <View style={styles.addRoommaincantainer}>
                              <View style={[styles.radioCaontainer]}>
                                <View>
                                  <Text style={styles.label}>Room Type</Text>
                                  <View
                                    style={[
                                      styles.Saleablecontainer,
                                      {width: 180},
                                    ]}>
                                    <Picker
                                      style={styles.Saleablepicker}
                                      selectedValue={roomType}
                                      onValueChange={item => setRoomType(item)}>
                                      {RoomType.map(({label, value}) => (
                                        <Picker.Item
                                          key={label}
                                          label={label}
                                          value={value}
                                        />
                                      ))}
                                    </Picker>
                                  </View>
                                </View>
                                <View style={[styles.Carpetarea]}>
                                  <Text style={styles.label}>
                                    Number Of Rooms
                                  </Text>
                                  <TextInput
                                    placeholderTextColor={'#000'}
                                    style={styles.saleableAreaInput}
                                    keyboardType="numeric"
                                    value={numberOfRooms.toString()}
                                    onChangeText={setNumberOfRooms}
                                    placeholder="e.g., 123"
                                  />
                                </View>
                              </View>
                              <View>
                                <View style={[styles.Carpetarea]}>
                                  <Text style={styles.label}>Room Price</Text>
                                  <TextInput
                                    placeholderTextColor={'#000'}
                                    style={styles.saleableAreaInput}
                                    keyboardType="numeric"
                                    value={roomPrice.toString()}
                                    onChangeText={setRoomPrice}
                                    placeholder="e.g., 123"
                                  />
                                </View>
                              </View>
                              <View
                                style={{
                                  // justifyContent: "center",
                                  // alignItems: "center",
                                  borderRadius: 8,
                                  marginVertical: 20,
                                  marginHorizontal: 30,
                                  height: 50,
                                }}>
                                <Button
                                  title="Add"
                                  onPress={() => AddRoomDetails()}
                                />
                              </View>
                            </View>
                          </View>
                        </Modal>
                      </View>
                    ))}
                  <View>
                    <Text style={styles.heading}>Property Status</Text>
                    <View style={[styles.radioCaontainer, styles.Carpetarea]}>
                      <CustomRadioButton
                        label={'Ready To move in'}
                        selected={property_status == 'ready to move in'}
                        onSelect={() => setProperty_status('ready to move in')}
                      />
                      <CustomRadioButton
                        label={'under construction'}
                        selected={property_status == 'under construction'}
                        onSelect={() =>
                          setProperty_status('under construction')
                        }
                      />
                    </View>
                  </View>
                  <View
                    style={[styles.Saleablemaincontainer, styles.Carpetarea]}>
                    <View style={[styles.Carpetarea]}>
                      <Text style={styles.label}>Property Age (in year)</Text>
                      <TextInput
                        placeholderTextColor={'#000'}
                        style={styles.saleableAreaInput}
                        keyboardType="numeric"
                        value={property_age.toString()}
                        onChangeText={setProperty_age}
                        placeholder="e.g., 123"
                      />
                    </View>
                    <View style={[styles.Carpetarea]}>
                      <Text style={styles.label}>Possession Date</Text>
                      <TouchableOpacity
                        style={styles.dateShowCantainer}
                        onPress={() => setShowDatePicker(true)}>
                        <Text>{possession_date}</Text>
                      </TouchableOpacity>
                    </View>
                    <Modal
                      animationType="slide"
                      transparent={true}
                      visible={showDatePicker}>
                      <View style={styles.DatePickerContainer}>
                        <DatePicker
                          mode="calendar"
                          onSelectedChange={OnDateslection}
                          options={{
                            backgroundColor: '#FFF',
                            textHeaderColor: '#000',
                            textDefaultColor: '#000',
                            selectedTextColor: '#fff',
                          }}
                          style={{
                            borderRadius: 10,
                            shadowColor: '#000',
                            shadowOffset: {
                              width: 0,
                              height: 2,
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 3.84,

                            elevation: 5,
                          }}
                        />
                        <View></View>
                      </View>
                    </Modal>
                  </View>
                </View>
              )}
            <View>
              <Text style={styles.heading}>Description</Text>
              <View style={[styles.DescriptionContainer, styles.Carpetarea]}>
                <TextInput
                  placeholderTextColor={'#000'}
                  style={styles.DescriptionAreaInput}
                  multiline
                  numberOfLines={4}
                  value={description}
                  onChangeText={setDescription}
                  placeholder="Description"
                />
              </View>
            </View>

            {nextpreButtons(
              2,
              property_type === typeofName[7] || property_type === typeofName[8]
                ? 8
                : 4,
            )}
          </View>
        )}

        {property_type !== typeofName[7] && property_type !== typeofName[8] && (
          <View>
            {pageNumber == 4 && (
              <View>
                <View>
                  <View>
                    <Text style={styles.heading}>Property Features</Text>
                    <Text style={styles.label}>Choose furnishing status</Text>
                    <View
                      style={[styles.DescriptionContainer, styles.Carpetarea]}>
                      <View style={[styles.radioCaontainer, styles.Carpetarea]}>
                        <CustomRadioButton
                          label={'Un furnished'}
                          selected={furnishing_status == 'Unfurnished'}
                          onSelect={() => setFurnishing_status('Unfurnished')}
                        />
                        <CustomRadioButton
                          label={'Semi furnished'}
                          selected={furnishing_status == 'Semi furnished'}
                          onSelect={() =>
                            setFurnishing_status('Semi furnished')
                          }
                        />
                        <CustomRadioButton
                          label={'Fully furnished'}
                          selected={furnishing_status == 'Fully furnished'}
                          onSelect={() =>
                            setFurnishing_status('Fully furnished')
                          }
                        />
                      </View>
                    </View>
                    <View
                      style={[styles.Saleablemaincontainer, styles.Carpetarea]}>
                      <View style={[styles.Carpetarea]}>
                        <Text style={styles.label}>Wardrobe</Text>
                        <TextInput
                          placeholderTextColor={'#000'}
                          style={styles.saleableAreaInput}
                          keyboardType="numeric"
                          value={wardrobe.toString()}
                          onChangeText={setWardrobe}
                          placeholder="e.g., 123"
                        />
                      </View>
                      <View style={[styles.Carpetarea]}>
                        <Text style={styles.label}>Beds</Text>
                        <TextInput
                          placeholderTextColor={'#000'}
                          style={styles.saleableAreaInput}
                          keyboardType="numeric"
                          value={beds.toString()}
                          onChangeText={setBeds}
                          placeholder="e.g., 123"
                        />
                      </View>
                    </View>
                    <View
                      style={[styles.Saleablemaincontainer, styles.Carpetarea]}>
                      <View style={[styles.Carpetarea]}>
                        <Text style={styles.label}>Ac</Text>
                        <TextInput
                          placeholderTextColor={'#000'}
                          style={styles.saleableAreaInput}
                          keyboardType="numeric"
                          value={ac.toString()}
                          onChangeText={setAc}
                          placeholder="e.g., 123"
                        />
                      </View>
                      <View style={[styles.Carpetarea]}>
                        <Text style={styles.label}>Tv</Text>
                        <TextInput
                          placeholderTextColor={'#000'}
                          style={styles.saleableAreaInput}
                          keyboardType="numeric"
                          value={tv.toString()}
                          onChangeText={setTv}
                          placeholder="e.g., 123"
                        />
                      </View>
                    </View>
                    <View
                      style={[styles.Saleablemaincontainer, styles.Carpetarea]}>
                      <View style={[styles.Carpetarea]}>
                        <Text style={styles.label}>Light</Text>
                        <TextInput
                          placeholderTextColor={'#000'}
                          style={styles.saleableAreaInput}
                          keyboardType="numeric"
                          value={light.toString()}
                          onChangeText={setLight}
                          placeholder="e.g., 123"
                        />
                      </View>
                      <View style={[styles.Carpetarea]}>
                        <Text style={styles.label}>Fan</Text>
                        <TextInput
                          placeholderTextColor={'#000'}
                          style={styles.saleableAreaInput}
                          keyboardType="numeric"
                          value={fan.toString()}
                          onChangeText={setFan}
                          placeholder="e.g., 123"
                        />
                      </View>
                    </View>
                    <View
                      style={[styles.Saleablemaincontainer, styles.Carpetarea]}>
                      <View style={[styles.Carpetarea]}>
                        <Text style={styles.label}>Exhaust fan</Text>
                        <TextInput
                          placeholderTextColor={'#000'}
                          style={styles.saleableAreaInput}
                          keyboardType="numeric"
                          value={exhaust_fan.toString()}
                          onChangeText={setExhaust_fan}
                          placeholder="e.g., 123"
                        />
                      </View>
                    </View>
                    <View>
                      <Text style={styles.label}>Additional Furnishing</Text>
                      <View style={styles.radioCaontainer}>
                        <CustomRadioButton
                          label={'Sofa'}
                          img={
                            'https://gpropertypay.com/public/assets/sofa.png'
                          }
                          selected={additional_furnishing.includes('Sofa')}
                          onSelect={() => Addadditional_furnishing('Sofa')}
                        />
                        <CustomRadioButton
                          label={'Refrigerator'}
                          img={
                            'https://gpropertypay.com/public/assets/refrigerator.png'
                          }
                          selected={additional_furnishing.includes(
                            'Refrigerator',
                          )}
                          onSelect={() =>
                            Addadditional_furnishing('Refrigerator')
                          }
                        />
                        <CustomRadioButton
                          label={'Dining Table'}
                          img={
                            'https://gpropertypay.com/public/assets/dining_table.png'
                          }
                          selected={additional_furnishing.includes(
                            'Dining Table',
                          )}
                          onSelect={() =>
                            Addadditional_furnishing('Dining Table')
                          }
                        />
                      </View>
                      <View style={styles.radioCaontainer}>
                        <CustomRadioButton
                          label={'Gas Connection'}
                          img={
                            'https://gpropertypay.com/public/assets/gas_connection.png'
                          }
                          selected={additional_furnishing.includes(
                            'Gas Connection',
                          )}
                          onSelect={() =>
                            Addadditional_furnishing('Gas Connection')
                          }
                        />
                        <CustomRadioButton
                          label={'Water Connection'}
                          img={
                            'https://gpropertypay.com/public/assets/water_connection.png'
                          }
                          selected={additional_furnishing.includes(
                            'Water Connection',
                          )}
                          onSelect={() =>
                            Addadditional_furnishing('Water Connection')
                          }
                        />
                        <CustomRadioButton
                          label={'Meter Connection'}
                          img={
                            'https://gpropertypay.com/public/assets/meter_connection.png'
                          }
                          selected={additional_furnishing.includes(
                            'Meter Connection',
                          )}
                          onSelect={() =>
                            Addadditional_furnishing('Meter Connection')
                          }
                        />
                      </View>
                      <View style={styles.radioCaontainer}>
                        <CustomRadioButton
                          label={'Washing Machine'}
                          img={
                            'https://gpropertypay.com/public/assets/washing_machine.png'
                          }
                          selected={additional_furnishing.includes(
                            'Washing Machine',
                          )}
                          onSelect={() =>
                            Addadditional_furnishing('Washing Machine')
                          }
                        />
                        <CustomRadioButton
                          label={'Modular Kitchen'}
                          img={
                            'https://gpropertypay.com/public/assets/modular_kitchen.png'
                          }
                          selected={additional_furnishing.includes(
                            'Modular Kitchen',
                          )}
                          onSelect={() =>
                            Addadditional_furnishing('Modular Kitchen')
                          }
                        />
                        <CustomRadioButton
                          label={'Wifi Connection'}
                          img={
                            'https://gpropertypay.com/public/assets/wifi_connection.png'
                          }
                          selected={additional_furnishing.includes(
                            'Wifi Connection',
                          )}
                          onSelect={() =>
                            Addadditional_furnishing('Wifi Connection')
                          }
                        />
                      </View>
                      <View style={styles.radioCaontainer}>
                        <CustomRadioButton
                          label={'Microwave Oven'}
                          img={
                            'https://gpropertypay.com/public/assets/microwave.png'
                          }
                          selected={additional_furnishing.includes(
                            'Microwave Oven',
                          )}
                          onSelect={() =>
                            Addadditional_furnishing('Microwave Oven')
                          }
                        />
                      </View>
                      <View>
                        <Text style={styles.heading}>Car Parking</Text>
                        <View
                          style={[
                            styles.Saleablemaincontainer,
                            styles.Carpetarea,
                          ]}>
                          <View style={[styles.Carpetarea]}>
                            <Text style={styles.label}>Open</Text>
                            <TextInput
                              placeholderTextColor={'#000'}
                              style={styles.saleableAreaInput}
                              keyboardType="numeric"
                              value={car_parking_open.toString()}
                              onChangeText={setCar_parking_open}
                              placeholder="e.g., 123"
                            />
                          </View>
                          <View style={[styles.Carpetarea]}>
                            <Text style={styles.label}>Close</Text>
                            <TextInput
                              placeholderTextColor={'#000'}
                              style={styles.saleableAreaInput}
                              keyboardType="numeric"
                              value={car_parking_close.toString()}
                              onChangeText={setCar_parking_close}
                              placeholder="e.g., 123"
                            />
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
                {nextpreButtons(3, 5)}
              </View>
            )}
            {pageNumber == 5 && (
              <View>
                <View>
                  <View>
                    <Text style={styles.heading}>Property Features</Text>
                    <View
                      style={[styles.Saleablemaincontainer, styles.Carpetarea]}>
                      <View style={[styles.Carpetarea]}>
                        <Text style={styles.label}>Floor</Text>
                        <TextInput
                          placeholderTextColor={'#000'}
                          style={styles.saleableAreaInput}
                          keyboardType="numeric"
                          value={floor.toString()}
                          onChangeText={setFloor}
                          placeholder="e.g., 123"
                        />
                      </View>
                      <View style={[styles.Carpetarea]}>
                        <Text style={styles.label}>Total Floor</Text>
                        <TextInput
                          placeholderTextColor={'#000'}
                          style={styles.saleableAreaInput}
                          keyboardType="numeric"
                          value={total_floor.toString()}
                          onChangeText={setTotal_floor}
                          placeholder="e.g., 123"
                        />
                      </View>
                    </View>
                    <View
                      style={[styles.Saleablemaincontainer, styles.Carpetarea]}>
                      <View style={[styles.Carpetarea]}>
                        <Text style={styles.label}>Open side</Text>
                        <TextInput
                          placeholderTextColor={'#000'}
                          style={styles.saleableAreaInput}
                          keyboardType="numeric"
                          value={open_side.toString()}
                          onChangeText={setOpen_side}
                          placeholder="e.g., 123"
                        />
                      </View>
                      <View>
                        <Text style={styles.label}>Facing Side</Text>
                        <View style={[styles.Saleablecontainer, {width: 180}]}>
                          <Picker
                            style={styles.bedroompicker}
                            selectedValue={facing_side}
                            onValueChange={item => setFacing_side(item)}>
                            {FacingSide.map(({label, value}) => (
                              <Picker.Item
                                key={label}
                                label={label}
                                value={value}
                              />
                            ))}
                          </Picker>
                        </View>
                      </View>
                    </View>
                    <View
                      style={[styles.Saleablemaincontainer, styles.Carpetarea]}>
                      <View style={[styles.Carpetarea]}>
                        <Text style={styles.label}>Facing width size</Text>
                        <TextInput
                          placeholderTextColor={'#000'}
                          style={styles.saleableAreaInput}
                          keyboardType="numeric"
                          value={facing_road_width.toString()}
                          onChangeText={setFacing_road_width}
                          placeholder="e.g., 123"
                        />
                      </View>
                      <View style={[styles.Carpetarea]}>
                        <Text style={styles.label}>Size in</Text>
                        <View style={[styles.Saleablecontainer, {width: 180}]}>
                          <Picker
                            style={styles.Saleablepicker}
                            selectedValue={facing_road_width_in}
                            onValueChange={setFacing_road_width_in}>
                            {sizeData.map(({label, value}) => (
                              <Picker.Item
                                key={label}
                                label={label}
                                value={value}
                              />
                            ))}
                          </Picker>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
                {nextpreButtons(4, 6)}
              </View>
            )}
            {pageNumber == 6 && (
              <View>
                <Text style={styles.heading}>Additional Details</Text>
                <View>
                  <Text style={styles.label}>Overlooking</Text>
                  <View style={styles.radioCaontainer}>
                    <CustomRadioButton
                      label={'Garden/park'}
                      img={'https://gpropertypay.com/public/assets/garden.png'}
                      selected={overlooking.includes('Garden/park')}
                      onSelect={() => Addoverlooking('Garden/park')}
                    />
                    <CustomRadioButton
                      label={'Pool'}
                      img={'https://gpropertypay.com/public/assets/garden.png'}
                      selected={overlooking.includes('Pool')}
                      onSelect={() => Addoverlooking('Pool')}
                    />
                    <CustomRadioButton
                      label={'Road'}
                      img={'https://gpropertypay.com/public/assets/road.png'}
                      selected={overlooking.includes('Road')}
                      onSelect={() => Addoverlooking('Road')}
                    />
                  </View>
                  <View style={styles.radioCaontainer}>
                    <CustomRadioButton
                      label={'Corner Property'}
                      img={
                        'https://gpropertypay.com/public/assets/cornor_property.png'
                      }
                      selected={overlooking.includes('Corner Property')}
                      onSelect={() => Addoverlooking('Corner Property')}
                    />
                  </View>
                </View>
                <View>
                  <Text style={styles.label}>Ownership Type</Text>
                  <View style={[styles.radioCaontainer, styles.Carpetarea]}>
                    <CustomRadioButton
                      label={'Freehold'}
                      selected={ownershiptype == 'Freehold'}
                      onSelect={() => setOwnershiptype('Freehold')}
                    />
                    <CustomRadioButton
                      label={'Power of Attorney'}
                      selected={ownershiptype == 'Power of Attorney'}
                      onSelect={() => setOwnershiptype('Power of Attorney')}
                    />
                    <CustomRadioButton
                      label={'Leasehold'}
                      selected={ownershiptype == 'Leasehold'}
                      onSelect={() => setOwnershiptype('Leasehold')}
                    />
                  </View>
                  <View style={[styles.radioCaontainer, styles.Carpetarea]}>
                    <CustomRadioButton
                      label={'Co-Operative Society'}
                      selected={ownershiptype == 'Co-Operative Society'}
                      onSelect={() => setOwnershiptype('Co-Operative Society')}
                    />
                  </View>
                </View>
                <View>
                  <Text style={styles.heading}>Flooring type</Text>
                  <View>
                    <Text style={styles.label}>Living/Dining room</Text>
                    <View style={styles.Flooringcontainer}>
                      <Picker
                      style={styles.picker}
                        selectedValue={living_room}
                        onValueChange={setLiving_room}>
                        {materialType.map(({label, value}) => (
                          <Picker.Item
                            key={label}
                            label={label}
                            value={value}
                          />
                        ))}
                      </Picker>
                    </View>
                    <Text style={styles.label}>Kitchen</Text>
                    <View style={styles.Flooringcontainer}>
                      <Picker
                      style={styles.picker}
                      selectedValue={kitchen}
                        onValueChange={setKitchen}>
                        {materialType.map(({label, value}) => (
                          <Picker.Item
                            key={label}
                            label={label}
                            value={value}
                          />
                        ))}
                      </Picker>
                    </View>
                    <Text style={styles.label}>Master Bedroom</Text>
                    <View style={styles.Flooringcontainer}>
                      <Picker
                      style={styles.picker}
                      selectedValue={master_bedroom}
                        onValueChange={setMaster_bedroom}>
                        {materialType.map(({label, value}) => (
                          <Picker.Item
                            key={label}
                            label={label}
                            value={value}
                          />
                        ))}
                      </Picker>
                    </View>
                    <Text style={styles.label}>Bathroom</Text>
                    <View style={styles.Flooringcontainer}>
                      <Picker
                      style={styles.picker}
                      selectedValue={bathroom}
                        onValueChange={setBathroom}>
                        {materialType.map(({label, value}) => (
                          <Picker.Item
                            key={label}
                            label={label}
                            value={value}
                          />
                        ))}
                      </Picker>
                    </View>
                    <Text style={styles.label}>Balcony</Text>
                    <View style={styles.Flooringcontainer}>
                      <Picker
                      style={styles.picker}
                      selectedValue={balcony}
                        onValueChange={setBalcony}>
                        {materialType.map(({label, value}) => (
                          <Picker.Item
                            key={label}
                            label={label}
                            value={value}
                          />
                        ))}
                      </Picker>
                    </View>
                    <Text style={styles.label}>Other Bedroom</Text>
                    <View style={styles.Flooringcontainer}>
                      <Picker
                      style={styles.picker}
                      selectedValue={other_bedroom}
                        onValueChange={setOther_bedroom}>
                        {materialType.map(({label, value}) => (
                          <Picker.Item
                            key={label}
                            label={label}
                            value={value}
                          />
                        ))}
                      </Picker>
                    </View>
                  </View>
                </View>
                {nextpreButtons(5, 7)}
              </View>
            )}
            {pageNumber == 7 && (
              <View>
                <View>
                  <Text style={styles.heading}>Tenant Preferences</Text>
                  <View>
                    <Text style={styles.label}>Family</Text>
                    <View style={[styles.radioCaontainer, styles.Carpetarea]}>
                      <CustomRadioButton
                        label={'Family'}
                        selected={preferred_tenants == 'Family'}
                        onSelect={() => setPreferred_tenants('Family')}
                      />
                      <CustomRadioButton
                        label={'Bachelors'}
                        selected={preferred_tenants == 'Bachelors'}
                        onSelect={() => setPreferred_tenants('Bachelors')}
                      />
                      <CustomRadioButton
                        label={'All'}
                        selected={preferred_tenants == 'All'}
                        onSelect={() => setPreferred_tenants('All')}
                      />
                    </View>
                  </View>
                  <View>
                    <Text style={styles.label}>Gender Preference</Text>
                    <View style={[styles.radioCaontainer, styles.Carpetarea]}>
                      <CustomRadioButton
                        label={'Only Men'}
                        selected={gender_preference == 'Only Men'}
                        onSelect={() => setGender_preference('Only Men')}
                      />
                      <CustomRadioButton
                        label={'Only Women'}
                        selected={gender_preference == 'Only Women'}
                        onSelect={() => setGender_preference('Only Women')}
                      />
                      <CustomRadioButton
                        label={'All'}
                        selected={gender_preference == 'All'}
                        onSelect={() => setGender_preference('All')}
                      />
                    </View>
                  </View>
                  <View>
                    <Text style={styles.label}>Maximum Tenants Allowed</Text>
                    <View style={[styles.radioCaontainer, styles.Carpetarea]}>
                      <CustomRadioButton
                        label={'1-2'}
                        selected={maximum_tentants_allowed == '1-2'}
                        onSelect={() => setMaximum_tentants_allowed('1-2')}
                      />
                      <CustomRadioButton
                        label={'3-4'}
                        selected={maximum_tentants_allowed == '3-4'}
                        onSelect={() => setMaximum_tentants_allowed('3-4')}
                      />
                      <CustomRadioButton
                        label={'More Than 4'}
                        selected={maximum_tentants_allowed == 'More Than 4'}
                        onSelect={() =>
                          setMaximum_tentants_allowed('More Than 4')
                        }
                      />
                    </View>
                  </View>
                  <View>
                    <Text style={styles.label}>Work Preference</Text>
                    <View style={[styles.radioCaontainer, styles.Carpetarea]}>
                      <CustomRadioButton
                        label={'Salaried'}
                        selected={work_preference == 'Salaried'}
                        onSelect={() => setWork_preference('Salaried')}
                      />
                      <CustomRadioButton
                        label={'Student'}
                        selected={work_preference == 'Student'}
                        onSelect={() => setWork_preference('Student')}
                      />
                      <CustomRadioButton
                        label={'Businessmen'}
                        selected={work_preference == 'Businessmen'}
                        onSelect={() => setWork_preference('Businessmen')}
                      />
                    </View>
                    <View style={[styles.radioCaontainer, styles.Carpetarea]}>
                      <CustomRadioButton
                        label={'All'}
                        selected={work_preference == 'All'}
                        onSelect={() => setWork_preference('All')}
                      />
                    </View>
                  </View>
                  <View>
                    <Text style={styles.label}>Dietary/Food Preference</Text>
                    <View style={[styles.radioCaontainer, styles.Carpetarea]}>
                      <CustomRadioButton
                        label={'Only Vegetarians'}
                        selected={food_preference == 'Only Vegetarians'}
                        onSelect={() => setFood_preference('Only Vegetarians')}
                      />
                      <CustomRadioButton
                        label={'Non-Veg Allowed'}
                        selected={food_preference == 'Non-Veg Allowed'}
                        onSelect={() => setFood_preference('Non-Veg Allowed')}
                      />
                      <CustomRadioButton
                        label={'No Preference'}
                        selected={food_preference == 'No Preference'}
                        onSelect={() => setFood_preference('No Preference')}
                      />
                    </View>
                  </View>
                  <View>
                    <Text style={styles.label}>Expected Duration Of Stay</Text>
                    <View style={[styles.radioCaontainer, styles.Carpetarea]}>
                      <CustomRadioButton
                        label={'Atleast 6 Months'}
                        selected={
                          expected_duration_of_stay == 'Atleast 6 Months'
                        }
                        onSelect={() =>
                          setExpected_duration_of_stay('Atleast 6 Months')
                        }
                      />
                      <CustomRadioButton
                        label={'Atleast 1 Year'}
                        selected={expected_duration_of_stay == 'Atleast 1 Year'}
                        onSelect={() =>
                          setExpected_duration_of_stay('Atleast 1 Year')
                        }
                      />
                      <CustomRadioButton
                        label={'Atleast 2 Years'}
                        selected={
                          expected_duration_of_stay == 'Atleast 2 Years'
                        }
                        onSelect={() =>
                          setExpected_duration_of_stay('Atleast 2 Years')
                        }
                      />
                    </View>
                    <View style={[styles.radioCaontainer, styles.Carpetarea]}>
                      <CustomRadioButton
                        label={'No Preference'}
                        selected={expected_duration_of_stay == 'No Preference'}
                        onSelect={() =>
                          setExpected_duration_of_stay('No Preference')
                        }
                      />
                    </View>
                  </View>
                  <View>
                    <Text style={styles.heading}>Any special requirements</Text>
                    <View
                      style={[styles.DescriptionContainer, styles.Carpetarea]}>
                      <TextInput
                        placeholderTextColor={'#000'}
                        style={styles.DescriptionAreaInput}
                        multiline
                        numberOfLines={4}
                        value={special_requirement}
                        onChangeText={setSpecial_requirement}
                        placeholder="Tell us your special requirements here..."
                      />
                    </View>
                  </View>
                </View>
                {nextpreButtons(6, 8)}
              </View>
            )}
          </View>
        )}
        {pageNumber == 8 && (
          <View>
            <View style={styles.videoPreviewCantainer}>
              {/* {video?.uri && (
                  <Video
                    source={{ uri: video?.uri }}
                    style={{
                      width: WIDTH - 30,
                      height: 300,
                      justifyContent: "center",
                      backgroundColor: "#fff",
                      shadowColor: "#000",
                      borderRadius: 8,
                      shadowOffset: {
                        width: 0,
                        height: 2,
                      },
                      shadowOpacity: 0.23,
                      shadowRadius: 2.62,
  
                      elevation: 3,
                    }}
                    resizeMode="contain"
                    shouldPlay
                    isLooping
                  />
                )} */}
            </View>
            <View>
              <Text style={styles.heading}>Upload Property Video</Text>
              <Text style={{fontSize: 12}}>
                ( Please upload property video less than 40MB)
              </Text>
              {/* <VideoCapture setVideo={setVideo} /> */}
            </View>
            <View>
              {images &&
                images.map((item, idx) => (
                  <View key={item.assetId + idx} style={styles.imagescantainer}>
                    <Image
                      style={styles.propertyPic}
                      source={{
                        uri: item.uri,
                      }}
                    />
                    <View>
                      <CustomRadioButton
                        label={'Cover Photo'}
                        selected={make_display_image == item.assetId}
                        onSelect={() => setMake_display_image(item.assetId)}
                      />
                      <TouchableOpacity
                        onPress={() => removeImg(idx)}
                        style={{
                          backgroundColor: '#2196f3',
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderRadius: 8,
                          marginVertical: 20,
                          marginHorizontal: 30,
                          height: 50,
                        }}>
                        <Text
                          style={{
                            padding: 10,
                            textTransform: 'capitalize',
                            color: '#fff',
                            fontSize: 18,
                          }}>
                          Remove
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
            </View>
            <View style={{marginVertical: 20}}>
              <Text style={{fontSize: 12}}>
                ( Please upload property images less than 15 images)
              </Text>
              {/* <ImageUpload setImages={setImages} /> */}
            </View>

            <View style={styles.buttonCantainer}>
              <TouchableOpacity
                style={styles.Button}
                onPress={() => setPageNumber(1)}>
                <Text
                  style={{
                    textTransform: 'capitalize',
                    color: '#fff',
                    fontSize: 18,
                  }}>
                  Preview
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.Button}
                onPress={() => submitProperty}>
                <Text
                  style={{
                    textTransform: 'capitalize',
                    color: '#fff',
                    fontSize: 18,
                  }}>
                  Submit
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default Sell;

const styles = StyleSheet.create({
  gap: {
    marginTop: 10,
  },
  heading: {
    fontSize: 18,
    padding: 10,
    textTransform: 'capitalize',
    marginVertical: 20,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    color: '#000',
  },
  propertyPic: {
    width: '55%',
    height: 170,
    borderRadius: 6,
  },
  radioCaontainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    padding: 10,
    textTransform: 'capitalize',
    color: '#000',
  },
  radioCaontainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bedroomcontainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    width: 220,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginLeft: 20,
  },
  bedroompicker: {
    borderRadius: 4,
    padding: 10,
    width: 200,
    height: 40,
    color:"#000"
  },
  Saleablemaincontainer: {
    flexDirection: 'row',
    columnGap: 10,
    justifyContent: 'space-between',
  },
  Saleablecontainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    width: 150,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginRight: 10,
  },
  Saleablepicker: {
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
    width: 160,
    height: 40,
    color:"#000"
  },
  saleableAreaInput: {
    width: 180,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    borderRadius: 8,
    marginLeft: 20,
  },
  Carpetarea: {
    marginTop: 10,
  },
  DescriptionContainer: {
    alignItems: 'center',
  },
  DescriptionAreaInput: {
    width: '95%',
    padding: 10,
    height: 100,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  Flooringcontainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginHorizontal: 20,
  },
  buttonCantainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 30,
  },
  Button: {
    width: 100,
    padding: 12,
    borderRadius: 8,
    backgroundColor: 'blue',
  },
  DatePickerContainer: {
    flex: 1,
    justifyContent: 'center',
    margin: 30,
  },
  dateShowCantainer: {
    marginHorizontal: 30,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  addRoomForm: {
    flex: 1,
    height: 20,
    justifyContent: 'flex-end',
  },
  addRoommaincantainer: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    borderTopRightRadius: 8,
    paddingTop: 20,
    paddingBottom: 20,
    borderTopLeftRadius: 8,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 12,
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
  videoPreviewCantainer: {
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagescantainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    columnGap: 10,
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
  picker:{
    color:"#000"
  }
});