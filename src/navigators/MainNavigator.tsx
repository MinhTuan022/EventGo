import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import DrawerNavigator from './DrawerNavigator';
import {EventDetailScreen, MyProfileScreen, NotificationScreen, ProfileScreen, SearchScreen} from '../screens';
import ProfileNavigator from './ProfileNavigator';

const MainNavigator = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      
      <Stack.Screen name="Main" component={DrawerNavigator} />
      <Stack.Screen name="EventDetail" component={EventDetailScreen} />
      <Stack.Screen name="ProfileNavigator" component={ProfileNavigator} />
      <Stack.Screen name='NotificationScreen' component={NotificationScreen}/>
      <Stack.Screen name='SearchScreen' component={SearchScreen}/>
    </Stack.Navigator>
  );
};

export default MainNavigator;
