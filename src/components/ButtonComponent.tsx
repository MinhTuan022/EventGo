import {
  View,
  Text,
  StyleProp,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
} from 'react-native';
import React, {ReactNode} from 'react';
import {TextComponent} from '.';
import {globalStyles} from '../styles/globalStyles';
import {appColors} from '../constants/appColors';
import {fontFamilies} from '../constants/fontFamilies';

interface Props {
  icon?: ReactNode;
  text: string;
  type?: 'primary' | 'text' | 'link';
  color?: string;
  styles?: StyleProp<ViewStyle>;
  textColor?: string;
  textStyle?: StyleProp<TextStyle>;
  onPress?: () => void;
  iconFlex?: 'right' | 'left';
  disable?: boolean;
}

const ButtonComponent = (props: Props) => {
  const {
    icon,
    type,
    text,
    color,
    styles,
    textColor,
    textStyle,
    onPress,
    iconFlex,
    disable
  } = props;

  return type === 'primary' ? (
    <TouchableOpacity
    disabled={disable}
      onPress={onPress}
      style={[
        globalStyles.button,
        globalStyles.shadow,
        {
          backgroundColor: color ? color : disable ? appColors.gray2 : appColors.primary,
          width: '80%',
        },
        {},
        styles,
      ]}>
      {icon && iconFlex === 'left' && icon}
      <TextComponent
        text={text}
        color={textColor ?? appColors.white}
        flex={icon && iconFlex === 'right' ? 1 : 0}
        font={fontFamilies.regular}
        styles={[
          {marginLeft: icon ? 12 : 0, fontSize: 16, textAlign: 'center'},
          textStyle,
        ]}
      />
      {icon && iconFlex === 'right' && icon}
    </TouchableOpacity>
  ) : (
    <TouchableOpacity onPress={onPress}>
      <TextComponent
        text={text}
        color={
          type === 'link' ? appColors.primary : appColors.text
        }></TextComponent>
    </TouchableOpacity>
  );
};

export default ButtonComponent;
