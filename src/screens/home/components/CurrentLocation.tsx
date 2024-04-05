import {View, Text} from 'react-native';
import React from 'react';
import {appColors} from '../../../utils/constants/appColors';
import { TextComponent } from '../../../components';
interface Props{
  location?: string
}
const CurrentLocation = (props: Props) => {
  const {location} = props
  return (
    <View style={{alignItems: 'center'}}>
      <View
        style={{
          position: 'absolute',
          bottom: 10,
          backgroundColor: appColors.white,
          width: '30%',
          height: 40,
          alignItems: 'center',
          justifyContent:'center',
          borderRadius:12
        }}>
        <TextComponent text={location ? location : 'Không xác định'}/>
      </View>
    </View>
  );
};

export default CurrentLocation;
