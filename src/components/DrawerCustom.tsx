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
import {appColors} from '../constants/appColors';
import {fontFamilies} from '../constants/fontFamilies';
import {useDispatch, useSelector} from 'react-redux';
import {authSelector, removeAuth} from '../redux/reducers/authReducer';
import AsyncStorage, { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { LoginManager } from 'react-native-fbsdk-next';

const DrawerCustom = ({navigation}: any) => {
  const dispatch = useDispatch();
const user = useSelector(authSelector);
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
      icon: <Logout size={size} color={color} />,
      // onPress: () => dispatch(removeAuth({})),
    },
  ];

 
//   console.log(user)

  const handleLogOut = async () => {
    await GoogleSignin.signOut();
    await LoginManager.logOut();
    dispatch(removeAuth());
    await AsyncStorage.clear();
  };
  return (
    
    <View style={{paddingTop: StatusBar.currentHeight, paddingHorizontal: 20}}>
      <View>
        <Image
          style={{width: 45, height: 45, borderRadius: 100, marginBottom: 10}}
          source={{uri: user.photo}}
        />

        <TextComponent
          text={user.name}
          font={fontFamilies.medium}
          size={20}
        />
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
            />
          </RowComponent>
        )}
      />
      <ButtonComponent
        styles={{marginTop: 60, width: '70%', elevation: 0}}
        textColor="#00F8FF"
        color="#F2FFFF"
        iconFlex="left"
        icon={<Crown size={size} color="#00F8FF" />}
        type="primary"
        text="Upgrade Pro"
      />
    </View>
  );
};

export default DrawerCustom;
