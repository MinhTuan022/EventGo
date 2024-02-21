import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  AddSquare,
  Calendar,
  Discover,
  Location,
  Map,
  Profile,
} from 'iconsax-react-native';
import React, {ReactNode} from 'react';
import EventScreen from '../screens/events/EventScreen';
import ExploerNavigator from './ExploreNavigator';
import MapNavigator from './MapNavigator';
import EventNavigator from './EventNavigator';
import ProfileNavigator from './ProfileNavigator';
import {appColors} from '../constants/appColors';
import {AddNewScreen} from '../screens';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {View} from 'react-native';
import {TextComponent} from '../components';

const TabNavigator = () => {
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
            case 'Explore':
              icon = <MaterialIcons name="explore" color={color} size={size} />;
              break;
            case 'Events':
              icon = <Calendar color={color} size={size} variant="Bold" />;
              break;
            case 'Map':
              icon = <Location color={color} size={size} variant="Bold" />;
              break;
            case 'Profile':
              icon = <Profile color={color} size={size} variant="Bold" />;
              break;
            case 'Add':
              icon = (
                <View
                  style={{
                    backgroundColor: appColors.primary,
                    width: 46,
                    height: 46,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 50,
                    borderRadius: 100,
                  }}>
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
        tabBarLabel ({focused}) {
          return route.name === 'Add' ? null : (
            <TextComponent
              text={route.name}
              size={12}
              color={focused ? appColors.primary : appColors.gray2}
            />
          );
        },
      })}>
      <Tab.Screen name="Explore" component={ExploerNavigator} />
      <Tab.Screen name="Events" component={EventNavigator} />
      <Tab.Screen name="Add" component={AddNewScreen} />
      <Tab.Screen name="Map" component={MapNavigator} />
      <Tab.Screen name="Profile" component={ProfileNavigator} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
