import { User } from 'iconsax-react-native';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, StatusBar, TouchableOpacity, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';
import notificationAPI from '../../apis/notificationApi';
import {
  HeaderComponent,
  RowComponent,
  SectionComponent,
  ShapeComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';
import { NotificationModel } from '../../models/NotificationModel';
import { AuthState, authSelector } from '../../redux/reducers/authReducer';
import { globalStyles } from '../../styles/globalStyles';
import { appColors } from '../../utils/constants/appColors';
import NotificationItem from './NotificationItem';

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
      setNotiList(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const setRead = async (id: string) => {
    try {
      await notificationAPI.HandleNotification('/isRead', {id}, 'put');
      getNoti()
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <View
      style={[globalStyles.container, {paddingTop: StatusBar.currentHeight}]}>
      <StatusBar barStyle="dark-content" />
      <HeaderComponent title="Thông báo" goBack />
      {notiList.length > 0 ? (
        <View style={{flex: 1}}>
          <FlatList
            data={notiList}
            renderItem={({item, index}) => (
              <NotificationItem key={index} onPress={() => setRead(item._id)} item={item}/>
            )}
          />
        </View>
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Image source={require('../../assets/images/noti.png')} />
        </View>
      )}
    </View>
  );
};

export default NotificationScreen;
