import {View, Text, StyleProp, TextStyle, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
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
  title?: boolean;
  maxLength?: number;
}

const TextComponent = (props: Props) => {
  const {text, color, size, flex, font, styles, title, maxLength} = props;
  const [showFullText, setShowFullText] = useState(false);
  const shouldTruncate = maxLength ?? text.length > Number(maxLength);
  const truncatedText = showFullText ? text : text.slice(0, maxLength);

  const handlePress = () => {
    setShowFullText(!showFullText);
  };
  return (
    <Text
      style={[
        globalStyles.text,
        {
          color: color ?? appColors.text,
          flex: flex ?? 0,
          fontSize: size ? size : title ? 24 : 14,
          fontFamily: font
            ? font
            : title
            ? fontFamilies.medium
            : fontFamilies.regular,
        },
        {},
        styles,
      ]}>
      {shouldTruncate ? truncatedText : text}
      {shouldTruncate && (
        <TouchableOpacity onPress={handlePress}>
          <Text style={{color: 'blue'}}>
            {showFullText ? ' See Less' : ' See More'}
          </Text>
        </TouchableOpacity>
      )}
    </Text>
  );
};

export default TextComponent;
