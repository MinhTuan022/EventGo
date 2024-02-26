import {View, Text, TouchableOpacity, ViewStyle} from 'react-native';
import React, {ReactNode} from 'react';
import {StyleProp} from 'react-native';
import {appColors} from '../constants/appColors';

interface Props {
  radius?: number;
  color?: string;
  children: ReactNode;
  
  styles?: StyleProp<ViewStyle>;
}
const ShapeComponent = (props: Props) => {
  const {radius, color, children, styles} = props;
  return (
    <TouchableOpacity
      style={[
        {
          justifyContent: 'center',
          alignItems: 'center',
          width: 33,
          height: 33,
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
