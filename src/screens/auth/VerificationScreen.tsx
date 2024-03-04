import {View, Text, TextInput, StyleSheet} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {
  ButtonComponent,
  ContainerComponent,
  InputComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';
import {ArrowCircleRight, ArrowLeft, Sms} from 'iconsax-react-native';
import {appColors} from '../../constants/appColors';
import {fontFamilies} from '../../constants/fontFamilies';
import authenticationAPI from '../../apis/authApi';
import { addAuth } from '../../redux/reducers/authReducer';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';


const VerificationScreen = ({navigation, route}: any) => {
  const {code, email, password, fullname} = route.params;
  const dispatch = useDispatch();
  const [verificationCode, setVerificationCode] = useState('');
  console.log(route.params);
  const refs = Array.from({length: 4}, () => useRef<TextInput>(null));

  useEffect(() => {
    refs[0]?.current?.focus();
  }, []);

  const handleInputChange = (val: string, index: number) => {
    if (val.length > 0 && index < refs.length - 1) {
      refs[index + 1]?.current?.focus();
    }
    54;
    const newVerificationCode =
      verificationCode.slice(0, index) +
      val +
      verificationCode.slice(index + 1);
    setVerificationCode(newVerificationCode);
  };
  //   useEffect(() => {
  //     if (verificationCode.length === 4 && verificationCode == code) {

  //     }
  //   }, [verificationCode, code]);

  const handleVerification = async () => {
    if (verificationCode.length === 4 && verificationCode == code) {
      console.log('Verification Successfully !');
      const data = {
        email,
        password,
        fullname: fullname ?? '',
      };
      try {
        const res = await authenticationAPI.HandleAuthentication(
          '/register',
          data,
          'post',
        );
        //   console.log(res.data.verificationCode)
          dispatch(addAuth(res.data));
          console.log(res.data)
          await AsyncStorage.setItem('auth', JSON.stringify(res.data));
          console.log(AsyncStorage.getItem('auth'))
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log('Verification Fall');
    }
  };
  return (
    <ContainerComponent isImageBackground isScroll>
      <SectionComponent styles={{marginTop: 35}}>
        <ArrowLeft size={22} color="black" />
        <SpaceComponent height={20} />
        <TextComponent text="Verification" title />
        <SpaceComponent height={10} />
        <TextComponent
          text="We’ve send you the verification code on email"
          color={appColors.gray}
        />
        <SpaceComponent height={25} />
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          {refs.map((ref, index) => (
            <TextInput
              key={index}
              style={localStyle.input}
              ref={ref}
              placeholder="-"
              placeholderTextColor={appColors.gray2}
              maxLength={1}
              keyboardType="numeric"
              onChangeText={val => handleInputChange(val, index)}
            />
          ))}
        </View>
      </SectionComponent>
      <SectionComponent styles={{alignItems: 'center'}}>
        <ButtonComponent
            disable={verificationCode.length !== 4 }
          textStyle={{fontFamily: fontFamilies.medium}}
          onPress={handleVerification}
          text="CONTINUE"
          iconFlex="right"
          type="primary"
          icon={<ArrowCircleRight size={22} color="white" />}></ButtonComponent>
      </SectionComponent>
    </ContainerComponent>
  );
};

const localStyle = StyleSheet.create({
  input: {
    borderColor: appColors.gray2,
    borderWidth: 1,
    borderRadius: 12,
    height: 55,
    width: 55,
    textAlign: 'center',
    fontSize: 24,
    fontFamily: fontFamilies.bold,
  },
});
export default VerificationScreen;
