import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabOgrNavigator from './organizer/TabOgrNavigator';
import DrawerNavigator from './DrawerNavigator';

const MainOgzNavigator = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      
      {/* <Stack.Screen name="Menu" component={TabOgrNavigator} /> */}
      <Stack.Screen name='Draw' component={DrawerNavigator}/>

    </Stack.Navigator>
  )
}

export default MainOgzNavigator