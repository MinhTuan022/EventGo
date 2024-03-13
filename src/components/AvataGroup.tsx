import {View, Text, Image} from 'react-native';
import React from 'react';
import {RowComponent, TextComponent} from '.';
import { fontFamilies } from '../utils/constants/fontFamilies';
import { appColors } from '../utils/constants/appColors';

const AvataGroup = () => {
  return (
    <RowComponent styles={{marginVertical: 12,}}>
      {Array.from({length: 3}).map((item, index) => (
        <Image
        key={`img${index}`}
          source={require('../assets/images/luffi.jpg')}
          style={{width: 24, height: 24, borderRadius: 100, marginLeft: index > 0 ? -8 : 0}}
        />
      ))}

      <TextComponent styles={{marginLeft:10}} color={appColors.primary} font={fontFamilies.medium} text="+20 Going" />
    </RowComponent>
  );
};

export default AvataGroup;
