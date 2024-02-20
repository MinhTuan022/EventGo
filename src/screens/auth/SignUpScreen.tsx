import {
  ArrowCircleRight,
  ArrowLeft,
  Lock1,
  PasswordCheck,
  Sms,
  User,
} from 'iconsax-react-native';
import React, {useState} from 'react';
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
interface Errors {
  email?: string;
  password?: string;
  confirm?: string;
}
const SignUpScreen = ({navigation}: any) => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [errors, setErrors] = useState<Errors>({});
  const validateForm = () => {
    let formIsValid = true;
    const newErrors: Errors = {};

    if (!email) {
      newErrors.email = 'Vui lòng nhập email';
      formIsValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email không hợp lệ';
      formIsValid = false;
    }

    if (!password) {
      newErrors.password = 'Vui lòng nhập mật khẩu';
      formIsValid = false;
    } else if (password.length < 6) {
      newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
      formIsValid = false;
    }

    if (password != confirmPass) {
      newErrors.confirm = 'Password không khớp';
      formIsValid = false;
    }

    setErrors(newErrors);
    return formIsValid;
  };

  const handleSignUp = () => {
    if (validateForm()) {
      // Xử lý đăng nhập
    }
  };

  return (
    <ContainerComponent isImageBackground isScroll>
      <SectionComponent styles={{marginTop: 30}}>
        <ArrowLeft
          onPress={() => navigation.navigate('LoginScreen')}
          size={22}
          color="black"
        />
        <SpaceComponent height={30} />
        <TextComponent text="Sign up" title />
        <SpaceComponent height={21} />

        <InputComponent
          value={userName}
          onChange={val => setUserName(val)}
          placeHolder="Full Name"
          affix={<User color={appColors.gray2} />}
        />
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
        <InputComponent
          styles={errors.confirm ? {borderColor: 'red'} : {}}
          value={confirmPass}
          onChange={val => setConfirmPass(val)}
          placeHolder="Confirm Password"
          isPassword
          affix={<PasswordCheck color={appColors.gray2} />}
          validate={
            errors.confirm && (
              <TextComponent text={errors.confirm} color="red" />
            )
          }
        />
      </SectionComponent>
      <SpaceComponent height={16} />
      <SectionComponent styles={{alignItems: 'center'}}>
        <ButtonComponent
          onPress={handleSignUp}
          iconFlex="right"
          text="SIGN UP"
          type="primary"
          icon={<ArrowCircleRight size={22} color={appColors.white} />}
        />
      </SectionComponent>
      <SocialComponent></SocialComponent>
      <SectionComponent>
        <RowComponent styles={{justifyContent: 'center'}}>
          <TextComponent text="Already have an account? " />
          <ButtonComponent
            onPress={() => navigation.navigate('LoginScreen')}
            type="link"
            text="Sign in"
          />
        </RowComponent>
      </SectionComponent>
    </ContainerComponent>
  );
};

export default SignUpScreen;
