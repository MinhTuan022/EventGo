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
  width?: number;
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
    width,
  } = props;

  return type === 'primary' ? (
    <TouchableOpacity
      onPress={onPress}
      style={[
        globalStyles.button,
        globalStyles.shadow,
        {
          backgroundColor: color ?? appColors.primary,
          width,
        },
        {},
        styles,
      ]}>
      {icon && iconFlex === 'left' && icon}
      <TextComponent
        text={text}
        color={textColor ?? appColors.white}
        styles={[textStyle, {marginLeft: icon ? 12 : 0, fontSize: 16}]}
        flex={icon && iconFlex === 'right' ? 1 : 0}
        font={fontFamilies.regular}
      />
      {icon && iconFlex === 'right' && icon}
    </TouchableOpacity>
  ) : (
    <TouchableOpacity>
      <TextComponent
        text={text}
        color={
          type === 'link' ? appColors.primary : appColors.text
        }></TextComponent>
    </TouchableOpacity>
  );
};

export default ButtonComponent;
