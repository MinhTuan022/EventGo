import {User} from 'iconsax-react-native';
import React, {useEffect, useState} from 'react';
import {FlatList, Image, StatusBar, TouchableOpacity, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useSelector} from 'react-redux';
import notificationAPI from '../../apis/notificationApi';
import {
  HeaderComponent,
  RowComponent,
  SectionComponent,
  ShapeComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';
import {NotificationModel} from '../../models/NotificationModel';
import {AuthState, authSelector} from '../../redux/reducers/authReducer';
import {globalStyles} from '../../styles/globalStyles';
import {appColors} from '../../utils/constants/appColors';
import NotificationItem from './NotificationItem';
import LoadingModal from '../../components/modals/LoadingModal';
import LoadingComponent from '../../components/LoadingComponent';

const NotificationScreen = ({navigation}: any) => {
  const user: AuthState = useSelector(authSelector);
  const [notiList, setNotiList] = useState<NotificationModel[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      getNoti();
    }
  }, [user]);
  const getNoti = async () => {
    try {
      setIsLoading(true);
      const res = await notificationAPI.HandleNotification(
        `/?userId=${user.id}`,
      );
      setNotiList(res.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const setRead = async (id: string) => {
    try {
      await notificationAPI.HandleNotification('/isRead', {id}, 'put');
      getNoti();
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
              <NotificationItem
                key={index}
                onPress={() => setRead(item._id)}
                item={item}
              />
            )}
          />
        </View>
      ) : (
        // <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        //   <Image source={require('../../assets/images/nonoti.png')} style={{width:"100%", height:300}} resizeMode='cover'/>
        //   <TextComponent text='Không có thông báo nào' title size={18}/>
        // </View>

        <LoadingComponent
          mess="Không có thông báo nào"
          children={
            <Image
              source={require('../../assets/images/nonoti.png')}
              style={{width: '100%', height: 300}}
              resizeMode="cover"
            />
          }
          values={notiList.length}
          isLoading={isLoading}
        />
      )}

      {/* <LoadingModal backgd="white" visible={isLoading} /> */}
    </View>
  );
};

export default NotificationScreen;
