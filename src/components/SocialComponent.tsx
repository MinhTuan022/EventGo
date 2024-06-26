import AsyncStorage from '@react-native-async-storage/async-storage';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import messaging from '@react-native-firebase/messaging';
import React, {useState} from 'react';
import {LoginManager, Profile, Settings} from 'react-native-fbsdk-next';
import {Path, Rect, Svg} from 'react-native-svg';
import {useDispatch} from 'react-redux';
import {
  ButtonComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '.';
import authenticationAPI from '../apis/authApi';
import {addAuth, addFavoriteEvent} from '../redux/reducers/authReducer';
import {appColors} from '../utils/constants/appColors';
import LoadingModal from './modals/LoadingModal';
import { globalStyles } from '../styles/globalStyles';

GoogleSignin.configure({
  webClientId:
    process.env.GOOGLE_CLIENT_ID,
});

Settings.setAppID(`${process.env.FACEBOOK_APP_ID}`);

const SocialComponent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const api = '/login-social';

  
  

  const handleLoginWithGoogle = async () => {
    setIsLoading(true);
    try {

      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      const userInfo = await GoogleSignin.signIn();
      const currentToken = await messaging().getToken();

      await AsyncStorage.setItem('fcmToken', currentToken)
      const profile = userInfo.user;
      const data = {
        name: profile.name,
        firstname: profile.givenName,
        lastname: profile.familyName,
        email: profile.email,
        photo: profile.photo,
        fcmTokens: currentToken
      };
      const res = await authenticationAPI.HandleAuthentication(
        api,
        data,
        'post',
      );
      // console.log("aa",res.data);

      dispatch(
        addAuth({
          accessToken: res.data.accessToken,
          email: res.data.email,
          id: res.data.id,
          favorites: res.data.favorites,
          fcmTokens: res.data.fcmTokens

        }),
      );
      setIsLoading(false);
      await AsyncStorage.setItem(
        'auth',
        JSON.stringify({
          accessToken: res.data.accessToken,
          email: res.data.email,
          id: res.data.id,
          favorites: res.data.favorites,
        }),
      );
      // await AsyncStorage.setItem(
      //   'auth',
      //   JSON.stringify({
      //     // fcmTokens: 
      //   }),
      // );

    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const handleLoginWithFaceBook = async () => {
    try {
      const result = await LoginManager.logInWithPermissions([
        'public_profile',
      ]);
      const currentToken = await messaging().getToken();

      await AsyncStorage.setItem('fcmToken', currentToken)
      if (result.isCancelled) {
        console.log('Login Cancelled');
      } else {
        const profile = await Profile.getCurrentProfile();

        if (profile) {
          //   console.log(profile);
          const data = {
            name: profile.name,
            firstname: profile.firstName,
            lastname: profile.lastName,
            email: profile.userID,
            photo: profile.imageURL,
            fcmTokens: currentToken
          };
          //   console.log(data);
          const res = await authenticationAPI.HandleAuthentication(
            api,
            data,
            'post',
          );
          console.log("aa",res.data);
          dispatch(
            addAuth({
              accessToken: res.data.accessToken,
              email: res.data.email,
              id: res.data.id,
              favorites: res.data.favorites,
              fcmTokens: res.data.fcmTokens

            }),
          );

          await AsyncStorage.setItem(
            'auth',
            JSON.stringify({
              accessToken: res.data.accessToken,
              email: res.data.email,
              id: res.data.id,
              favorites: res.data.favorites,
              fcmTokens: res.data.fcmTokens
            }),
          );
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <SectionComponent styles={{alignItems: 'center'}}>
        <TextComponent
          text="Hoặc"
          color={appColors.gray2}
          styles={{textAlign: 'center'}}
        />
        <SpaceComponent height={16} />
        {/* <ButtonComponent text="Logout" onPress={() => GoogleSignin.signOut()} /> */}
        <ButtonComponent styles={globalStyles.shadow}
          onPress={handleLoginWithGoogle}
          textColor={appColors.text}
          color="white"
          text="Đăng nhập với Google"
          type="primary"
          iconLeft={
            <Svg width="26" height="26" viewBox="0 0 26 26" fill="none">
              <Path
                d="M13.0005 5.02721C14.8632 4.99855 16.6646 5.69251 18.0267 6.96346L21.6955 3.37596C19.3417 1.17039 16.2259 -0.0390273 13.0005 0.000960935C10.5905 0.000404079 8.22797 0.670256 6.17696 1.93561C4.12596 3.20096 2.46738 5.01192 1.38672 7.16596L5.59047 10.4297C6.10448 8.86678 7.09614 7.50463 8.42559 6.53535C9.75505 5.56607 11.3552 5.03856 13.0005 5.02721Z"
                fill="#E43E2B"
              />
              <Path
                d="M25.48 13.2901C25.4953 12.3964 25.403 11.5042 25.205 10.6326H13V15.4576H20.165C20.0291 16.3035 19.7235 17.1132 19.2666 17.838C18.8097 18.5628 18.2109 19.1877 17.5062 19.6751L21.6087 22.8526C22.8873 21.6182 23.8928 20.1293 24.5602 18.4822C25.2277 16.8351 25.5423 15.0663 25.4837 13.2901H25.48Z"
                fill="#3B7DED"
              />
              <Path
                d="M5.60543 15.5715C5.3212 14.7439 5.17467 13.8753 5.17168 13.0003C5.17686 12.1267 5.31814 11.2592 5.59043 10.429L1.38668 7.16528C0.47492 8.97545 0 10.9741 0 13.0009C0 15.0277 0.47492 17.0264 1.38668 18.8365L5.60543 15.5715Z"
                fill="#F0B501"
              />
              <Path
                d="M13.0004 26.0008C16.167 26.0903 19.2476 24.9635 21.6091 22.852L17.5066 19.6745C16.1764 20.5663 14.6011 21.0207 13.0004 20.9745C11.3565 20.9647 9.7575 20.4376 8.43013 19.4679C7.10275 18.4982 6.11443 17.1351 5.60536 15.572L1.40161 18.837C2.47936 20.9901 4.13522 22.8006 6.18375 24.0659C8.23229 25.3311 10.5926 26.0011 13.0004 26.0008Z"
                fill="#2BA24C"
              />
            </Svg>
          }
        />
        <SpaceComponent height={20} />
        <ButtonComponent styles={globalStyles.shadow}
          onPress={handleLoginWithFaceBook}
          textColor={appColors.text}
          color="white"
          text="Đăng nhập với Facebook"
          type="primary"
          iconLeft={
            <Svg width="31" height="31" viewBox="0 0 31 31" fill="none">
              <Rect
                width="30.7551"
                height="30.7551"
                rx="15.3776"
                fill="#1977F3"
              />
              <Path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M18.0967 30.515C17.2141 30.6725 16.3055 30.7547 15.3777 30.7547C14.5554 30.7547 13.7481 30.6901 12.9607 30.5658V20.2757H8.7876V15.5405H12.9607V11.9314C12.9607 7.82681 15.413 5.55884 19.1684 5.55884C20.4008 5.576 21.6303 5.68299 22.8471 5.87893V9.9105H20.7735C18.7322 9.9105 18.0967 11.1731 18.0967 12.4699V15.5412H22.6547L21.926 20.2757H18.0967V30.515Z"
                fill="white"
              />
            </Svg>
          }
        />
      </SectionComponent>
      <LoadingModal visible={isLoading} />
    </>
  );
};

export default SocialComponent;
