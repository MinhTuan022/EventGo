import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { ArrowLeft, Message, UserAdd } from 'iconsax-react-native';
import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {
  ButtonComponent,
  EventItem,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';

import { useSelector } from 'react-redux';
import eventAPI from '../../apis/eventApi';
import organizerAPI from '../../apis/organizerApi';
import userAPI from '../../apis/userApi';
import { OrganizerModel } from '../../models/OrganizerModel';
import { authSelector } from '../../redux/reducers/authReducer';
import { appColors } from '../../utils/constants/appColors';
import { fontFamilies } from '../../utils/constants/fontFamilies';

const ProfileOganizer = ({route, navigation}: any) => {
  const {profiledata} = route.params;
  console.log(route.params)
  const [followers, setFollowers] = useState('');
  const [userId, setUserId] = useState(useSelector(authSelector).id);
  const [targetUserId, setTargetUserId] = useState(profiledata);
  const [events, setEvents] = useState([]);
  const [selected, setSelected] = useState('about');
  const [isFollowing, setisFollowing] = useState(false);
  const [profile, setProfile] = useState<OrganizerModel>();
  const [name, setName] = useState('');

  const profileId = profiledata._id;

  const data = [
    {name: 'Tiểu sử', val: 'about'},
    {name: 'Sự kiện', val: 'event'},
    {name: 'Bộ sưu tập', val: 'collection'},
  ];
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
      getEvent();
    }
  }, [targetUserId]);

  const getProfile = async (id: string) => {
    try {
      const res = await organizerAPI.HandleOrganizer(`/byId?userId=${id}`);
      setProfile(res.data);
      setFollowers(String(res.data.followers.length));
      setName(res.data.name)
      // console.log(res.data.followers.length + 2)
    } catch (error) {
      console.log(error);
    }
  };

  const getEvent = async () => {
    try {
      const res = await eventAPI.HandleEvent(`/byOrganizer?id=${profiledata}`);
      setEvents(res.data);
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
          flex: 1,
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
            {profile &&
            <Image
              source={{
                uri:
                  profile.photo ??
                  'https://th.bing.com/th/id/OIG2.nyMz4YbxVu_XrMJ1mvcS?w=1024&h=1024&rs=1&pid=ImgDetMain',
              }}
              style={{borderRadius: 100, width: 96, height: 96}}
            />}
            <SpaceComponent height={20} />
            <TextComponent text={name} title />
          </View>
          <SpaceComponent height={20} />
          <RowComponent styles={{justifyContent: 'center'}}>
            <View style={{alignItems: 'center', paddingHorizontal: 30}}>
              <TextComponent
                text={profile ? String(events.length) : ''}
                font={fontFamilies.medium}
                size={16}
              />
              <TextComponent text="Sự kiện" />
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
              iconLeft={<UserAdd size={24} color="white" />}
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
              iconLeft={<Message size={24} color={appColors.primary} />}
            />
          </RowComponent>
        </View>
        <SpaceComponent height={20} />
        <RowComponent styles={{justifyContent: 'center'}}>
          {data.map((item: any, index: any) => (
            <TouchableOpacity
              onPress={() => setSelected(item.val)}
              key={index}
              style={[
                localStyle.touchableOpacity,
                selected === item.val && localStyle.selectedTouchableOpacity,
              ]}>
              <TextComponent
                size={20}
                text={item.name}
                color={
                  selected === item.val ? appColors.primary : appColors.gray2
                }
                font={fontFamilies.medium}
              />
            </TouchableOpacity>
          ))}
        </RowComponent>
        {selected === 'about' && (
          <SectionComponent>
            <TextComponent text={profile ? profile.about : ''} />
          </SectionComponent>
        )}
        {selected === 'event' && (
          <SectionComponent styles={{flex: 1}}>
          {events.length !== 0 ? (
            <FlatList
              data={events}
              renderItem={({item, index}:any) => (
                <EventItem styles={{width: Dimensions.get('window').width * 0.86}} item={item} type="list" />
              )}
            />
          ) : (
            <View
              style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
              <TextComponent
                text="Người dùng chưa tạo sự kiện nào"
                size={18}
                color={appColors.gray2}
              />
            </View>
          )}
        </SectionComponent>
        )}
        {selected === 'collection' && (
          <></>
        )}
      </View>

    </>
  );
};
const localStyle = StyleSheet.create({
  touchableOpacity: {
    flex: 1,
    paddingBottom: 7,
    paddingHorizontal: 10,
    alignItems: 'center',
    borderBottomColor: appColors.gray2,
    borderBottomWidth: 1,
  },
  selectedTouchableOpacity: {
    color: 'blue',
    borderBottomColor: 'blue', // Màu của border khi được chọn
    borderBottomWidth: 2, // Độ dày của border khi được chọn
  },
});
export default ProfileOganizer;
