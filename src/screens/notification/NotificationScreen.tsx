import {View, Text, StatusBar, Image, TouchableOpacity} from 'react-native';
import React from 'react';
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

const NotificationScreen = ({navigation}: any) => {
  return (
    <View
      style={[globalStyles.container, {paddingTop: StatusBar.currentHeight}]}>
      <StatusBar barStyle="dark-content" />
      <HeaderComponent title='Notification' goBack/>
      <View style={{alignItems: 'center', flex: 1, justifyContent: 'center'}}>
        <Image source={require('../../assets/images/noti.png')} />
      </View>
    </View>
  );
};

export default NotificationScreen;
