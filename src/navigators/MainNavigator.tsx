import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { AddNewEvent, EventDetailScreen, GoingScreen, InviteScreen, NotificationScreen, OrderDetail, OrderTickets, SearchScreen, SeeAllEvent, TicketDetailScreen } from '../screens';
import DrawerNavigator from './DrawerNavigator';
import ProfileNavigator from './ProfileNavigator';
import TabNavigator from './TabNavigator';
import { HandleNotification } from '../utils/handleNotification';


const MainNavigator = () => {
  const Stack = createNativeStackNavigator();
  // useEffect(() => {
  //   HandleNotification.checkNoticationPersion();
  // }, []);
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      
      <Stack.Screen name="Menu" component={TabNavigator} />
      <Stack.Screen name="EventDetail" component={EventDetailScreen} />
      <Stack.Screen name="ProfileNavigator" component={ProfileNavigator} />
      <Stack.Screen name='NotificationScreen' component={NotificationScreen}/>
      <Stack.Screen name='SearchScreen' component={SearchScreen}/>
      <Stack.Screen name='GoingScreen' component={GoingScreen}></Stack.Screen>
      <Stack.Screen name='OrderTickets' component={OrderTickets}/>
      <Stack.Screen name='OrderDetail' component={OrderDetail}/>
      <Stack.Screen name='TicketDetail' component={TicketDetailScreen}/>
      <Stack.Screen name='AddNewEvent' component={AddNewEvent}/>
      <Stack.Screen name='SeeAll' component={SeeAllEvent}/>
      <Stack.Screen name='Invite' component={InviteScreen}/>




      
    </Stack.Navigator>
  );
};

export default MainNavigator;
