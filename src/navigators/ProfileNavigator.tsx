import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setProfileData } from '../redux/reducers/profileReducer';
import { ProfileScreen } from '../screens';
import AboutComponent from '../screens/profiles/AboutComponent';
import EventComponrnt from '../screens/profiles/EventComponrnt';
import ReviewsComponent from '../screens/profiles/ReviewsComponent';
import { appColors } from '../utils/constants/appColors';
import { fontFamilies } from '../utils/constants/fontFamilies';

const ProfileNavigator = ({route}: any) => {

  const [userId, setUserId] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    if (route.params) {
      // console.log(route.params);
      const uId = route.params.profileData._id;
      setUserId(uId);
    }
  }, [route.params]);
  useEffect(() => {
    dispatch(setProfileData({id: userId}));
  }, [dispatch, userId]);

  const Tab = createMaterialTopTabNavigator();

  return (
    <>
      <ProfileScreen />
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {shadowColor: 'white'},
          tabBarIndicatorStyle: {width: 60, marginLeft: 37},
          tabBarLabelStyle: {fontSize: 16, fontFamily: fontFamilies.medium},
          tabBarActiveTintColor: appColors.primary,
          tabBarInactiveTintColor: appColors.gray2,
          tabBarPressColor: 'white',
        }}>
        <Tab.Screen name="About" component={AboutComponent} />
        <Tab.Screen name="Event" component={EventComponrnt} />
        <Tab.Screen name="Reviews" component={ReviewsComponent} />
      </Tab.Navigator>
    </>
  );
};

export default ProfileNavigator;
