import {
  ArrowCircleLeft,
  ArrowCircleRight,
  Calendar,
  Edit,
  Eye,
  Information,
  LanguageCircle,
  Logout,
  Message,
  Notification,
  Profile,
  Security,
  Ticket,
} from 'iconsax-react-native';
import React, {useEffect, useState} from 'react';
import {Image, ScrollView, StatusBar, View} from 'react-native';
import {
  ButtonComponent,
  RowComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';
import {appColors} from '../../utils/constants/appColors';
import {fontFamilies} from '../../utils/constants/fontFamilies';
import {StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  AuthState,
  authSelector,
  removeAuth,
} from '../../redux/reducers/authReducer';
import userAPI from '../../apis/userApi';
import {UserModel} from '../../models/UserModel';
import {useFocusEffect} from '@react-navigation/native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {LoginManager} from 'react-native-fbsdk-next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import eventAPI from '../../apis/eventApi';

const MyProfileScreen = ({route, navigation}: any) => {
  const user: AuthState = useSelector(authSelector);
  const [userData, setUserData] = useState<UserModel>();
  const dispatch = useDispatch();

  useFocusEffect(
    React.useCallback(() => {
      handleProfile(user.id);
    }, [user.id]),
  );
  const handleLogOut = async () => {
    const fcmtoken = await AsyncStorage.getItem('fcmtoken');
    if (fcmtoken) {
      if (user.fcmTokens && user.fcmTokens.length > 0) {
        const items = [...user.fcmTokens];
        const index = items.findIndex(element => element === fcmtoken);

        if (index !== -1) {
          items.splice(index, 1);
        }
      }
    }
    await GoogleSignin.signOut();
    LoginManager.logOut();
    dispatch(removeAuth());
    await AsyncStorage.removeItem('auth');
  };
  const handleProfile = async (id: any) => {
    try {
      const res = await userAPI.HandleUser(`/userId?userId=${id}`);
      setUserData(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const test = async () => {
    console.log(user);
  };
  const data = [
    {
      tittle: 'Manage Events',
      iconLeft: <Calendar size={22} color="black" />,
      iconRight: <ArrowCircleRight size={22} color="black" />,
    },
    {
      tittle: 'Message Center',
      iconLeft: <Calendar size={22} color="black" />,
      iconRight: <ArrowCircleRight size={22} color="black" />,
    },
    {
      tittle: 'Profile',
      iconLeft: <Calendar size={22} color="black" />,
      iconRight: <ArrowCircleRight size={22} color="black" />,
    },
    {
      tittle: 'Notification',
      iconLeft: <Calendar size={22} color="black" />,
      iconRight: <ArrowCircleRight size={22} color="black" />,
    },
    {
      tittle: 'Payment',
      iconLeft: <Calendar size={22} color="black" />,
      iconRight: <ArrowCircleRight size={22} color="black" />,
    },
    {
      tittle: 'Security',
      iconLeft: <Calendar size={22} color="black" />,
      iconRight: <ArrowCircleRight size={22} color="black" />,
    },
    {
      tittle: 'Language',
      iconLeft: <Calendar size={22} color="black" />,
      iconRight: <ArrowCircleRight size={22} color="black" />,
    },
    {
      tittle: 'Dark Mode',
      iconLeft: <Calendar size={22} color="black" />,
      iconRight: <ArrowCircleRight size={22} color="black" />,
    },
    {
      tittle: 'Help Center',
      iconLeft: <Calendar size={22} color="black" />,
      iconRight: <ArrowCircleRight size={22} color="black" />,
    },
  ];
  return (
    <View
      style={{
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        backgroundColor: 'white',
        paddingHorizontal: 20,
      }}>
      <StatusBar barStyle="dark-content" />
      <SpaceComponent height={10} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{alignItems: 'center'}}>
          <TextComponent
            text="MyProfile"
            title
            size={20}
            font={fontFamilies.bold}
          />
        </View>
        <SpaceComponent height={40} />
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Image
            source={{
              uri: userData
                ? userData.photo
                : 'https://www.pexels.com/photo/shallow-focus-photography-of-gray-cat-in-box-3389528/',
            }}
            style={{borderRadius: 100, width: 96, height: 96}}
          />
          <SpaceComponent height={20} />
          <TextComponent text={String(userData?.name)} title />
        </View>
        {/* <SpaceComponent height={20} /> */}
        <View
          style={{
            height: 0.5,
            backgroundColor: appColors.gray2,
            marginVertical: 20,
          }}
        />

        <RowComponent styles={{justifyContent: 'center'}}>
          <View style={{alignItems: 'center', paddingHorizontal: 30}}>
            <TextComponent text={``} font={fontFamilies.medium} size={18} />
            <TextComponent text="Events" />
          </View>
          <View
            style={{width: 1, height: 30, backgroundColor: appColors.gray}}
          />
          <View style={{alignItems: 'center', paddingHorizontal: 30}}>
            <TextComponent
              text={String(userData?.following.length)}
              font={fontFamilies.medium}
              size={18}
            />
            <TextComponent text="Following" />
          </View>
          <View
            style={{width: 1, height: 30, backgroundColor: appColors.gray}}
          />
          <View style={{alignItems: 'center', paddingHorizontal: 30}}>
            <TextComponent
              text={String(userData?.followers.length)}
              font={fontFamilies.medium}
              size={18}
            />
            <TextComponent text="Followers" />
          </View>
        </RowComponent>
        <View
          style={{
            height: 0.5,
            backgroundColor: appColors.gray2,
            marginVertical: 20,
          }}
        />
        <ButtonComponent
          onPress={() => {
            navigation.navigate('ManageEventScreen');
          }}
          text="Manage Events"
          iconLeft={<Calendar size={22} color="black" />}
          iconRight={<ArrowCircleRight size={22} color="black" />}
          type="primary"
          color="white"
          textColor="black"
          styles={localStyle.button}
          textStyle={{fontFamily: fontFamilies.medium}}
        />
        <ButtonComponent
          text="Message Center"
          iconLeft={<Message size={22} color="black" />}
          iconRight={<ArrowCircleRight size={22} color="black" />}
          type="primary"
          color="white"
          textColor="black"
          styles={localStyle.button}
          textStyle={{fontFamily: fontFamilies.medium}}
        />
        <View
          style={{
            height: 0.5,
            backgroundColor: appColors.gray2,
            marginVertical: 10,
          }}
        />
        <ButtonComponent
          onPress={() => {
            navigation.navigate('EditProfileScreen', userData);
          }}
          text="Profile"
          iconLeft={<Profile size={22} color="black" />}
          iconRight={<ArrowCircleRight size={22} color="black" />}
          type="primary"
          color="white"
          textColor="black"
          styles={localStyle.button}
          textStyle={{fontFamily: fontFamilies.medium}}
        />
        <ButtonComponent
          text="Notification"
          iconLeft={<Notification size={22} color="black" />}
          iconRight={<ArrowCircleRight size={22} color="black" />}
          type="primary"
          color="white"
          textColor="black"
          styles={localStyle.button}
          textStyle={{fontFamily: fontFamilies.medium}}
        />
        <ButtonComponent
          text="Ticket Issues"
          iconLeft={<Ticket size={22} color="black" />}
          iconRight={<ArrowCircleRight size={22} color="black" />}
          type="primary"
          color="white"
          textColor="black"
          styles={localStyle.button}
          textStyle={{fontFamily: fontFamilies.medium}}
        />
        <ButtonComponent
          text="Security"
          iconLeft={<Security size={22} color="black" />}
          iconRight={<ArrowCircleRight size={22} color="black" />}
          type="primary"
          color="white"
          textColor="black"
          styles={localStyle.button}
          textStyle={{fontFamily: fontFamilies.medium}}
        />
        <ButtonComponent
          text="Language"
          iconLeft={<LanguageCircle size={22} color="black" />}
          iconRight={<ArrowCircleRight size={22} color="black" />}
          type="primary"
          color="white"
          textColor="black"
          styles={localStyle.button}
          textStyle={{fontFamily: fontFamilies.medium}}
        />
        <ButtonComponent
          onPress={test}
          text="Dark Mode"
          iconLeft={<Eye size={22} color="black" />}
          iconRight={<ArrowCircleRight size={22} color="black" />}
          type="primary"
          color="white"
          textColor="black"
          styles={localStyle.button}
          textStyle={{fontFamily: fontFamilies.medium}}
        />
        <ButtonComponent
          text="Help Center"
          iconLeft={<Information size={22} color="black" />}
          iconRight={<ArrowCircleRight size={22} color="black" />}
          type="primary"
          color="white"
          textColor="black"
          styles={localStyle.button}
          textStyle={{fontFamily: fontFamilies.medium}}
        />
        <ButtonComponent
          onPress={handleLogOut}
          text="Logout"
          iconLeft={<Logout size={22} color="red" />}
          // iconRight={<ArrowCircleRight size={22} color="black" />}
          type="primary"
          color="white"
          textColor="red"
          styles={[localStyle.button]}
          textStyle={{textAlign: 'auto', fontFamily: fontFamilies.medium}}
        />
      </ScrollView>
    </View>
  );
};

const localStyle = StyleSheet.create({
  button: {width: '100%', paddingVertical: 10, paddingHorizontal: 0},
});
export default MyProfileScreen;
