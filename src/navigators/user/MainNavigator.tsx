import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { AddNewEvent, EventDetailScreen, GoingScreen, InviteScreen, NotificationScreen, OrderDetail, OrderTickets, SearchScreen, SeeAllEvent, TicketDetailScreen } from '../../screens';
import ProfileOganizer from '../../screens/profiles/ProfileOganizer';
import TabNavigator from './TabNavigator';


const MainNavigator = () => {
  const Stack = createNativeStackNavigator();
  // useEffect(() => {
  //   HandleNotification.checkNoticationPersion();
  // }, []);
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      
      <Stack.Screen name="Menu" component={TabNavigator} />
      <Stack.Screen name="EventDetail" component={EventDetailScreen} />
      <Stack.Screen name="ProfileOganizer" component={ProfileOganizer} />
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
