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

const AppRouters = () => {
  const [isShowSplash, setIsShowSplash] = useState(true);
  const {getItem} = useAsyncStorage('auth');

  const auth = useSelector(authSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    checkLogin();
    const timeout = setTimeout(() => {
      setIsShowSplash(false);
    }, 1500);

    return () => clearTimeout(timeout);
  }, []);

  const checkLogin = async () => {
    const res = await getItem();
    res && dispatch(addAuth(JSON.parse(res)));
  };

  console.log(auth.accessToken);
  return (
    <>
      {isShowSplash ? (
        <SplashScreen />
      ) : auth.accessToken ? (
        <MainNavigator />
      ) : (
        <AuthNavigator />
      )}
    </>
  );
};

export default AppRouters;
