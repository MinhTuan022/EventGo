import {View, Text, TouchableOpacity, ViewStyle} from 'react-native';
import React, {ReactNode} from 'react';
import {StyleProp} from 'react-native';
import {appColors} from '../constants/appColors';

interface Props {
  radius?: number;
  color?: string;
  children: ReactNode;
  size?: number;
  styles?: StyleProp<ViewStyle>;
  onPress?: () => void;
}
const ShapeComponent = (props: Props) => {
  const {radius, color, children, styles, size, onPress} = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        {
          justifyContent: 'center',
          alignItems: 'center',
          width: size ?? 33,
          height: size ?? 33,
          // padding: 7,
          backgroundColor: color ?? appColors.gray3,
          borderRadius: radius ?? 100,
        },
        styles,
      ]}>
      {children}
    </TouchableOpacity>
  );
};

export default ShapeComponent;
