import React, {ReactNode} from 'react';
import {StyleProp, Text, ViewStyle} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {globalStyles} from '../styles/globalStyles';
import {appColors} from '../constants/appColors';

interface Props {
  children: ReactNode;
  bgColor?: string;
  styles?: StyleProp<ViewStyle>;
  onPress? : () => void
}
const CardComponent = (props: Props) => {
  const {children, bgColor, styles, onPress} = props;
  return (
    <TouchableOpacity onPress={onPress}
      style={[
        globalStyles.card,
        globalStyles.shadow,
        {backgroundColor: bgColor ?? appColors.white},
        styles,
      ]}>
      {/* <Text>CardComponent</Text> */}
      {children}
    </TouchableOpacity>
  );
};

export default CardComponent;
