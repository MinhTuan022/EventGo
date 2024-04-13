import {View, Text, StatusBar, StyleSheet} from 'react-native';
import React from 'react';
import {ButtonComponent} from '../../components';
import {Add, ArrowCircleRight, Message, TrendUp} from 'iconsax-react-native';
import {fontFamilies} from '../../utils/constants/fontFamilies';
import {globalStyles} from '../../styles/globalStyles';

const ManageEventScreen = ({navigation}:any) => {
  return (
    <View
      style={[
        globalStyles.container,
        {paddingTop: StatusBar.currentHeight, paddingHorizontal: 20},
      ]}>
      <ButtonComponent onPress={() => {navigation.navigate("AddNewEvent")}}
        text="Tạo mới sự kiện"
        iconLeft={<Add size={22} color="black" />}
        iconRight={<ArrowCircleRight size={22} color="black" />}
        type="primary"
        color="white"
        textColor="black"
        styles={localStyle.button}
        textStyle={{fontFamily: fontFamilies.medium}}
      />
      <ButtonComponent
        text="Sự kiện của tôi"
        iconLeft={<TrendUp size={22} color="black" />}
        iconRight={<ArrowCircleRight size={22} color="black" />}
        type="primary"
        color="white"
        textColor="black"
        styles={localStyle.button}
        textStyle={{fontFamily: fontFamilies.medium}}
      />
      <ButtonComponent
        text="Báo cáo, thống kê"
        iconLeft={<TrendUp size={22} color="black" />}
        iconRight={<ArrowCircleRight size={22} color="black" />}
        type="primary"
        color="white"
        textColor="black"
        styles={localStyle.button}
        textStyle={{fontFamily: fontFamilies.medium}}
      />
    </View>
  );
};

const localStyle = StyleSheet.create({
  button: {width: '100%', paddingVertical: 10, paddingHorizontal: 0},
});
export default ManageEventScreen;
