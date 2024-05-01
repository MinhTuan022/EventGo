import {View, Text, StatusBar, Alert} from 'react-native';
import React, {useState} from 'react';
import {globalStyles} from '../../styles/globalStyles';
import {
  ButtonComponent,
  HeaderComponent,
  InputComponent,
  SectionComponent,
  TextComponent,
} from '../../components';
import {appColors} from '../../utils/constants/appColors';
import {fontFamilies} from '../../utils/constants/fontFamilies';
import {Lock1, PasswordCheck} from 'iconsax-react-native';
import authenticationAPI from '../../apis/authApi';
import LodingModal from '../../components/modals/LoadingModal';
import {useSelector} from 'react-redux';
import {authSelector} from '../../redux/reducers/authReducer';

interface Errors {
  confirm?: string;
  password?: string;
}
const ChangePassword = ({navigation}: any) => {
  const auth = useSelector(authSelector);
  const [oldPass, setOldPass] = useState('');
  const [oldPassValid, setOldPassValid] = useState('');

  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [errors, setErrors] = useState<Errors>({});

  const validateForm = () => {
    let formIsValid = true;
    const newErrors: Errors = {};
    if (!newPass) {
      newErrors.password = 'Vui lòng nhập mật khẩu';
      formIsValid = false;
    } else if (newPass.length < 6) {
      newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
      formIsValid = false;
    }
    if (newPass != confirmPass) {
      newErrors.confirm = 'Mật khẩu mới không khớp';
      formIsValid = false;
    }

    setErrors(newErrors);
    return formIsValid;
  };

  const handleChangePass = async () => {
    if (validateForm()) {
      // Xử lý đăng nhập

      setIsLoading(true);
      try {
        const res = await authenticationAPI.HandleAuthentication(
          '/changePassword',
          {
            userId: auth.id,
            oldPassword: oldPass,
            newPassword: newPass,
          },

          'post',
        );

        setIsLoading(false);
        Alert.alert(
          'Thành công',
          'Mật khẩu của bạn đã được đặt lại.',
          [
            {
              text: 'OK',
              onPress: () => navigation.goBack(),
            },
          ],
          {cancelable: false},
        );
      } catch (error) {
        console.log(error);
        setOldPassValid('Mật khẩu cũ không đúng');
        setIsLoading(false);
      }
    }
  };

  return (
    <View
      style={[globalStyles.container, {paddingTop: StatusBar.currentHeight}]}>
      <HeaderComponent title="Đổi mật khẩu" goBack />
      <SectionComponent>
        <InputComponent
          label="Mật khẩu cũ"
          value={oldPass}
          onChange={val => {
            setOldPass(val);
          }}
          isPassword
          styles={oldPassValid ? {borderColor: 'red'} : {}}
          validate={
            oldPassValid && (
              <TextComponent text={oldPassValid} color="red" />
            )
          }
          affix={<Lock1 size={22} color={appColors.gray} />}
        />
        <InputComponent
          label="Mật khẩu mới"
          value={newPass}
          onChange={val => {
            setNewPass(val);
          }}
          isPassword
          styles={errors.password ? {borderColor: 'red'} : {}}
          validate={
            errors.password && (
              <TextComponent text={errors.password} color="red" />
            )
          }
          affix={<Lock1 size={22} color={appColors.gray} />}
        />
        <InputComponent
          label="Nhập lại mật khẩu mới"
          value={confirmPass}
          onChange={val => setConfirmPass(val)}
          isPassword
          styles={errors.confirm ? {borderColor: 'red'} : {}}
          validate={
            errors.confirm && (
              <TextComponent text={errors.confirm} color="red" />
            )
          }
          affix={<PasswordCheck size={22} color={appColors.gray} />}
        />
      </SectionComponent>
      <SectionComponent styles={{paddingVertical: 0}}>
        <ButtonComponent
          onPress={handleChangePass}
          text="Lưu thay đổi"
          type="primary"
          styles={{width: '100%', borderRadius: 50}}
          color={appColors.primary}
          textColor={appColors.white}
          textStyle={{fontFamily: fontFamilies.medium}}
        />
      </SectionComponent>
      <LodingModal visible={isLoading} />
    </View>
  );
};

export default ChangePassword;
