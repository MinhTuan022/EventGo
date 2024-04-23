import { View, Text } from 'react-native'
import React, { ReactNode } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { appColors } from '../../utils/constants/appColors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { AddSquare, Calendar, Location, Profile } from 'iconsax-react-native';
import { globalStyles } from '../../styles/globalStyles';
import { TextComponent } from '../../components';
import { AddNewEvent, ManageEventScreen } from '../../screens';
import HomeOrganizer from '../../screens/organizer/HomeOrganizer';
import test from '../../screens/Test';
import Test from '../../screens/Test';
import HomeOgzNavigator from './HomeOgzNavigator';
import ManageNavigator from './ProfileOgzNavigator';

const TabOgrNavigator = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarStyle: {
          height: 54,
          justifyContent: 'center',
          alignItems: 'center',
        },
        tabBarItemStyle: {
          paddingVertical: 7,
        },
        tabBarIcon: ({focused, color, size}) => {
          let icon: ReactNode;
          color = focused ? appColors.primary : appColors.gray2;
          size = 23;
          switch (route.name) {
            case 'Trang chủ':
              icon = <MaterialIcons name="home" color={color} size={size} />;
              break;
            case 'Thống kê':
              icon = <Calendar color={color} size={size} variant="Bold" />;
              break;
            case 'Sự kiện':
              icon = <Location color={color} size={size} variant="Bold" />;
              break;
            case 'Hồ sơ':
              icon = <Profile color={color} size={size} variant="Bold" />;
              break;
            case 'Tạo sự kiện':
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
                      marginBottom: focused ? 0 : 50,
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
        tabBarLabel({focused}) {
          return route.name === 'Tạo sự kiện' ? null : (
            <TextComponent
              text={route.name}
              size={12}
              color={focused ? appColors.primary : appColors.gray2}
            />
          );
        },
      })}>
      <Tab.Screen name="Trang chủ" component={HomeOgzNavigator} />
      <Tab.Screen name="Tạo sự kiện" component={AddNewEvent} />
      <Tab.Screen name="Hồ sơ" component={ManageNavigator} />
      {/* <Tab.Screen name="Sự kiện" component={Test} /> */}
      {/* <Tab.Screen name="Hồ sơ" component={test} /> */}
    </Tab.Navigator>
  )
}

export default TabOgrNavigator