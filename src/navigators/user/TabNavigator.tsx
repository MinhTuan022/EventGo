import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  AddSquare,
  Calendar,
  Discover,
  Heart,
  Home,
  Home2,
  Home3,
  Location,
  Map,
  Profile,
  Ticket,
  Ticket2,
} from 'iconsax-react-native';
import React, {ReactNode} from 'react';
import EventScreen from '../../screens/favorites/FavoriteScreen';
import HomeNavigator from './HomeNavigator';
import MapNavigator from './MapNavigator';
import  FavoriteNavigator from './FavoriteNavigator';
import ProfileNavigator from './ProfileNavigator';
import {appColors} from '../../utils/constants/appColors';
import {MyProfileScreen, TicketScreen} from '../../screens';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {View} from 'react-native';
import {TextComponent} from '../../components';
import {globalStyles} from '../../styles/globalStyles';
import MyProfileNavigator from './MyProfileNavigator';

const TabNavigator = () => {
  // const isUser = true
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
              // case 'Add':
              icon = (
                <View
                  style={[
                    globalStyles.shadow,
                    {
                      backgroundColor: appColors.primary,
                      width: 46,
                      height: 46,
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: 50,
                      borderRadius: 100,
                    },
                  ]}>
                  <AddSquare
                    color={appColors.white}
                    size={size}
                    variant="Bold"
                  />
                </View>
              );
              break;
          }
          return icon;
        },
        // tabBarLabel({focused}) {
        //   return route.name === 'Add' ? null : (
        //     <TextComponent
        //       text={route.name}
        //       size={12}
        //       color={focused ? appColors.primary : appColors.gray2}
        //     />
        //   );
        // },
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
