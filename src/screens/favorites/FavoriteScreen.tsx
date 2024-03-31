import { ArrowCircleRight } from 'iconsax-react-native';
import React from 'react';
import { Image, StatusBar, View } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {
  ButtonComponent,
  RowComponent,
  SectionComponent,
  TextComponent,
} from '../../components';
import { globalStyles } from '../../styles/globalStyles';
import { fontFamilies } from '../../utils/constants/fontFamilies';

const  FavoriteScreen = () => {
  return (
    <View
      style={[globalStyles.container, {paddingTop: StatusBar.currentHeight}]}>
      <SectionComponent>
        <RowComponent styles={{justifyContent: 'space-between'}}>
          <TextComponent text="Event" title />
          <Feather name="more-vertical" size={24} color="black" />
        </RowComponent>
      </SectionComponent>

      <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
        <Image source={require('../../assets/images/event.png')}></Image>
      </View>
      <ButtonComponent
        iconRight={<ArrowCircleRight size={22} color="white" />}
        text="EXPLORE EVENTS"
        type="primary"
        textStyle={{fontFamily: fontFamilies.regular}}
        styles={{marginBottom: 30, marginLeft: 40}}
      />
    </View>
  );
};

export default  FavoriteScreen;
