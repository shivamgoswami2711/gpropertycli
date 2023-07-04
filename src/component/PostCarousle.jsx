import {
  FlatList,
  Modal,
  StyleSheet,
  BackHandler,
  View,
  Image,
  Dimensions,
} from 'react-native';
import VideoPlayer from 'react-native-video-controls';
import React, {useEffect, useRef, useState} from 'react';
import {ReactNativeZoomableView} from '@openspacelabs/react-native-zoomable-view';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const PostCarousle = ({contactModal, images, navigation, setCarouselModal}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  useEffect(() => {
    const backAction = () => {
      console.log('hello');
      setCarouselModal(null);
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  const onScroll = event => {
    const contentOffset = event.nativeEvent.contentOffset;
    const index = Math.round(contentOffset.x / Dimensions.get('window').width);
    setCurrentIndex(index);
  };

  const RenderItem = ({navgetion, item}) => {
    if (item.type === 'image') {
      return (
        // <ReactNativeZoomableView
        //   maxZoom={1.5}
        //   minZoom={0.5}
        //   //   zoomStep={0.5}
        //   initialZoom={1}
        //   //   bindToBorders={true}
        //   style={{
        //     padding: 10,
        //   }}>
          <Image
            source={item.source}
            style={{
              height: HEIGHT - 50,
              resizeMode: 'contain',
              backgroundColor: '#ccc',
              width: WIDTH,
            }}
          />
        // </ReactNativeZoomableView>
      );
    } else if (item.type === 'video') {
      return (
        <VideoPlayer
          navigator={navigation}
          tapAnywhereToPause={true}
          source={item.source}
          style={{height: 300, width: WIDTH, backgroundColor: '#ccc'}}
          resizeMode="contain"
        />
      );
    }
  };

  return (
    <Modal
      //   transparent={true}
      visible={contactModal !== null}
      onRequestClose={() => setCarouselModal(null)}>
      <View style={{flex: 1}}>
        <View style={[styles.LogoutCantainer, {backgroundColor: '#fff'}]}>
          <FlatList
            data={images}
            horizontal={true}
            pagingEnabled
            renderItem={({item, index}) => {
              return (
                <View key={index}>
                  <RenderItem navgetion={navigation} item={item} />
                </View>
              );
            }}
            ref={flatListRef}
            onScroll={onScroll}
          />
        </View>
        <View style={styles.indicatorContainer}>
          {images.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                index === currentIndex
                  ? styles.activeIndicator
                  : styles.inactiveIndicator,
              ]}
            />
          ))}
        </View>
      </View>
    </Modal>
  );
};

export default PostCarousle;

const styles = StyleSheet.create({
  LogoutCantainer: {
    width: WIDTH,
    height: HEIGHT - 50,
    // position: 'absolute',
    // top: 50,
    // right: 30,
    // width: 170,
    // height: 210,
    // columnGap: 10,
    // padding: 20,
    // borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'flex-start',
  },
  Logoutmenu: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  indicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activeIndicator: {
    backgroundColor: '#3959f7',
  },
  inactiveIndicator: {
    backgroundColor: 'gray',
  },
});
