import {
  ArrowCircleLeft,
  ArrowCircleRight,
  Calendar,
  Edit,
} from 'iconsax-react-native';
import React from 'react';
import {Image, StatusBar, View} from 'react-native';
import {
  ButtonComponent,
  RowComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';
import {appColors} from '../../utils/constants/appColors';
import {fontFamilies} from '../../utils/constants/fontFamilies';
import {StyleSheet} from 'react-native';

const MyProfileScreen = ({route}: any) => {
  // const {o} = route.params;
  // console.log(o)
  return (
    <View
      style={{
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        backgroundColor: 'white',
        paddingVertical: 20,
        paddingHorizontal: 20,
      }}>
      <StatusBar barStyle="dark-content" />
      <SpaceComponent height={10} />
      <View>
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
            source={require('../../assets/images/cat.jpg')}
            style={{borderRadius: 100, width: 96, height: 96}}
          />
          <SpaceComponent height={20} />
          <TextComponent text="Nguyễn Minh Tuấn" title />
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
            <TextComponent text="3" font={fontFamilies.medium} size={16} />
            <TextComponent text="Events" />
          </View>
          <View
            style={{width: 1, height: 30, backgroundColor: appColors.gray}}
          />
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
        <View
          style={{
            height: 0.5,
            backgroundColor: appColors.gray2,
            marginVertical: 20,
          }}
        />

        {/* <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <ButtonComponent
            styles={{
              width: '48%',
              backgroundColor: 'white',
              borderColor: appColors.primary,
              borderWidth: 1,
            }}
            text="Edit Profile"
            textColor={appColors.primary}
            type="primary"
            icon={<Edit size={24} color={appColors.primary} />}
            iconFlex="left"
          />
        </View> */}
        <ButtonComponent
          text="Manage Events"
          iconLeft={<Calendar size={22} color="black" />}
          iconRight={<ArrowCircleRight size={22} color="black" />}
          type="primary"
          color="white"
          textColor="black"
          styles={localStyle.button}
        />
        <ButtonComponent
          text="Manage Events"
          iconLeft={<Calendar size={22} color="black" />}
          iconRight={<ArrowCircleRight size={22} color="black" />}
          type="primary"
          color="white"
          textColor="black"
          styles={localStyle.button}
        />
        <View
          style={{
            height: 0.5,
            backgroundColor: appColors.gray2,
            marginVertical: 10,
          }}
        />
        <ButtonComponent
          text="Manage Events"
          iconLeft={<Calendar size={22} color="black" />}
          iconRight={<ArrowCircleRight size={22} color="black" />}
          type="primary"
          color="white"
          textColor="black"
          styles={localStyle.button}
        />
        <ButtonComponent
          text="Manage Events"
          iconLeft={<Calendar size={22} color="black" />}
          iconRight={<ArrowCircleRight size={22} color="black" />}
          type="primary"
          color="white"
          textColor="black"
          styles={localStyle.button}
        />
        <ButtonComponent
          text="Manage Events"
          iconLeft={<Calendar size={22} color="black" />}
          iconRight={<ArrowCircleRight size={22} color="black" />}
          type="primary"
          color="white"
          textColor="black"
          styles={localStyle.button}
        />
        <ButtonComponent
          text="Manage Events"
          iconLeft={<Calendar size={22} color="black" />}
          iconRight={<ArrowCircleRight size={22} color="black" />}
          type="primary"
          color="white"
          textColor="black"
          styles={localStyle.button}
        />
      </View>
    </View>
  );
};

const localStyle = StyleSheet.create({
  button: {width: '100%', paddingVertical: 10},
});
export default MyProfileScreen;
