import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeOrganizer from '../../screens/organizer/HomeOrganizer';
import {
  ChangePassword,
  EditProfileScreen,
  ManageEventScreen,
  MyProfileScreen,
  StatisticsScreen,
} from '../../screens';

const ManageNavigator = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="MyProfileScreen" component={MyProfileScreen} />
      <Stack.Screen name='EditProfileScreen' component={EditProfileScreen} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />


    </Stack.Navigator>
  );
};

export default ManageNavigator;
