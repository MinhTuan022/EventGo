import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardType,
  StyleProp,
  ViewStyle,
  KeyboardAvoidingView,
} from 'react-native';
import React, {ReactNode, useState} from 'react';
import {Eye, EyeSlash} from 'iconsax-react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {appColors} from '../utils/constants/appColors';
import {globalStyles} from '../styles/globalStyles';
import {ContainerComponent, RowComponent, TextComponent} from '.';
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
  styles?: StyleProp<ViewStyle>;
  label?: string;
  editable?: boolean;
  onChangeText?: () => void;
  mandatory?: boolean;
  flex?: boolean;
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
    label,
    editable,
    onChangeText,
    mandatory,
    flex,
    //  onEnd
  } = props;
  const [isShowPass, setIsShowPass] = useState(isPassword ?? false);
  const [isFocus, setIsFocus] = useState(false);

  return (
    <View style={{flex: flex ? 1 : 0}}>
      <RowComponent>
        {label && <TextComponent text={label} styles={{paddingBottom: 7}} />}
        {mandatory && (
          <TextComponent text={'*'} styles={{paddingBottom: 7}} color="red" />
        )}
      </RowComponent>
      <View
        style={[
          globalStyles.inputContainer,
          {backgroundColor: editable === false ? appColors.gray2 : 'white', borderColor:isFocus ? appColors.primary : appColors.gray2},
          styles,
        ]}>
        {affix ?? affix}
        <TextInput
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          editable={editable}
          style={[
            globalStyles.input,
            affix || suffix ? {paddingHorizontal: 15} : {},
          ]}
          value={value}
          placeholder={placeHolder ?? ''}
          onChangeText={onChangeText ? onChangeText : val => onChange(val)}
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
          ) : value && value.length > 5 ? (
            <AntDesign name="close" size={22} color={appColors.gray2} />
          ) : (
            ''
          )}
        </TouchableOpacity>
      </View>
      {validate ? validate : <></>}
    </View>
  );
};

export default InputComponent;
