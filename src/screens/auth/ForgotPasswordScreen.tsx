import {ArrowCircleRight, ArrowLeft, Sms} from 'iconsax-react-native';
import React, {useState} from 'react';
import authenticationAPI from '../../apis/authApi';
import {
  ButtonComponent,
  ContainerComponent,
  HeaderComponent,
  InputComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';
import LoadingModal from '../../components/modals/LoadingModal';
import {appColors} from '../../utils/constants/appColors';
import { Alert } from 'react-native';

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
      Alert.alert("Email tài khoản không tồn tại hoặc đã được liên kết")
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <>
      <ContainerComponent isScroll>
        <HeaderComponent title="" goBack />
        <SectionComponent>
          {/* <SpaceComponent height={20} /> */}
          <TextComponent text="Quên mật khẩu?" title />
          <SpaceComponent height={10} />
          <TextComponent
            text="Đừng lo lắng, hãy nhập địa chỉ email tài khoản của bạn"
            color={appColors.gray}
          />
          <SpaceComponent height={10} />
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
