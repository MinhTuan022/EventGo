import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { EditProfileScreen, MapScreen, MyProfileScreen } from '../screens';

const MyProfileNavigator = () => {
   const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name='MyProfileScreen' component={MyProfileScreen} />

      <Stack.Screen name='EditProfileScreen' component={EditProfileScreen} />
    </Stack.Navigator>
  )
}

export default MyProfileNavigator