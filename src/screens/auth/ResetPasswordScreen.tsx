import {
  ArrowCircleRight,
  ArrowLeft,
  Lock1,
  PasswordCheck,
} from 'iconsax-react-native';
import React, {useState} from 'react';
import {
  ButtonComponent,
  ContainerComponent,
  InputComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';
import {appColors} from '../../utils/constants/appColors';
import LodingModal from '../../components/modals/LoadingModal';
import authenticationAPI from '../../apis/authApi';
// import {validateForm} from '../../constants/validateForm';
interface Errors {
  password?: string;
  confirm?: string;
}
const ResetPasswordScreen = ({navigation, route}: any) => {
  const {email} = route.params;
  const [newPassword, setNewPassword] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [confirmPass, setConfirmPass] = useState('');
  const [errors, setErrors] = useState<Errors>({});

  const validateForm = () => {
    let formIsValid = true;
    const newErrors: Errors = {};
    if (!newPassword) {
      newErrors.password = 'Vui lòng nhập mật khẩu';
      formIsValid = false;
    } else if (newPassword.length < 6) {
      newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
      formIsValid = false;
    }

    if (newPassword != confirmPass) {
      newErrors.confirm = 'Password không khớp';
      formIsValid = false;
    }

    setErrors(newErrors);
    return formIsValid;
  };

  const handleResetPass = async () => {
    if (validateForm()) {
      // Xử lý đăng nhập

      setIsLoading(true);
      try {
        const res = await authenticationAPI.HandleAuthentication(
          '/forgotPassword',
          {
            // fullname: values.username,
            email,
            newPassword,
            // password: values.password,
          },

          'post',
        );
        //   console.log(res.data.verificationCode)
        //   dispatch(addAuth(res.data));
        setIsLoading(false);
        console.log('Reset Thành Công');
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    }
  };
  return (
    <>
      <ContainerComponent isImageBackground isScroll>
        <SectionComponent styles={{marginTop: 35}}>
          <ArrowLeft size={22} color="black" />
          <SpaceComponent height={20} />
          <TextComponent text="Reset Password" title />
          <SpaceComponent height={10} />

          <InputComponent
            isPassword
            styles={errors.password ? {borderColor: 'red'} : {}}
            placeHolder="New Password"
            value={newPassword}
            onChange={val => setNewPassword(val)}
            affix={<Lock1 size={22} color={appColors.gray} />}
            validate={
              errors.password && (
                <TextComponent text={errors.password} color="red" />
              )
            }
          />

          <InputComponent
            isPassword
            styles={errors.confirm ? {borderColor: 'red'} : {}}
            placeHolder="Confirm Password"
            value={confirmPass}
            onChange={val => setConfirmPass(val)}
            affix={<PasswordCheck size={22} color={appColors.gray} />}
            validate={
              errors.confirm && (
                <TextComponent text={errors.confirm} color="red" />
              )
            }
          />
        </SectionComponent>
        <SectionComponent styles={{alignItems: 'center'}}>
          <ButtonComponent
            onPress={handleResetPass}
            text="Send"
            iconFlex="right"
            type="primary"
            icon={
              <ArrowCircleRight size={22} color="white" />
            }></ButtonComponent>
        </SectionComponent>
      </ContainerComponent>
      <LodingModal visible={isLoading} />
    </>
  );
};

export default ResetPasswordScreen;
