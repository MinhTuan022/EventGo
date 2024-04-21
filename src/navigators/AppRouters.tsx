import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import MainNavigator from './MainNavigator';
import AuthNavigator from './AuthNavigator';
import {useDispatch, useSelector} from 'react-redux';
import {addAuth, authSelector} from '../redux/reducers/authReducer';
import {SplashScreen} from '../screens';
import AsyncStorage, {
  useAsyncStorage,
} from '@react-native-async-storage/async-storage';

import Test from '../screens/Test';
import MainOgzNavigator from './MainOgzNavigator';

const AppRouters = () => {
  const [isShowSplash, setIsShowSplash] = useState(true);
  const {getItem} = useAsyncStorage('auth');
  const auth = useSelector(authSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    checkLogin();
    const timeout = setTimeout(() => {
      setIsShowSplash(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  const checkLogin = async () => {
    try {
      const res = await getItem();
      // console.log(res)
      if (res) {
        if (isJSONString(res)) {
          dispatch(addAuth(JSON.parse(res)));
        }
      }

      console.log('cc', res);
    } catch (error) {
      if (error instanceof SyntaxError) {
        // Xử lý trường hợp parse JSON không thành công
        console.error('Error occurred while parsing JSON:', error);
      } else {
        // Xử lý các trường hợp khác
        console.error('Error occurred while checking login:', error);
      }
    }
  };
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
      ) : auth.accessToken && auth.organization ? (
        <MainOgzNavigator />
      ) : auth.accessToken ? (
        <MainNavigator />
      ) : (
        <AuthNavigator />
      )}
    </>
  );
};

export default AppRouters;
