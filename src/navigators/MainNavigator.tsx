import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import DrawerNavigator from './DrawerNavigator';
import {EventDetailScreen, NotificationScreen, SearchScreen} from '../screens';

const MainNavigator = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      
      <Stack.Screen name="Main" component={DrawerNavigator} />
      <Stack.Screen name="EventDetail" component={EventDetailScreen} />
      <Stack.Screen name='NotificationScreen' component={NotificationScreen}/>
      <Stack.Screen name='SearchScreen' component={SearchScreen}/>
    </Stack.Navigator>
  );
};

export default MainNavigator;
