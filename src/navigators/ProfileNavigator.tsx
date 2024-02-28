import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ProfileScreen} from '../screens';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AboutComponent from '../screens/profiles/AboutComponent';
import ReviewsComponent from '../screens/profiles/ReviewsComponent';
import EventComponrnt from '../screens/profiles/EventComponrnt';

const ProfileNavigator = () => {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

  return (
    //  <Stack.Navigator screenOptions={{headerShown: false}}>
    //    <Stack.Screen name='ProfileScreen' component={ProfileScreen}/>
    //  </Stack.Navigator>
    <>
      <ProfileScreen />
      <Tab.Navigator screenOptions={{headerShown: false, tabBarActiveBackgroundColor:'coral', tabBarStyle: {}}}  >
        <Tab.Screen name="About" component={AboutComponent} />
        <Tab.Screen name="Event" component={EventComponrnt} />
        <Tab.Screen name="Reviews" component={ReviewsComponent} />
      </Tab.Navigator>
    </>
  );
};

export default ProfileNavigator;
