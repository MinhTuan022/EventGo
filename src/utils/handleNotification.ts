import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import userAPI from '../apis/userApi';

export class HandleNotification {
  static checkNoticationPersion = async () => {
    const authStatus = await messaging().requestPermission();

    if (
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL
    ) {
      console.log(authStatus)
      this.getFcmToken();
    }
  };

  static getFcmToken = async () => {
    const fcmTokens = await AsyncStorage.getItem('fcmTokens');
    if (!fcmTokens) {
      const token = await messaging().getToken();

      if (token) {
        await AsyncStorage.setItem('fcmTokens', token);
        this.updateTokenForUser(token);
      }
    } else {
      console.log("mo")

      this.updateTokenForUser(fcmTokens);
    }
  };

  static updateTokenForUser = async (token: string) => {
    const res = await AsyncStorage.getItem('auth');
    console.log("lo", res)

    if (res) {
      const auth = JSON.parse(res);

      const {fcmTokens} = auth;

      if (fcmTokens && !fcmTokens.includes(token)) {
        fcmTokens.push(token);


        await this.Update(auth.id, fcmTokens);
      }
    }
  };

  static Update = async (id: string, fcmTokens: string[]) => {
    try {
      await userAPI.HandleUser(
        '/update-fcmtoken',
        {
          uid: id,
          fcmTokens,
        },
        'post',
      );
    } catch (error) {
      console.log(`Can not update tokens ${error}`);
    }
  };
}
