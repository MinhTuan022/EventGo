import { ArrowCircleRight, ArrowLeft, Sms } from 'iconsax-react-native';
import React, { useState } from 'react';
import authenticationAPI from '../../apis/authApi';
import {
  ButtonComponent,
  ContainerComponent,
  InputComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';
import LoadingModal from '../../components/modals/LoadingModal';
import { appColors } from '../../utils/constants/appColors';

const ForgotPasswordScreen = ({navigation}: any) => {
  const [email, setEmail] = useState('');
  const [isForgotPass, setIsForgotPass] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPass = async () => {
    setIsLoading(true);
    try {
      const res = await authenticationAPI.HandleAuthentication(
        '/forgotPassword',
        {
          // fullname: values.username,
          email,
          // password: values.password,
        },

        'post',
      );
      //   console.log(res.data.verificationCode)
      //   dispatch(addAuth(res.data));
      setIsLoading(false);
      navigation.navigate('VerificationScreen', {
        code: res.data.verificationCode,
        email,
        isForgotPass,
      });
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <>
      <ContainerComponent isImageBackground isScroll>
        <SectionComponent styles={{marginTop: 35}}>
          <ArrowLeft size={22} color="black" />
          <SpaceComponent height={20} />
          <TextComponent text="Forgot Password?" title />
          <SpaceComponent height={10} />
          <TextComponent
            text="Don't worry! It happens, please enter the address associated with your account"
            color={appColors.gray}
          />
          <InputComponent
            placeHolder="abc@gmail.com"
            value={email}
            onChange={val => setEmail(val)}
            affix={<Sms size={22} color={appColors.gray} />}
          />
        </SectionComponent>
        <SectionComponent styles={{alignItems: 'center'}}>
          <ButtonComponent
            disable={email ? false : true}
            onPress={handleForgotPass}
            text="Send"
            type="primary"
            iconRight={
              <ArrowCircleRight size={22} color="white" />
            }></ButtonComponent>
        </SectionComponent>
      </ContainerComponent>
      <LoadingModal visible={isLoading} />
    </>
  );
};

export default ForgotPasswordScreen;
