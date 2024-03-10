import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ProfileScreen} from '../screens';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AboutComponent from '../screens/profiles/AboutComponent';
import ReviewsComponent from '../screens/profiles/ReviewsComponent';
import EventComponrnt from '../screens/profiles/EventComponrnt';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import { appColors } from '../constants/appColors';
import { fontFamilies } from '../constants/fontFamilies';

const ProfileNavigator = () => {
  const Stack = createNativeStackNavigator();
  const Tab = createMaterialTopTabNavigator();

  return (
    //  <Stack.Navigator screenOptions={{headerShown: false}}>
    //    <Stack.Screen name='ProfileScreen' component={ProfileScreen}/>
    //  </Stack.Navigator>
    <>
      <ProfileScreen />
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {shadowColor: 'white'},
          tabBarIndicatorStyle: {width: 60, marginLeft: 37},
          tabBarLabelStyle: {fontSize: 16, fontFamily: fontFamilies.medium},
          tabBarActiveTintColor: appColors.primary,
          tabBarInactiveTintColor: appColors.gray2,
          tabBarPressColor:'white',
          
        }}>
        <Tab.Screen name="About" component={AboutComponent} />
        <Tab.Screen name="Event" component={EventComponrnt} />
        <Tab.Screen name="Reviews" component={ReviewsComponent} />
      </Tab.Navigator>
    </>
  );
};

export default ProfileNavigator;
