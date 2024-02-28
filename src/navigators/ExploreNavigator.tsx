import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {EventDetailScreen, HomeScreen} from '../screens';


const ExploerNavigator = () => {
  const Stack = createNativeStackNavigator();

  return (
   
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen   name='EventDetailScreen' component={EventDetailScreen}/>
    </Stack.Navigator>
  );
};

export default ExploerNavigator;
