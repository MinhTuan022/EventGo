import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeOrganizer from '../../screens/organizer/HomeOrganizer';
import { StatisticsScreen } from '../../screens';

const HomeOgzNavigator = () => {
  const Stack = createNativeStackNavigator();

  return (
   
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="HomeOgz" component={HomeOrganizer} />
      <Stack.Screen name="StatisticsScreen" component={StatisticsScreen} />

      
    </Stack.Navigator>
  );
}

export default HomeOgzNavigator
