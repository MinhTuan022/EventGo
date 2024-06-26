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
import {
  Image,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  ButtonComponent,
  HeaderComponent,
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
import {HandleNotification} from '../../utils/handleNotification';
import {globalStyles} from '../../styles/globalStyles';
import organizerAPI from '../../apis/organizerApi';
import orderAPI from '../../apis/orderApi';
import authenticationAPI from '../../apis/authApi';

const MyProfileScreen = ({route, navigation}: any) => {
  const user = useSelector(authSelector);
  const [userData, setUserData] = useState<any>();
  const [events, setEvents] = useState([]);
  const [ticket, setTicket] = useState(0);
  const [eventFavorites, setEventFavorites] = useState<string[]>([]);

  const dispatch = useDispatch();

  useFocusEffect(
    React.useCallback(() => {
      handleProfile(user.id);
      getEvent();
      if (!user.organization) {
        getTicket();
        getIdFavorites();
      }
    }, [user.id]),
  );
  const handleLogOut = async () => {
    const fcmToken = await AsyncStorage.getItem('fcmToken');
    console.log(fcmToken);
    await authenticationAPI.HandleAuthentication(
      '/delete-fcmToken',
      {fcmToken, userId: user.id},
      'delete',
    );
    await GoogleSignin.signOut();
    LoginManager.logOut();
    dispatch(removeAuth());
    await AsyncStorage.removeItem('auth');
    await AsyncStorage.removeItem('fcmToken');
  };
  const handleProfile = async (id: any) => {
    try {
      if (user.organization) {
        const res = await organizerAPI.HandleOrganizer(`/byId?userId=${id}`);
        setUserData(res.data);
      } else {
        const res = await userAPI.HandleUser(`/userId?userId=${id}`);
        setUserData(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getEvent = async () => {
    try {
      const res = await eventAPI.HandleEvent(`/byOrganizer?id=${user.id}`);
      setEvents(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getTicket = async () => {
    try {
      const comp = await orderAPI.HandleOrder(
        `?userId=${user.id}&status=Completed`,
      );
      const paid = await orderAPI.HandleOrder(`?userId=${user.id}&status=Paid`);
      console.log(comp.data.length);

      setTicket(comp.data.length + paid.data.length);
      // console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getIdFavorites = async () => {
    try {
      const res = await userAPI.HandleUser(`/favorites?userId=${user.id}`);
      // console.log(res)
      setEventFavorites(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const test = async () => {
    console.log(user);
  };
  return (
    <View
      style={[globalStyles.container, {paddingTop: StatusBar.currentHeight}]}>
      <StatusBar barStyle="dark-content" />
      <HeaderComponent title="Hồ Sơ" />
      <View
        style={{
          paddingHorizontal: 20,
          flex: 1,
        }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <SpaceComponent height={20} />
          {userData && (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Image
                source={{
                  uri:
                    userData && userData.photo
                      ? userData.photo
                      : 'https://th.bing.com/th/id/OIP.DxdqBFLVLPcWsjkds8636QHaHf?rs=1&pid=ImgDetMain',
                }}
                style={{borderRadius: 100, width: 96, height: 96}}
              />
              <SpaceComponent height={20} />
              <TextComponent
                text={String(
                  userData.name ? userData.name : userData.organizationName,
                )}
                title
              />
            </View>
          )}
          <View
            style={{
              height: 0.5,
              backgroundColor: appColors.gray2,
              marginVertical: 20,
            }}
          />

          <RowComponent styles={{justifyContent: 'space-around'}}>
            {!user.organization ? (
              <>
                <TouchableOpacity
                  style={{alignItems: 'center', paddingHorizontal: 30}}
                  onPress={() => navigation.navigate('Ưu Thích')}>
                  <TextComponent
                    text={`${eventFavorites.length}`}
                    font={fontFamilies.medium}
                    size={25}
                  />
                  <TextComponent text="Thích" size={16} />
                </TouchableOpacity>
                <View
                  style={{
                    width: 1,
                    height: 30,
                    backgroundColor: appColors.gray,
                  }}
                />
                <TouchableOpacity
                  style={{alignItems: 'center', paddingHorizontal: 30}}
                  onPress={() => navigation.navigate('Vé')}>
                  <TextComponent
                    text={`${ticket}`}
                    font={fontFamilies.medium}
                    size={25}
                  />
                  <TextComponent text="Vé" size={16} />
                </TouchableOpacity>
                <View
                  style={{
                    width: 1,
                    height: 30,
                    backgroundColor: appColors.gray,
                  }}
                />
                <TouchableOpacity style={{alignItems: 'center', paddingHorizontal: 30}} onPress={() => navigation.navigate('Following', {ids: userData.following})}>
                  <TextComponent
                    text={String(userData?.following.length)}
                    font={fontFamilies.medium}
                    size={25}
                  />
                  <TextComponent text="Following" size={16} />
                </TouchableOpacity>
              </>
            ) : (
              <>
                <View style={{alignItems: 'center', paddingHorizontal: 30}}>
                  <TextComponent
                    text={`${events.length}`}
                    font={fontFamilies.medium}
                    size={25}
                  />
                  <TextComponent text="Sự kiện" size={16} />
                </View>
                <View
                  style={{
                    width: 1,
                    height: 30,
                    backgroundColor: appColors.gray,
                  }}
                />
                <View style={{alignItems: 'center', paddingHorizontal: 30}}>
                  <TextComponent
                    text={String(userData?.followers.length)}
                    font={fontFamilies.medium}
                    size={25}
                  />
                  <TextComponent text="Follower" size={16} />
                </View>
              </>
            )}
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
              navigation.navigate('EditProfileScreen', userData);
            }}
            text="Thông tin cá nhân"
            iconLeft={<Profile size={22} color="black" />}
            iconRight={<ArrowCircleRight size={22} color="black" />}
            type="primary"
            color="white"
            textColor="black"
            styles={localStyle.button}
            textStyle={{fontFamily: fontFamilies.medium}}
          />
          <ButtonComponent
            text="Bảo mật"
            iconLeft={<Security size={22} color="black" />}
            iconRight={<ArrowCircleRight size={22} color="black" />}
            type="primary"
            color="white"
            textColor="black"
            styles={localStyle.button}
            textStyle={{fontFamily: fontFamilies.medium}}
          />
          <ButtonComponent
            text="Thông báo"
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
            text="Ngôn ngữ"
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
            text="Chế độ"
            iconLeft={<Eye size={22} color="black" />}
            iconRight={<ArrowCircleRight size={22} color="black" />}
            type="primary"
            color="white"
            textColor="black"
            styles={localStyle.button}
            textStyle={{fontFamily: fontFamilies.medium}}
          />
          <ButtonComponent
            text="Trung tâm trợ giúp"
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
            text="Đăng xuất"
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
    </View>
  );
};

const localStyle = StyleSheet.create({
  button: {width: '100%', paddingVertical: 10, paddingHorizontal: 0},
});
export default MyProfileScreen;
