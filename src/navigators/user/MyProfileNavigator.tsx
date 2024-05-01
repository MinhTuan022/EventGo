import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  ChangePassword,
  EditProfileScreen,
  ManageEventScreen,
  MapScreen,
  MyProfileScreen,
  StatisticsScreen,
} from '../../screens';

const MyProfileNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="MyProfileScreen" component={MyProfileScreen} />
      <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
      <Stack.Screen name="ManageEventScreen" component={ManageEventScreen} />
      <Stack.Screen name="StatisticsScreen" component={StatisticsScreen} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
    </Stack.Navigator>
  );
};

export default MyProfileNavigator;
