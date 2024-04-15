import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import LoginScreen from '../screens/auth/LoginScreen';
import OnBroadingScreen from '../screens/auth/OnBoardingScreen';
import SignUpScreen from '../screens/auth/SignUpScreen';
import VerificationScreen from '../screens/auth/VerificationScreen';
import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen';
import ResetPasswordScreen from '../screens/auth/ResetPasswordScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SplashScreen} from '../screens';
import { HandleNotification } from '../utils/handleNotification';

const AuthNavigator = () => {
  const Stack = createNativeStackNavigator();
  const [isShowSplash, setIsShowSplash] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkLogin();
  }, []);

  const checkLogin = async () => {
    try {
      const res = await AsyncStorage.getItem('auth');
      setIsAuthenticated(!!res);

      setIsShowSplash(false);
      console.log(isAuthenticated);
    } catch (error) {
      console.error('Error checking login status:', error);
    }
  };

  return (
    <>
      {isShowSplash ? (
        <SplashScreen />
      ) : (
        <Stack.Navigator screenOptions={{headerShown: false}}>
          {!isAuthenticated ? (
            <Stack.Screen
              name="OnBoardingScreen"
              component={OnBroadingScreen}
            />
          ) : null}

          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
          <Stack.Screen
            name="VerificationScreen"
            component={VerificationScreen}
          />
          <Stack.Screen
            name="ForgotPasswordScreen"
            component={ForgotPasswordScreen}
          />
          <Stack.Screen
            name="ResetPasswordScreen"
            component={ResetPasswordScreen}
          />
        </Stack.Navigator>
      )}
    </>
  );
};

export default AuthNavigator;
