import {
  Bookmark2,
  Calendar,
  Crown,
  Logout,
  Message2,
  MessageQuestion,
  Setting2,
  Sms,
  User,
} from 'iconsax-react-native';
import React from 'react';
import {FlatList, Image, StatusBar, View} from 'react-native';
import {ButtonComponent, RowComponent, ShapeComponent, TextComponent} from '.';
import {appColors} from '../utils/constants/appColors';
import {fontFamilies} from '../utils/constants/fontFamilies';
import {useDispatch, useSelector} from 'react-redux';
import {authSelector, removeAuth} from '../redux/reducers/authReducer';
import AsyncStorage, {
  useAsyncStorage,
} from '@react-native-async-storage/async-storage';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {LoginManager} from 'react-native-fbsdk-next';
import userAPI from '../apis/userApi';

const DrawerCustom = ({navigation}: any) => {
  const dispatch = useDispatch();
  const user = useSelector(authSelector);
  // console.log("hii",user)
  const size = 20;
  const color = appColors.gray;
  const profileMenu = [
    {
      key: 'MyProfile',
      title: 'My Profile',
      icon: <User size={size} color={color} />,
    },
    {
      key: 'Message',
      title: 'Message',
      icon: <Message2 size={size} color={color} />,
    },
    {
      key: 'Calendar',
      title: 'Calendar',
      icon: <Calendar size={size} color={color} />,
    },
    {
      key: 'Bookmark',
      title: 'Bookmark',
      icon: <Bookmark2 size={size} color={color} />,
    },
    {
      key: 'ContactUs',
      title: 'Contact Us',
      icon: <Sms size={size} color={color} />,
    },
    {
      key: 'Settings',
      title: 'Settings',
      icon: <Setting2 size={size} color={color} />,
    },
    {
      key: 'HelpAndFAQs',
      title: 'Help & FAQs',
      icon: <MessageQuestion size={size} color={color} />,
    },
    {
      key: 'SignOut',
      title: 'Sign Out',
      icon: <Logout size={size} color={"red"} />,
      // onPress: () => dispatch(removeAuth({})),
    },
  ];

  //   console.log(user)

  const handleLogOut = async () => {
    const fcmToken = await AsyncStorage.getItem('fcmToken');
    console.log(fcmToken)
    await userAPI.HandleUser("/delete-fcmToken", {fcmToken, userId: user.id}, 'delete')
    await GoogleSignin.signOut();
    LoginManager.logOut();
    dispatch(removeAuth());
    await AsyncStorage.clear();

  };
  return (
    <View style={{paddingTop: StatusBar.currentHeight, paddingHorizontal: 20}}>
      <View>
        <Image
          style={{width: 45, height: 45, borderRadius: 100, marginBottom: 10}}
          source={{
            uri: user.photo
              ? user.photo
              : 'https://images.pexels.com/photos/20568187/pexels-photo-20568187/free-photo-of-l-nh-tuy-t-th-i-trang-nh-ng-ng-i.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          }}
        />

        <TextComponent text={user.name} font={fontFamilies.medium} size={20} />
      </View>
      <FlatList
        style={{marginVertical: 30}}
        data={profileMenu}
        renderItem={({item, index}) => (
          <RowComponent
            styles={{padding: 20}}
            onPress={
              item.key === 'SignOut'
                ? () => handleLogOut()
                : () => {
                    console.log(item.key);
                  }
            }>
            {item.icon}
            <TextComponent
              font={fontFamilies.regular}
              styles={{paddingLeft: 10}}
              text={item.title}
              color={item.key === 'SignOut' ? 'red' : 'black'}
            />
          </RowComponent>
        )}
      />
    </View>
  );
};

export default DrawerCustom;
