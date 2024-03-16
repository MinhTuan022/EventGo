import {ArrowLeft, Edit, Message, UserAdd} from 'iconsax-react-native';
import React, { useEffect, useState } from 'react';
import {Image, StatusBar, TouchableOpacity, View} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {
  ButtonComponent,
  RowComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';
import {appColors} from '../../utils/constants/appColors';
import {fontFamilies} from '../../utils/constants/fontFamilies';
import {useSelector} from 'react-redux';
import {authSelector} from '../../redux/reducers/authReducer';
import userAPI from '../../apis/userApi';

const MyProfileScreen = () => {
  const [following, setFollowing] = useState('');
  const [followers, setFollowers] = useState('');
  const user = useSelector(authSelector);
  // console.log(user.id);
  const userId = user.id;
  useEffect(() => {
    console.log(user.id);
    const hanndleUserEvent = async () => {
      try {
        const res = await userAPI.HandleUser(`/${userId}`);
        setFollowing(res.data.following.length);
        setFollowers(res.data.followers.length);
        // console.log(eventUser.length);
        // console.log(eventDetail);
      } catch (error) {
        console.log(error);
      }
    };
    hanndleUserEvent();
  }, [userId]);
  return (
    <View
      style={{
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        backgroundColor: 'white',
      }}>
      <StatusBar barStyle="dark-content" />
      <SpaceComponent height={10} />
      <View style={{paddingHorizontal: 20}}>
        <RowComponent styles={{justifyContent: 'space-between'}}>
          {/* <ArrowLeft size={24} color="black" /> */}
          <View></View>
          <Feather name="more-vertical" size={24} color="black" />
        </RowComponent>
        <SpaceComponent height={40} />
        <View style={{alignItems: 'center', justifyContent: 'center', }}>
          <Image
            source={{
              uri:
                user.photo ??
                'https://th.bing.com/th/id/OIG2.nyMz4YbxVu_XrMJ1mvcS?w=1024&h=1024&rs=1&pid=ImgDetMain',
            }}
            style={{borderRadius: 100, width: 96, height: 96,}}
          />
          <SpaceComponent height={20} />
          <TextComponent text={user.name} title />
        </View>
        <SpaceComponent height={20} />
        <RowComponent styles={{justifyContent: 'center'}}>
          <View style={{alignItems: 'center', paddingHorizontal: 30}}>
            <TextComponent text={following} font={fontFamilies.medium} size={16} />
            <TextComponent text="Following" />
          </View>
          <View
            style={{width: 1, height: 30, backgroundColor: appColors.gray}}
          />
          <View style={{alignItems: 'center', paddingHorizontal: 30}}>
            <TextComponent text={followers} font={fontFamilies.medium} size={16} />
            <TextComponent text="Followers" />
          </View>
        </RowComponent>
        <SpaceComponent height={20} />
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <ButtonComponent
            styles={{
              width: '48%',
              backgroundColor: 'white',
              borderColor: appColors.primary,
              borderWidth: 1,
            }}
            text="Edit Profile"
            textColor={appColors.primary}
            type="primary"
            icon={<Edit size={24} color={appColors.primary} />}
            iconFlex="left"
          />
        </View>
      </View>
    </View>
  );
};

export default MyProfileScreen;
