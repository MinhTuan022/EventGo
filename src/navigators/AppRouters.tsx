import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import MainNavigator from './user/MainNavigator';
import AuthNavigator from './AuthNavigator';
import {useDispatch, useSelector} from 'react-redux';
import {addAuth, authSelector, removeAuth} from '../redux/reducers/authReducer';
import {SplashScreen} from '../screens';
import AsyncStorage, {
  useAsyncStorage,
} from '@react-native-async-storage/async-storage';

import Test from '../screens/Test';
import MainOgzNavigator from './organizer/MainOgzNavigator';
import {JwtPayload, jwtDecode} from 'jwt-decode';
import {decode} from 'base-64';
import userAPI from '../apis/userApi';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { LoginManager } from 'react-native-fbsdk-next';
import authenticationAPI from '../apis/authApi';
global.atob = decode;
interface DecodedToken {
  exp: number;
  [key: string]: any;
}
const AppRouters = () => {
  const [isShowSplash, setIsShowSplash] = useState(false);
  const [authentication, setAuthentication] = useState(false);
  const {getItem} = useAsyncStorage('auth');
  const auth = useSelector(authSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    checkAndUpdateAccessToken();
    // checkLogin();

    // checkToken();
  }, []);

  const checkLogin = async () => {
    try {
      setIsShowSplash(true);

      const res = await getItem();
      console.log('lala', res);
      if (res) {
        if (isJSONString(res)) {
          dispatch(addAuth(JSON.parse(res)));
        }
      }
      setIsShowSplash(false);
    } catch (error) {
      setIsShowSplash(false);

      if (error instanceof SyntaxError) {
        // Xử lý trường hợp parse JSON không thành công
        console.error('Error occurred while parsing JSON:', error);
      } else {
        // Xử lý các trường hợp khác
        console.error('Error occurred while checking login:', error);
      }
    }
  };
  const isAccessTokenValid = (accessToken: string) => {
    const decodedToken: DecodedToken = jwtDecode(accessToken);
    console.log('decode', decodedToken);
    if (!decodedToken) {
      return false;
    }
    const currentTime = Date.now() / 1000;
    return decodedToken.exp > currentTime + 60;
  };

  const updateAccessToken = async () => {
    try {
      // const newAccessToken = await fetchNewAccessToken();
      // Lưu accessToken mới vào AsyncStorage
      // await AsyncStorage.setItem('auth', JSON.stringify({ accessToken: newAccessToken }));
    } catch (error) {
      console.error('Error updating access token:', error);
    }
  };

  const getAccessTokenFromStorage = async () => {
    try {
      const authData = await AsyncStorage.getItem('auth');
      if (authData) {
        const {accessToken} = JSON.parse(authData);
        return accessToken;
      }
      return null;
    } catch (error) {
      console.error('Error getting access token from AsyncStorage:', error);
      return null;
    }
  };

  const checkAndUpdateAccessToken = async () => {
    try {
      setIsShowSplash(true);

      const authData = await AsyncStorage.getItem('auth');
      console.log(authData);
      if (authData) {
        const {accessToken} = JSON.parse(authData);
        if (accessToken && isAccessTokenValid(accessToken)) {
          // await updateAccessToken();
          if (isJSONString(authData)) {
            dispatch(addAuth(JSON.parse(authData)));
          }
          console.log('check2', accessToken);
        } 
        
        // else {
        //   const fcmToken = await AsyncStorage.getItem('fcmToken');
        //   console.log(fcmToken);
        //   await authenticationAPI.HandleAuthentication(
        //     '/delete-fcmToken',
        //     {fcmToken, userId: auth.id},
        //     'delete',
        //   );
        //   await GoogleSignin.signOut();
        //   LoginManager.logOut();
        //   dispatch(removeAuth());
        //   await AsyncStorage.removeItem('auth');
        //   await AsyncStorage.removeItem('fcmToken');
        // }
      }
      setIsShowSplash(false);
    } catch (error) {
      console.error('Error checking and updating access token:', error);
      setIsShowSplash(false);
    }
  };
  //   const checkToken = async () => {
  //     try {
  //       const res = await AsyncStorage.getItem('auth');
  // console.log(res)
  //       if (res) {
  //         const data = JSON.parse(res);
  // console.log("sda", data)
  //         if (data && data.accessToken) {
  //           const token: string = data.accessToken;
  //           console.log('haha', token);
  //           const currentTime = Date.now() / 1000;
  //           const decodedToken: DecodedToken = jwtDecode(token);
  //           console.log(decodedToken);
  //           if (decodedToken.exp > currentTime) {
  //             console.log("ád")
  //             if (isJSONString(res)) {
  //               dispatch(addAuth(JSON.parse(res)));
  //             }
  //             // dispatch(addAuth(res))
  //           } else {
  //             console.log('hết hạn');
  //             setAuthentication(false);
  //           }
  //         } else {
  //           setAuthentication(false); // Không tìm thấy accessToken trong dữ liệu
  //         }
  //       } else {
  //         setAuthentication(false); // Không tìm thấy dữ liệu trong AsyncStorage
  //       }
  //     } catch (error) {
  //       console.log('Lỗi khi lấy accessToken từ AsyncStorage: ', error);
  //       setAuthentication(false); // Xảy ra lỗi khi lấy dữ liệu từ AsyncStorage
  //     }
  //   };

  const isJSONString = (str: any) => {
    try {
      JSON.parse(str);
      return true;
    } catch (error) {
      return false;
    }
  };

  return (
    <>
      {isShowSplash ? (
        <SplashScreen />
      ) : auth.accessToken && auth.id && auth.organization ? (
        <MainOgzNavigator />
      ) : auth.accessToken && auth.id ? (
        <MainNavigator />
      ) : (
        <AuthNavigator />
      )}
    </>
  );
};

export default AppRouters;
