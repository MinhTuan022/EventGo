import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  Discover,
  Heart,
  Home,
  Profile,
  Ticket
} from 'iconsax-react-native';
import React, { ReactNode } from 'react';
import { TicketScreen } from '../../screens';
import { appColors } from '../../utils/constants/appColors';
import FavoriteNavigator from './FavoriteNavigator';
import HomeNavigator from './HomeNavigator';
import MapNavigator from './MapNavigator';
import MyProfileNavigator from './MyProfileNavigator';

const TabNavigator = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        // tabBarShowLabel: false,
        tabBarStyle: {
          height: 54,
          justifyContent: 'center',
          alignItems: 'center',
        },
        tabBarItemStyle: {
          paddingVertical: 7,
        },
        tabBarIcon: ({focused, color, size, variant}: any) => {
          let icon: ReactNode;
          color = focused ? appColors.primary : appColors.gray2;
          size = 23;
          variant = focused ? 'Bold' : 'Linear';
          switch (route.name) {
            case 'Trang Chủ':
              icon = <Home color={color} size={size} variant={variant} />;
              break;
            case 'Ưu Thích':
              icon = <Heart color={color} size={size} variant={variant} />;
              break;
            case 'Khám Phá':
              icon = <Discover color={color} size={size} variant={variant} />;
              break;
            case 'Hồ Sơ':
              icon = <Profile color={color} size={size} variant={variant} />;
              break;
            case 'Vé':
              icon = <Ticket color={color} size={size} variant={variant} />;
              break;
          }
          return icon;
        },

      })}>
      <Tab.Screen name="Trang Chủ" component={HomeNavigator} />
      <Tab.Screen name="Ưu Thích" component={FavoriteNavigator} />
      <Tab.Screen name="Vé" component={TicketScreen} />
      <Tab.Screen name="Khám Phá" component={MapNavigator} />
      <Tab.Screen name="Hồ Sơ" component={MyProfileNavigator} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
