import {ArrowCircleRight, Lock1, Sms} from 'iconsax-react-native';
import React, {useState} from 'react';
import {Image, Switch} from 'react-native';
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
import {appColors} from '../../constants/appColors';
import authenticationAPI from '../../apis/authApi';

interface Errors {
  email?: string;
  password?: string;
}
const LoginScreen = ({navigation}: any) => {
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
    } else if (password.length < 6) {
      newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
      formIsValid = false;
    }

    setErrors(newErrors);
    return formIsValid;
  };

  const handleLogin = async () => {
   navigation.navigate('Main')
   //  if (validateForm()) {
      // try {
      //    const res = await authenticationAPI.HandleAuthentication('/test');
      //    console.log(res);
      // } catch (error) {
      //    console.log(error);
         
      // }
      
   //  }
  };
  return (
    <ContainerComponent isImageBackground isScroll>
      <SectionComponent
        styles={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 75,
        }}>
        <Image
          source={require('../../assets/images/login-logo.png')}
          style={{width: 162, height: 114, marginBottom: 30}}
        />
      </SectionComponent>
      <SectionComponent>
        <TextComponent text="Sign in" title />
        <SpaceComponent height={3} />
        <InputComponent
          styles={errors.email ? {borderColor: 'red'} : {}}
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
          styles={errors.password ? {borderColor: 'red'} : {}}
          value={password}
          onChange={val => setPassword(val)}
          placeHolder="Password"
          isPassword
          affix={<Lock1 color={appColors.gray2} />}
          validate={
            errors.password && (
              <TextComponent text={errors.password} color="red" />
            )
          }
        />
        <SpaceComponent height={10} />
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
          <ButtonComponent text="Forgot Password?" type="link" onPress={() => navigation.navigate('ForgotPasswordScreen')}/>
        </RowComponent>
      </SectionComponent>
      <SpaceComponent height={16} />
      <SectionComponent styles={{alignItems: 'center'}}>
        <ButtonComponent
          onPress={handleLogin}
          text="SIGN IN"
          iconFlex="right"
          type="primary"
          icon={<ArrowCircleRight size={21} color={appColors.white} />}
        />
      </SectionComponent>
      <SocialComponent />
      <SectionComponent>
        <RowComponent styles={{justifyContent: 'center'}}>
          <TextComponent text="Don't have an account? " />
          <ButtonComponent
            onPress={() => navigation.navigate('SignUpScreen')}
            type="link"
            text="Sign up"
          />
        </RowComponent>
      </SectionComponent>
    </ContainerComponent>
  );
};

export default LoginScreen;
