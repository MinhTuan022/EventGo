import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardType,
} from 'react-native';
import React, {ReactNode, useState} from 'react';
import {Eye, EyeSlash} from 'iconsax-react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {appColors} from '../constants/appColors';
import {globalStyles} from '../styles/globalStyles';
interface Props {
  value: string;
  onChange: (val: string) => void;
  affix?: ReactNode;
  placeHolder?: string;
  suffix?: ReactNode;
  isPassword?: boolean;
  clear?: boolean;
  type?: KeyboardType;
}

const InputComponent = (props: Props) => {
  const {value, onChange, affix, placeHolder, suffix, isPassword, clear, type} =
    props;
  const [isShowPass, setIsShowPass] = useState(isPassword ?? false);
  return (
    <View style={globalStyles.inputContainer}>
      {affix ?? affix}
      <TextInput
        style={globalStyles.input}
        value={value}
        placeholder={placeHolder ?? ''}
        onChangeText={val => onChange(val)}
        secureTextEntry={isShowPass}
        keyboardType={type ?? 'default'}
        autoCapitalize='none'
      />
      {suffix ?? suffix}
      <TouchableOpacity
        onPress={
          isPassword ? () => setIsShowPass(!isShowPass) : () => onChange('')
        }>
        {isPassword ? (
          isShowPass ? (
            <EyeSlash size={22} color={appColors.gray} />
          ) : (
            <Eye size={22} color={appColors.gray} />
          )
        ) : (
          value.length > 0 && (
            <AntDesign name="close" size={22} color={appColors.gray2} />
          )
        )}
      </TouchableOpacity>
    </View>
  );
};

export default InputComponent;
