import { View, Text } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import TabNavigator from './user/TabNavigator';
import { DrawerCustom } from '../components';
import TabOgrNavigator from './organizer/TabOgrNavigator';

const DrawerNavigator = () => {
   const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator screenOptions={{
      headerShown: false,
      drawerPosition: 'left',
    }} drawerContent={props => <DrawerCustom {...props} />}>
      
      <Drawer.Screen name='Menu' component={TabOgrNavigator} />
    </Drawer.Navigator>
  )
}

export default DrawerNavigator