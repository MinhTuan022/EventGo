import {View, Text, StatusBar, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {globalStyles} from '../../styles/globalStyles';
import {
  HeaderComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';
import {ArrowLeft} from 'iconsax-react-native';
import Feather from 'react-native-vector-icons/Feather';
import notificationAPI from '../../apis/notificationApi';
import {useSelector} from 'react-redux';
import {AuthState, authSelector} from '../../redux/reducers/authReducer';
import NotificationItem from './NotificationItem';
import {FlatList} from 'react-native';
import {NotificationModel} from '../../models/NotificationModel';

const NotificationScreen = ({navigation}: any) => {
  const user: AuthState = useSelector(authSelector);
  const [notiList, setNotiList] = useState<NotificationModel[]>([]);

  useEffect(() => {
    if (user) {
      getNoti();
    }
  }, [user]);
  const getNoti = async () => {
    try {
      const res = await notificationAPI.HandleNotification(
        `/?userId=${user.id}`,
      );
      console.log(res);
      setNotiList(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const setRead = async (id:string) => {
    try {
      await notificationAPI.HandleNotification("/isRead", {id}, 'put')
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <View
      style={[globalStyles.container, {paddingTop: StatusBar.currentHeight}]}>
      <StatusBar barStyle="dark-content" />
      <HeaderComponent title="Notification" goBack />
      {notiList.length > 0 ? (
        <View style={{flex: 1}}>
          <FlatList
            data={notiList}
            renderItem={({item, index}) => (
              <NotificationItem item={item} key={index} onPress={()=>setRead(item._id)} />
            )}
          />
        </View>
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center',}}>
          <Image source={require('../../assets/images/noti.png')} />
        </View>
      )}
    </View>
  );
};

export default NotificationScreen;
