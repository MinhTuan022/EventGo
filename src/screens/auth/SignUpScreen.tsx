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
import authenticationAPI from '../../apis/authApi';
import LoadingModal from '../../modals/LoadingModal';
import {addAuth} from '../../redux/reducers/authReducer';
import {useDispatch} from 'react-redux';
interface Errors {
  email?: string;
  password?: string;
  confirm?: string;
}

const initValue = {
  fullname: '',
  email: '',
  password: '',
  confirmPass: '',
};
const SignUpScreen = ({navigation}: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [values, setValues] = useState(initValue);
  const [errors, setErrors] = useState<Errors>({});
  const validateForm = () => {
    let formIsValid = true;
    const newErrors: Errors = {};

    if (!values.email) {
      newErrors.email = 'Vui lòng nhập email';
      formIsValid = false;
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      newErrors.email = 'Email không hợp lệ';
      formIsValid = false;
    }

    if (!values.password) {
      newErrors.password = 'Vui lòng nhập mật khẩu';
      formIsValid = false;
    } else if (values.password.length < 6) {
      newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
      formIsValid = false;
    }

    if (values.password != values.confirmPass) {
      newErrors.confirm = 'Password không khớp';
      formIsValid = false;
    }

    setErrors(newErrors);
    return formIsValid;
  };
  const handleChangeValue = (key: string, value: string) => {
    const data: any = {...values};

    data[`${key}`] = value;

    setValues(data);
  };
  const handleSignUp = async () => {
    if (validateForm()) {
      setIsLoading(true);
      try {
        const res = await authenticationAPI.HandleAuthentication(
          '/verification',
          {
            // fullname: values.username,
            email: values.email,
            // password: values.password,
          },

          'post',
        );
      //   console.log(res.data.verificationCode)
      //   dispatch(addAuth(res.data));
        setIsLoading(false);
        navigation.navigate('VerificationScreen', {
         code: res.data.verificationCode,
         ...values,
        })
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    }
  };

  return (
    <>
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
            value={values.fullname}
            onChange={val => handleChangeValue('fullname', val)}
            placeHolder="Full Name"
            affix={<User color={appColors.gray2} />}
          />
          <InputComponent
            styles={errors.email ? {borderColor: 'red'} : {}}
            value={values.email}
            onChange={val => handleChangeValue('email', val)}
            placeHolder="Email"
            type="email-address"
            affix={<Sms color={appColors.gray2} />}
            validate={
              errors.email && <TextComponent text={errors.email} color="red" />
            }
          />
          <InputComponent
            styles={errors.password ? {borderColor: 'red'} : {}}
            value={values.password}
            onChange={val => handleChangeValue('password', val)}
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
            value={values.confirmPass}
            onChange={val => handleChangeValue('confirmPass', val)}
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
      <LoadingModal visible={isLoading} />
    </>
  );
};

export default SignUpScreen;
