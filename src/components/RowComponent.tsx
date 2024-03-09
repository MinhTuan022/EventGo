import {View, Text, StyleProp, ViewStyle, TouchableOpacity} from 'react-native';
import React, {ReactNode} from 'react';
import {globalStyles} from '../styles/globalStyles';

interface Props {
  children: ReactNode;
  styles?: StyleProp<ViewStyle>;
  jus?: string;
  onPress?: () => void;
}
const RowContainer = (props: Props) => {
  const {children, styles, jus, onPress} = props;
  return onPress ? (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.9}
      style={[globalStyles.row, styles]}>
      {children}
    </TouchableOpacity>
  ) : (
    <View style={[globalStyles.row, styles]}>{children}</View>
  );
};

export default RowContainer;
