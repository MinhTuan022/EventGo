import React, {ReactNode} from 'react';
import {StyleProp, Text, TouchableOpacity, View, ViewStyle} from 'react-native';

import {globalStyles} from '../styles/globalStyles';
import {appColors} from '../utils/constants/appColors';

interface Props {
  children: ReactNode;
  bgColor?: string;
  styles?: StyleProp<ViewStyle>;
  onPress?: () => void;
}
const CardComponent = (props: Props) => {
  const {children, bgColor, styles, onPress} = props;
  return (
    <>
      {onPress ? (
        <TouchableOpacity
          onPress={onPress}
          style={[
            globalStyles.card,
            globalStyles.shadow,
            {backgroundColor: bgColor ?? appColors.white},
            styles,
          ]}>
          {children}
        </TouchableOpacity>
      ) : (
        <View style={[
          globalStyles.card,
          globalStyles.shadow,
          {backgroundColor: bgColor ?? appColors.white},
          styles,
        ]}>
          {children}
        </View>
      )}
    </>
  );
};

export default CardComponent;
