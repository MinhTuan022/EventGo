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
import {appColors} from '../utils/constants/appColors';
import {fontFamilies} from '../utils/constants/fontFamilies';

interface Props {
  iconLeft?: ReactNode;
  iconRight?: ReactNode;

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
    iconLeft,
    iconRight,
    type,
    text,
    color,
    styles,
    textColor,
    textStyle,
    onPress,
    iconFlex,
    disable,
  } = props;

  return type === 'primary' ? (
    <TouchableOpacity
      disabled={disable}
      onPress={onPress}
      style={[
        globalStyles.button,
        // globalStyles.shadow,
        {
          paddingHorizontal: 18,
          paddingVertical: 18,
          backgroundColor: color
            ? color
            : disable
            ? appColors.gray2
            : appColors.primary,
          width: '80%',
        },
        styles,
      ]}>
      {iconLeft && iconLeft}
      <TextComponent
        text={text}
        color={textColor ?? appColors.white}
        flex={iconLeft || iconRight ? 1 : 0}
        font={fontFamilies.regular}
        styles={[
          {
            marginLeft: iconLeft || iconRight ? 12 : 0,
            fontSize: 16,
            textAlign: iconLeft && iconRight ? 'auto' : 'center',
          },
          textStyle,
        ]}
      />
      {iconRight && iconRight}
    </TouchableOpacity>
  ) : (
    <TouchableOpacity onPress={onPress} style={[globalStyles.button, styles]}>
      {iconLeft && iconLeft}
      <TextComponent
        text={text}
        color={type === 'link' ? appColors.primary : appColors.text}
        styles={textStyle}></TextComponent>
    </TouchableOpacity>
  );
};

export default ButtonComponent;
