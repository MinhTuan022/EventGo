import {
  ArrowCircleRight,
  ArrowLeft,
  Lock1,
  PasswordCheck,
  Sms,
  User,
} from 'iconsax-react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import authenticationAPI from '../../apis/authApi';
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
import {appColors} from '../../utils/constants/appColors';
import {Alert} from 'react-native';
interface Errors {
  email?: string;
  password?: string;
  confirm?: string;
  organization?: string;
  address?: string;
}

// const initValue = {
//   name: '',
//   email: '',
//   password: '',
//   confirmPass: '',
// };
const SignUpScreen = ({navigation}: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  // const [values, setValues] = useState(initValue);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [organization, setOrganization] = useState('');
  const [address, setAddress] = useState('');
  const [showOrganizationFields, setShowOrganizationFields] = useState(false);

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
    if (showOrganizationFields) {
      if (!organization) {
        newErrors.organization = 'Vui lòng nhập tên tổ chức';
        formIsValid = false;
      }

      if (!address) {
        newErrors.address = 'Vui lòng nhập địa chỉ';
        formIsValid = false;
      }
    }
    setErrors(newErrors);
    return formIsValid;
  };
  useEffect(() => {
    if (!showOrganizationFields) {
      setAddress('');
      setOrganization('');
    }
  }, [showOrganizationFields]);
  const handleToggleOrganizationFields = () => {
    setShowOrganizationFields(!showOrganizationFields);
  };

  // const handleChangeValue = (key: string, value: string) => {
  //   const data: any = {...values};

  //   data[`${key}`] = value;
  //   console.log(data);
  //   setValues(data);
  // };
  const handleSignUp = async () => {
    if (validateForm()) {
      setIsLoading(true);
      try {
        const check = await authenticationAPI.HandleAuthentication(
          `/check-user?email=${email}`,
        );
        const res = await authenticationAPI.HandleAuthentication(
          '/verification',
          {
            email: email,
          },

          'post',
        );

        setIsLoading(false);
        const data = {
          name: '',
          email: '',
          password: '',
          confirmPass: '',
        };
        navigation.navigate('VerificationScreen', {
          code: res.data.verificationCode,
          name,
          email,
          password,
          confirmPass,
          organization,
          address,
        });
      } catch (error) {
        console.log('sss', error);
        Alert.alert('Email đã được đăng kí');
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
            value={name}
            onChange={val => setName(val)}
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
          <ButtonComponent
            text="Bạn muốn đăng kí làm người tổ chức sự kiện?"
            type="link"
            onPress={handleToggleOrganizationFields}
          />
          <SpaceComponent height={15} />
          {showOrganizationFields && (
            <>
              <InputComponent
                styles={errors.email ? {borderColor: 'red'} : {}}
                value={organization}
                onChange={val => {
                  setOrganization(val);
                }}
                placeHolder="Tên tổ chức của bạn"
                type="email-address"
                affix={<Sms color={appColors.gray2} />}
                validate={
                  errors.organization && (
                    <TextComponent text={errors.organization} color="red" />
                  )
                }
              />
              <InputComponent
                styles={errors.email ? {borderColor: 'red'} : {}}
                value={address}
                onChange={val => {
                  setAddress(val);
                }}
                placeHolder="Địa chỉ tổ chức"
                type="email-address"
                affix={<Sms color={appColors.gray2} />}
                validate={
                  errors.address && (
                    <TextComponent text={errors.address} color="red" />
                  )
                }
              />
            </>
          )}
        </SectionComponent>
        <SpaceComponent height={16} />
        <SectionComponent styles={{alignItems: 'center'}}>
          <ButtonComponent
            onPress={handleSignUp}
            text="SIGN UP"
            type="primary"
            iconRight={<ArrowCircleRight size={22} color={appColors.white} />}
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
