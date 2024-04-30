import {
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Dimensions,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {globalStyles} from '../../styles/globalStyles';
import {appColors} from '../../utils/constants/appColors';
import {
  ButtonComponent,
  EventItem,
  RowComponent,
  SectionComponent,
  ShapeComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';
import {fontFamilies} from '../../utils/constants/fontFamilies';
import {Filter, Notification, SearchNormal} from 'iconsax-react-native';
import MemoAdd from '../../assets/svg/Add';

import eventAPI from '../../apis/eventApi';
import {useSelector} from 'react-redux';
import {authSelector} from '../../redux/reducers/authReducer';
import organizerAPI from '../../apis/organizerApi';
import {OrganizerModel} from '../../models/OrganizerModel';
import {useFocusEffect} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import messaging from '@react-native-firebase/messaging';
import notificationAPI from '../../apis/notificationApi';

const HomeOrganizer = ({navigation}: any) => {
  const auth = useSelector(authSelector);
  console.log(auth.id)
  const [userId, setuserId] = useState(auth.id);
  const [organizer, setOrganizer] = useState<OrganizerModel>();
  const [eventData, setEventData] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [greeting, setGreeting] = useState<string>('');
  const [isRead, setIsRead] = useState(false);

  useEffect(() => {
    messaging().onMessage(async (mess: any) => {
      Toast.show({
        text1: mess.notification.title,
        text2: mess.notification.body,
        onPress: () => {
          console.log(mess);
        },
      });
    });
  }, []);
  useFocusEffect(
    React.useCallback(() => {
      if (userId) {
        checkNoti();
        getEvent();
        getOrganizer();
        handleGreeting(currentTime);
      }
    }, [userId]),
  );
  const checkNoti = async () => {
    try {
      const res = await notificationAPI.HandleNotification(
        `/check?userId=${auth.id}`,
      );
      console.log("Asa",res)
      setIsRead(res.data);
    } catch (error) {
      console.log('vv', error);
    }
  };
  const handleGreeting = async (time: Date) => {
    const currentHour = time.getHours();
    const timeOfDay =
      currentHour < 12 ? 'sáng' : currentHour < 18 ? 'chiều' : 'tối';
    const greetingMessage = `Chào buổi ${timeOfDay}`;
    setGreeting(greetingMessage);
  };
  const getEvent = async () => {
    try {
      const res = await eventAPI.HandleEvent(`/byOrganizer?id=${userId}`);
      // console.log(res);
      setEventData(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getOrganizer = async () => {
    try {
      const res = await organizerAPI.HandleOrganizer(`/byId?userId=${auth.id}`);
      setOrganizer(res.data);
    } catch (error) {
      console.log('ff', error);
    }
  };
  return (
    <View
      style={[
        globalStyles.container,
        {
          backgroundColor: appColors.white2,
          paddingTop: StatusBar.currentHeight,
        },
      ]}>
      <SectionComponent>
        <RowComponent styles={{justifyContent: 'space-between'}}>
          <RowComponent>
            <Image
              source={{
                uri:
                  organizer && organizer.photo
                    ? organizer.photo
                    : 'https://th.bing.com/th/id/OIP.DxdqBFLVLPcWsjkds8636QHaHf?rs=1&pid=ImgDetMain',
              }}
              style={{
                width: 40,
                height: 40,
                borderRadius: 100,
                marginRight: 8,
              }}
            />
            <View>
              <TextComponent text={greeting} />
              {organizer && (
                <TextComponent
                  text={String(
                    organizer.name
                      ? organizer.name
                      : organizer.organizationName
                      ? organizer.organizationName
                      : '',
                  )}
                  font={fontFamilies.medium}
                  size={16}
                />
              )}
            </View>
          </RowComponent>
          <ShapeComponent
            styles={{
              backgroundColor: 'white',
              borderColor: appColors.gray2,
              borderWidth: 1,
            }}
            onPress={() => navigation.navigate('NotificationScreen')}>
            <View>
              <Notification size={18} color="black" />
              {isRead && (
                <View
                  style={{
                    backgroundColor: '#02E9FE',
                    width: 6,
                    height: 6,
                    borderRadius: 100,
                    position: 'absolute',
                    top: 1,
                    right: 1,
                  }}></View>
              )}
            </View>
          </ShapeComponent>
        </RowComponent>

        {/* <ButtonComponent
          onPress={() => {
            navigation.navigate('SearchScreen');
          }}
          text="Sự kiện nào bạn đang tìm kiếm"
          iconLeft={<SearchNormal size={22} color={appColors.gray2} />}
          iconRight={<Filter size={22} color={appColors.primary} />}
          type="primary"
          styles={{width: '100%', marginTop: 20}}
          color={'#F5F5F5'}
          textColor={appColors.gray2}
        /> */}
      </SectionComponent>
      <ScrollView>
        <SectionComponent>
          <RowComponent
            styles={{
              // marginTop: 40,
              justifyContent: 'space-between',
              // paddingHorizontal: 16,
            }}>
            <TextComponent text="Sự kiện đã tạo" title size={20} />
            <ButtonComponent
              onPress={() =>
                navigation.navigate('SeeAll', {
                  dataType: 'upcomming',
                })
              }
              type="link"
              text="Xem tất cả"
              textColor={appColors.primary}
              textStyle={{fontFamily: fontFamilies.medium}}
            />
          </RowComponent>
        </SectionComponent>

        <SectionComponent>
          <FlatList
          scrollEnabled={false}
            data={eventData}
            renderItem={({item, index}) => (
              <EventItem
                isManage
                item={item}
                type="list"
                styles={{width: Dimensions.get('window').width * 0.86}}
              />
            )}></FlatList>
        </SectionComponent>
      </ScrollView>

      <Toast />
    </View>
  );
};
const localStyle = StyleSheet.create({
  button: {width: '100%', paddingVertical: 10, paddingHorizontal: 0},
  touch: {
    backgroundColor: appColors.purple2,
    width: '40%',
    height: 130,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
  },
  shape: {},
});
export default HomeOrganizer;
