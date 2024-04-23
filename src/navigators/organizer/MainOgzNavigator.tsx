import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabOgrNavigator from './TabOgrNavigator';
import DrawerNavigator from '../DrawerNavigator';
import { EventDetailScreen, NotificationScreen } from '../../screens';
import EditEventScreen from '../../screens/organizer/EditEventScreen';

const MainOgzNavigator = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      
      {/* <Stack.Screen name="Menu" component={TabOgrNavigator} /> */}
      <Stack.Screen name='Draw' component={TabOgrNavigator}/>
      <Stack.Screen name='NotificationScreen' component={NotificationScreen}/>
      <Stack.Screen name='EditEventScreen' component={EventDetailScreen}/>



    </Stack.Navigator>
  )
}

export default MainOgzNavigator