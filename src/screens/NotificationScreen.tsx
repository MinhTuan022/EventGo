import {View, Text, StatusBar, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {globalStyles} from '../styles/globalStyles';
import {
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../components';
import {ArrowLeft} from 'iconsax-react-native';
import Feather from 'react-native-vector-icons/Feather';

const NotificationScreen = ({navigation}: any) => {
  return (
    <View
      style={[globalStyles.container, {paddingTop: StatusBar.currentHeight}]}>
      <StatusBar barStyle="dark-content" />
      <RowComponent
        styles={{
          paddingHorizontal: 20,
          paddingVertical: 5,
          justifyContent: 'space-between',
        }}>
        <RowComponent>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ArrowLeft size={24} color="black" />
          </TouchableOpacity>

          <SpaceComponent width={10} />
          <TextComponent text="Notification" title />
        </RowComponent>
        <Feather name="more-vertical" size={24} color="black" />
      </RowComponent>
      <View style={{alignItems: 'center', flex: 1, justifyContent: 'center'}}>
        <Image source={require('../assets/images/noti.png')} />
      </View>
    </View>
  );
};

export default NotificationScreen;
