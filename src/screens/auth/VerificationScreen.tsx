import AsyncStorage from '@react-native-async-storage/async-storage';
import {ArrowCircleRight, ArrowLeft} from 'iconsax-react-native';
import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {useDispatch} from 'react-redux';
import authenticationAPI from '../../apis/authApi';
import {
  ButtonComponent,
  ContainerComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';
import {appColors} from '../../constants/appColors';
import {fontFamilies} from '../../constants/fontFamilies';
import LoadingModal from '../../modals/LoadingModal';
import {addAuth} from '../../redux/reducers/authReducer';

const VerificationScreen = ({navigation, route}: any) => {
  const {code, email, password, fullname, isForgotPass} = route.params;
  const dispatch = useDispatch();
  const [currentCode, setCurrentCode] = useState(code);
  const [verificationCode, setVerificationCode] = useState('');
  const [isCodeValid, setisCodeValid] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  console.log(route.params);
  const refs = Array.from({length: 4}, () => useRef<TextInput>(null));

  useEffect(() => {
    refs[0]?.current?.focus();
  }, []);

  const handleInputChange = (val: string, index: number) => {
    const newVerificationCode =
      verificationCode.slice(0, index) +
      val +
      verificationCode.slice(index + 1);
    setVerificationCode(newVerificationCode);

    if (val.length > 0 && index < refs.length - 1) {
      refs[index + 1]?.current?.focus();
    }
  };

  //   useEffect(() => {
  //     if (verificationCode.length === 4 && verificationCode == code) {

  //     }
  //   }, [verificationCode, code]);

  const handleResendCode = async () => {
    setIsLoading(true);

    try {
      const res = await authenticationAPI.HandleAuthentication(
        isForgotPass ? '/forgotPassword' : '/verification',
        {
          email,
        },

        'post',
      );
      setCurrentCode(res.data.verificationCode);
      console.log(res.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  const handleVerification = async () => {
    setIsLoading(true);
    if (
      isForgotPass &&
      verificationCode.length === 4 &&
      verificationCode == currentCode
    ) {
      navigation.navigate('ResetPasswordScreen',{email});
    } else if (
      verificationCode.length === 4 &&
      verificationCode == currentCode
    ) {
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
        //   console.log(res.data);
        await AsyncStorage.setItem('auth', JSON.stringify(res.data));
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log('Verification Fall');
      setisCodeValid(false);
      setIsLoading(false);
    }
  };
  return (
    <>
      {/* <ContainerComponent isImageBackground isScroll> */}
      <SectionComponent styles={{marginTop: 35}}>
        <ArrowLeft size={22} color="black" />
        <SpaceComponent height={20} />
        <TextComponent text="Verification" title />
        <SpaceComponent height={10} />
        <TextComponent
          text={`We’ve send you the verification code on email ${email}`}
          color={appColors.gray}
        />
        <SpaceComponent height={25} />
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          {refs.map((ref, index) => (
            <TextInput
              key={index}
              style={[localStyle.input, !isCodeValid && {borderColor: 'red'}]}
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
          disable={verificationCode.length !== 4}
          textStyle={{fontFamily: fontFamilies.medium}}
          onPress={handleVerification}
          text="CONTINUE"
          iconFlex="right"
          type="primary"
          icon={<ArrowCircleRight size={22} color="white" />}></ButtonComponent>
      </SectionComponent>
      <SectionComponent>
        <RowComponent styles={{justifyContent: 'center'}}>
          <TextComponent text="If you didn't recieve a code!  " />
          <ButtonComponent
            type="link"
            text="Re-send"
            onPress={handleResendCode}
          />
        </RowComponent>
      </SectionComponent>
      {/* </ContainerComponent> */}
      <LoadingModal visible={isLoading} />
    </>
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
