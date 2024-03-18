import {ArrowLeft, Message, UserAdd} from 'iconsax-react-native';
import React from 'react';
import {Image, StatusBar, TouchableOpacity, View} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {
  ButtonComponent,
  RowComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';
import {appColors} from '../../utils/constants/appColors';
import {fontFamilies} from '../../utils/constants/fontFamilies';

const MyProfileScreen = ({route}:any) => {
  // const {o} = route.params;
  // console.log(o)
  return (
    <View
      style={{
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        backgroundColor: 'white',
      }}>
      <StatusBar barStyle="dark-content" />
      <SpaceComponent height={10} />
      <View style={{paddingHorizontal: 20}}>
        <RowComponent styles={{justifyContent: 'space-between'}}>
          {/* <ArrowLeft size={24} color="black" /> */}
          <View></View>
          <Feather name="more-vertical" size={24} color="black" />
        </RowComponent>
        <SpaceComponent height={40} />
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Image
            source={require('../../assets/images/cat.jpg')}
            style={{borderRadius: 100, width: 96, height: 96}}
          />
          <SpaceComponent height={20} />
          <TextComponent text="Nguyễn Minh Tuấn" title />
        </View>
        <SpaceComponent height={20} />
        <RowComponent styles={{justifyContent: 'center'}}>
          <View style={{alignItems: 'center', paddingHorizontal: 30}}>
            <TextComponent text="350" font={fontFamilies.medium} size={16} />
            <TextComponent text="Following" />
          </View>
          <View
            style={{width: 1, height: 30, backgroundColor: appColors.gray}}
          />
          <View style={{alignItems: 'center', paddingHorizontal: 30}}>
            <TextComponent text="346" font={fontFamilies.medium} size={16} />
            <TextComponent text="Followers" />
          </View>
        </RowComponent>
        <SpaceComponent height={20} />
        <RowComponent styles={{justifyContent: 'space-between'}}>
          <ButtonComponent
            styles={{width: '48%'}}
            text="Follow"
            type="primary"
            icon={<UserAdd size={24} color="white" />}
            iconFlex="left"
          />
          <ButtonComponent
            styles={{
              width: '48%',
              backgroundColor: 'white',
              borderColor: appColors.primary,
              borderWidth: 1,
            }}
            text="Massages"
            textColor={appColors.primary}
            type="primary"
            icon={<Message size={24} color={appColors.primary} />}
            iconFlex="left"
          />
        </RowComponent>
      </View>
    </View>
  );
};

export default MyProfileScreen;
