import { Edit, Message, UserAdd } from 'iconsax-react-native';
import React, { useEffect, useState } from 'react';
import { Image, StatusBar, View } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { useSelector } from 'react-redux';
import userAPI from '../../apis/userApi';
import {
  ButtonComponent,
  RowComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';
import { profileSelector } from '../../redux/reducers/profileReducer';
import { appColors } from '../../utils/constants/appColors';
import { fontFamilies } from '../../utils/constants/fontFamilies';


const ProfileScreen = () => {
  const profile = useSelector(profileSelector);
  const [photo, setPhoto] = useState(
    'https://th.bing.com/th/id/OIG2.nyMz4YbxVu_XrMJ1mvcS?w=1024&h=1024&rs=1&pid=ImgDetMain',
  );
  // const [userData, setUserData] = useState<any>();

  const [name, setName] = useState('');
  const [following, setFollowing] = useState('');
  const [followers, setFollowers] = useState('');
  const profileId = profile.id;
  useEffect(() => {
    const hanndleUserEvent = async () => {
      try {
        const res = await userAPI.HandleUser(`/${profileId}`);
        // setUserData(res.data);
        setPhoto(res.data.photo);
        setName(res.data.name);
        setFollowing(res.data.following.length);
        setFollowers(res.data.followers.length);
      } catch (error) {
        console.log(error);
      }
    };
    hanndleUserEvent();
  }, [profileId]);

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
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Image
            source={{
              uri:
                photo ??
                'https://th.bing.com/th/id/OIG2.nyMz4YbxVu_XrMJ1mvcS?w=1024&h=1024&rs=1&pid=ImgDetMain',
            }}
            style={{borderRadius: 100, width: 96, height: 96}}
          />
          <SpaceComponent height={20} />
          <TextComponent text={name} title />
        </View>
        <SpaceComponent height={20} />
        <RowComponent styles={{justifyContent: 'center'}}>
          <View style={{alignItems: 'center', paddingHorizontal: 30}}>
            <TextComponent
              text={following}
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
            styles={{width: '48%'}}
            text="Follow"
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
  );
};

export default ProfileScreen;
