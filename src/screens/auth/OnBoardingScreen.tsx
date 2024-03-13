import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {globalStyles} from '../../styles/globalStyles';
import Swiper from 'react-native-swiper';
import {appInfo} from '../../utils/constants/appInfos';
import TextComponent from '../../components/TextComponent';
import { appColors } from '../../utils/constants/appColors';
import { fontFamilies } from '../../utils/constants/fontFamilies';

const OnBoardingScreen = ({navigation}: any) => {
  const [index, setIndex] = useState(0);
  return (
    <View style={[globalStyles.container]}>
      <Swiper style={{}} loop={false} activeDotColor="white" onIndexChanged={num => setIndex(num)} index={index}>
        <Image
          source={require('../../assets/images/onboarding-1.png')}
          style={{
            flex: 1,
            width: appInfo.sizes.WIDTH,
            height: appInfo.sizes.HEIGHT,
            resizeMode: 'cover',
          }}
        />
        <Image
          source={require('../../assets/images/onboarding-2.png')}
          style={{
            flex: 1,
            width: appInfo.sizes.WIDTH,
            height: appInfo.sizes.HEIGHT,
            resizeMode: 'cover',
          }}
        />
        <Image
          source={require('../../assets/images/onboarding-3.png')}
          style={{
            flex: 1,
            width: appInfo.sizes.WIDTH,
            height: appInfo.sizes.HEIGHT,
            resizeMode: 'cover',
          }}
        />
      </Swiper>
      <View
        style={[
          {
            paddingHorizontal: 16,
            paddingVertical: 12,
            position: 'absolute',
            bottom: 0,
            right: 0,
            left: 0,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          },
        ]}>
        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
        <TextComponent text='Skip' color={appColors.gray2} font={fontFamilies.medium}/>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            index < 2 ? setIndex(index + 1) : navigation.navigate('LoginScreen')
          }>
          <TextComponent text='Next' color={appColors.white} font={fontFamilies.medium}/>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OnBoardingScreen;
