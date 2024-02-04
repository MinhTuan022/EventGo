import {View, Text, StyleProp, TextStyle} from 'react-native';
import React from 'react';
import {appColors} from '../constants/appColors';
import {globalStyles} from '../styles/globalStyles';
import {fontFamilies} from '../constants/fontFamilies';

interface Props {
  text: string;
  color?: string;
  size?: number;
  flex?: number;
  font?: string;
  styles?: StyleProp<TextStyle>;
  title?: boolean
}

const TextComponent = (props: Props) => {
  const {text, color, size, flex, font, styles, title} = props;
  return (
    <Text
      style={[
        globalStyles.text,
        {
          color: color ?? appColors.text,
          flex: flex ?? 0,
          fontSize: size ?? title ? 24 : 14,
          fontFamily: font ?? title ? fontFamilies.bold : fontFamilies.regular,
        },
        styles,
      ]}>
      {text}
    </Text>
  );
};

export default TextComponent;
