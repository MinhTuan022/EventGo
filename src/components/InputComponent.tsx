import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardType,
  StyleProp,
  ViewStyle,
} from 'react-native';
import React, {ReactNode, useState} from 'react';
import {Eye, EyeSlash} from 'iconsax-react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {appColors} from '../constants/appColors';
import {globalStyles} from '../styles/globalStyles';
import {ContainerComponent, TextComponent} from '.';
interface Props {
  value: string;
  onChange: (val: string) => void;
  affix?: ReactNode;
  placeHolder?: string;
  suffix?: ReactNode;
  isPassword?: boolean;
  clear?: boolean;
  type?: KeyboardType;
  validate?: ReactNode;
  styles?: StyleProp<ViewStyle>
//   onEnd?: () => void;
}

const InputComponent = (props: Props) => {
  const {
    value,
    onChange,
    affix,
    placeHolder,
    suffix,
    isPassword,
    clear,
    type,
    validate,
    styles,
   //  onEnd
  } = props;
  const [isShowPass, setIsShowPass] = useState(isPassword ?? false);
  return (
    <ContainerComponent>
      <View style={[globalStyles.inputContainer, styles]}>
        {affix ?? affix}
        <TextInput
          style={[globalStyles.input,{backgroundColor: 'coral'}]}
          value={value}
          placeholder={placeHolder ?? ''}
          onChangeText={val => onChange(val)}
          secureTextEntry={isShowPass}
          keyboardType={type ?? 'default'}
          autoCapitalize="none"
          placeholderTextColor={appColors.textInput}
         
         //  onEndEditing={onEnd}
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
      {validate ? validate : <></>}

    </ContainerComponent>
  );
};

export default InputComponent;
