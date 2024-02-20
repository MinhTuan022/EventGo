import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import LoginScreen from '../screens/auth/LoginScreen';
import OnBroadingScreen from '../screens/auth/OnBoardingScreen';
import SignUpScreen from '../screens/auth/SignUpScreen';
import VerificationScreen from '../screens/auth/VerificationScreen';
import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen';
import ResetPasswordScreen from '../screens/auth/ResetPasswordScreen';

const AuthNavigator = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="OnBroadingScreen" component={OnBroadingScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
      <Stack.Screen name="VerificationScreen" component={VerificationScreen} />
      <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} />
      <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
