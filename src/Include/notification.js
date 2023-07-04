import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import {PermissionsAndroid} from 'react-native';

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    getToken();
    console.log('Authorization status:', authStatus);
  } else {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
    if (granted === PermissionsAndroid.RESULTS.POST_NOTIFICATIONS) {
      getToken();
      console.log('Authorization status:', authStatus);
    }
  }
}

async function getToken() {
  try {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    if (!fcmToken) {
      const token = await messaging().getToken();
      if (token) {
        console.log(token);
        await AsyncStorage.setItem('fcmToken', token);
      }
    }
  } catch (error) {
    console.log(error);
  }
}

export const notificationListener = async () => {
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
        setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
      }
    });

  messaging().onMessage(async remoteMessage => {
    console.log('forgrand msg', remoteMessage);
  });

  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage.notification,
    );
  });
};
