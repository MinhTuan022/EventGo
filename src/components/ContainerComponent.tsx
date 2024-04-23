import {View, Text, ScrollView, SafeAreaView, StyleProp, ViewStyle} from 'react-native';
import React, {ReactNode} from 'react';
import {ImageBackground} from 'react-native';
import {globalStyles} from '../styles/globalStyles';
import { StatusBar } from 'react-native';

interface Props {
  children: ReactNode;
  isImageBackground?: boolean;
  isScroll?: boolean;
  styles?: StyleProp<ViewStyle>
}

const ContainerComponent = (props: Props) => {
  const {children, isImageBackground, isScroll, styles} = props;
  const returnContainer = isScroll ? (
    <ScrollView>{children}</ScrollView>
  ) : (
    <View>{children}</View>
  );
  return isImageBackground ? (
    <ImageBackground
      source={require('../assets/images/splash-image.png')}
      style={{flex: 1}}
      imageStyle={{flex: 1}}>
      <SafeAreaView style={{flex: 1}}>{returnContainer}</SafeAreaView>
    </ImageBackground>
  ) : (
    <SafeAreaView style={[globalStyles.container,{paddingTop: StatusBar.currentHeight}, styles]}>
      <View>{returnContainer}</View>
    </SafeAreaView>
  );
};

export default ContainerComponent;
