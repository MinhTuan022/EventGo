import AsyncStorage from '@react-native-async-storage/async-storage';
import {ArrowCircleRight, Lock1, Sms} from 'iconsax-react-native';
import React, {useState} from 'react';
import {Image, StyleSheet, Switch} from 'react-native';
import {useDispatch} from 'react-redux';
import authenticationAPI from '../../apis/authApi';
import messaging from '@react-native-firebase/messaging';

import {
  ButtonComponent,
  ContainerComponent,
  InputComponent,
  RowComponent,
  SectionComponent,
  SocialComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';
import LoadingModal from '../../components/modals/LoadingModal';
import {addAuth, addFavoriteEvent} from '../../redux/reducers/authReducer';
import {appColors} from '../../utils/constants/appColors';
import { globalStyles } from '../../styles/globalStyles';

interface Errors {
  email?: string;
  password?: string;
  generic?: string;
}
const LoginScreen = ({navigation}: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRemember, setIsRemember] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const validateForm = () => {
    let formIsValid = true;
    const newErrors: Errors = {};

    // Kiểm tra email
    if (!email) {
      newErrors.email = 'Vui lòng nhập email';
      formIsValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email không hợp lệ';
      formIsValid = false;
    }

    // Kiểm tra password
    if (!password) {
      newErrors.password = 'Vui lòng nhập mật khẩu';
      formIsValid = false;
    }

    setErrors(newErrors);
    return formIsValid;
  };

  const handleLogin = async () => {
    if (validateForm()) {
      setIsLoading(true);
      try {
        const currentToken = await messaging().getToken();

        await AsyncStorage.setItem('fcmToken', currentToken);
        const res = await authenticationAPI.HandleAuthentication(
          '/login',
          {email, password, fcmToken: currentToken},
          'post',
        );
        console.log(res);
        dispatch(
          addAuth({
            accessToken: res.data.accessToken,
            email: res.data.email,
            name: res.data.name,
            organization: res.data.organization,
            id: res.data.id,
            favorites: res.data.favorites,
            fcmTokens: res.data.fcmTokens,
          }),
        );
        setIsLoading(false);
        if (res.data.organization) {
          await AsyncStorage.setItem(
            'auth',
            isRemember
              ? JSON.stringify({
                  accessToken: res.data.accessToken,
                  email: res.data.email,
                  name: res.data.name,
                  organization: res.data.organization,
                  id: res.data.id,
                  favorites: res.data.favorites,
                })
              : email,
          );
        }else{
          await AsyncStorage.setItem(
            'auth',
            isRemember
              ? JSON.stringify({
                  accessToken: res.data.accessToken,
                  email: res.data.email,
                  name: res.data.name,
                  id: res.data.id,
                  favorites: res.data.favorites,
                })
              : email,
          );
        }
       
      } catch (error) {
        setIsLoading(false);
        console.log(error);
        //   Alert.alert('Error', 'Có lỗi từ server');
        setErrors({generic: 'Email hoặc mật khẩu không chính xác !'});
      }
    }
  };

  return (
    <>
      <ContainerComponent isImageBackground isScroll>
        <SectionComponent
          styles={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 75,
          }}>
          <Image
            source={require('../../assets/images/login-logo.png')}
            style={{width: 162, height: 114, marginBottom: 20}}
          />
        </SectionComponent>
        <SectionComponent>
          <TextComponent text="Đăng nhập" title />
          <SpaceComponent height={3} />
          <InputComponent
            styles={[
              localStyle.input,
              errors.email ? {borderColor: 'red'} : {},
            ]}
            value={email}
            onChange={val => setEmail(val)}
            placeHolder="Email"
            type="email-address"
            affix={<Sms color={appColors.gray2} />}
            validate={
              errors.email && <TextComponent text={errors.email} color="red" />
            }
          />

          <InputComponent
            styles={[
              localStyle.input,
              errors.password ? {borderColor: 'red'} : {},
            ]}
            value={password}
            onChange={val => setPassword(val)}
            placeHolder="Mật khẩu"
            isPassword
            affix={<Lock1 color={appColors.gray2} />}
            validate={
              errors.password && (
                <TextComponent text={errors.password} color="red" />
              )
            }
          />
          {/* <SpaceComponent height={10} /> */}
          <RowComponent styles={{justifyContent: 'space-between'}}>
            <RowComponent onPress={() => setIsRemember(!isRemember)}>
              <Switch
                thumbColor={appColors.white}
                trackColor={{true: appColors.primary}}
                value={isRemember}
                onChange={() => setIsRemember(!isRemember)}
              />
              <TextComponent text="Remember me" />
            </RowComponent>
            <ButtonComponent
              text="Quên mật khẩu?"
              type="link"
              onPress={() => navigation.navigate('ForgotPasswordScreen')}
            />
          </RowComponent>
        </SectionComponent>
        {errors.generic && (
          <SectionComponent
            styles={{paddingVertical: 0, alignItems: 'flex-start'}}>
            <TextComponent text={errors.generic} color="red" />
          </SectionComponent>
        )}
        <SpaceComponent height={16} />
        <SectionComponent styles={{alignItems: 'center'}}>
          <ButtonComponent styles={globalStyles.shadow}
            onPress={handleLogin}
            text="Đăng nhập"
            // iconFlex="right"
            type="primary"
            iconRight={<ArrowCircleRight size={21} color={appColors.white} />}
          />
        </SectionComponent>
        <SocialComponent />
        <SectionComponent>
          <RowComponent styles={{justifyContent: 'center'}}>
            <TextComponent text="Chưa có tài khoản? " />
            <ButtonComponent 
              onPress={() => navigation.navigate('SignUpScreen')}
              type="link"
              text="Đăng kí"
            />
          </RowComponent>
        </SectionComponent>
      </ContainerComponent>
      <LoadingModal visible={isLoading} />
    </>
  );
};

const localStyle = StyleSheet.create({
  input: {
    marginTop: 19,
  },
});

export default LoginScreen;
