import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {ArrowLeft, Message, UserAdd} from 'iconsax-react-native';
import React, {useEffect, useState} from 'react';
import {Image, StatusBar, TouchableOpacity, View} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {
  ButtonComponent,
  RowComponent,
  SpaceComponent,
  TextComponent,
} from '../components';
import {UserModel} from '../models/UserModel';
import AboutComponent from '../screens/profiles/AboutComponent';
import EventComponrnt from '../screens/profiles/EventComponrnt';
import ReviewsComponent from '../screens/profiles/ReviewsComponent';
import {appColors} from '../utils/constants/appColors';
import {fontFamilies} from '../utils/constants/fontFamilies';
import userAPI from '../apis/userApi';
import {useSelector} from 'react-redux';
import {authSelector} from '../redux/reducers/authReducer';

const ProfileNavigator = ({route, navigation}: any) => {
  const {profiledata} = route.params;
  const [followers, setFollowers] = useState('');
  const [userId, setUserId] = useState(useSelector(authSelector).id);
  const [targetUserId, setTargetUserId] = useState(profiledata._id);
  const [isFollowing, setisFollowing] = useState(false);
  const [profile, setProfile] = useState<any>();

  const profileId = profiledata._id;

  useEffect(() => {
    const checkFollowing = async () => {
      try {
        const res = await userAPI.HandleUser(
          `/check-following?userId=${userId}&targetUserId=${targetUserId}`,
        );
        setisFollowing(res.data);
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    };

    checkFollowing();
  }, [userId, targetUserId]);
  useEffect(() => {
    if (targetUserId) {
      getProfile(targetUserId);
      // getFollowers(targetUserId);
    }
  }, [targetUserId]);

  const getProfile = async (id: string) => {
    try {
      const res = await userAPI.HandleUser(`/userId?userId=${id}`);
      setProfile(res.data);
      setFollowers(String(res.data.followers.length));
      // console.log(res.data.followers.length + 2)
    } catch (error) {
      console.log(error);
    }
  };
  // const getFollowers = async (id: string) => {
  //   try {
  //     const res = await userAPI.HandleUser(`/followers?targetUserId=${id}`);
  //     setFollowers(res.data);
  //     console.log(res.data)
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const handleFollow = async () => {
    try {
      // const targetUserId = item.organizer;
      const res = await userAPI.HandleUser(
        '/follow',
        {userId, targetUserId},
        'post',
      );

      setisFollowing(!isFollowing);
      setFollowers(res.data.followers);
      console.log(followers);
    } catch (error) {
      console.log(error);
    }
  };

  const Tab = createMaterialTopTabNavigator();

  return (
    <>
      <View
        style={{
          // flex: 1,
          paddingTop: StatusBar.currentHeight,
          backgroundColor: 'white',
          paddingVertical: 20,
        }}>
        <StatusBar barStyle="dark-content" />
        <SpaceComponent height={10} />
        <View style={{paddingHorizontal: 20}}>
          <RowComponent styles={{justifyContent: 'space-between'}}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <ArrowLeft size={24} color="black" />
            </TouchableOpacity>
            <View></View>
            <Feather name="more-vertical" size={24} color="black" />
          </RowComponent>
          <SpaceComponent height={40} />
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Image
              source={{
                uri:
                  profiledata.photo ??
                  'https://th.bing.com/th/id/OIG2.nyMz4YbxVu_XrMJ1mvcS?w=1024&h=1024&rs=1&pid=ImgDetMain',
              }}
              style={{borderRadius: 100, width: 96, height: 96}}
            />
            <SpaceComponent height={20} />
            <TextComponent text={profiledata ? profiledata.name : ''} title />
          </View>
          <SpaceComponent height={20} />
          <RowComponent styles={{justifyContent: 'center'}}>
            <View style={{alignItems: 'center', paddingHorizontal: 30}}>
              <TextComponent
                text={profile ? String(profile.following.length) : ''}
                font={fontFamilies.medium}
                size={16}
              />
              <TextComponent text="Following" />
            </View>
            <View
              style={{width: 1, height: 30, backgroundColor: appColors.gray}}
            />
            <View style={{alignItems: 'center', paddingHorizontal: 30}}>
              <TextComponent
                text={followers}
                font={fontFamilies.medium}
                size={16}
              />
              <TextComponent text="Followers" />
            </View>
          </RowComponent>
          <SpaceComponent height={20} />

          <RowComponent styles={{justifyContent: 'space-between'}}>
            <ButtonComponent
              onPress={handleFollow}
              styles={{width: '48%'}}
              text={!isFollowing ? 'Follow' : 'Following'}
              type="primary"
              icon={<UserAdd size={24} color="white" />}
              iconFlex="left"
            />
            <ButtonComponent
              styles={{
                width: '48%',
                backgroundColor: 'white',
                borderColor: appColors.primary,
                borderWidth: 1,
              }}
              text="Massages"
              textColor={appColors.primary}
              type="primary"
              icon={<Message size={24} color={appColors.primary} />}
              iconFlex="left"
            />
          </RowComponent>
        </View>
      </View>

      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {shadowColor: 'white'},
          // tabBarIndicatorStyle: {width: 60, marginLeft: 37},
          tabBarLabelStyle: {fontSize: 16, fontFamily: fontFamilies.medium},
          tabBarActiveTintColor: appColors.primary,
          tabBarInactiveTintColor: appColors.gray2,
          tabBarPressColor: 'white',
        }}>
        <Tab.Screen name="About" component={AboutComponent} />
        <Tab.Screen
          name="Event"
          component={EventComponrnt}
          initialParams={profile ? profile.events : {}}
        />
        <Tab.Screen name="Reviews" component={ReviewsComponent} />
      </Tab.Navigator>
    </>
  );
};

export default ProfileNavigator;
