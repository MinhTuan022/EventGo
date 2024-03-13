import {View, Text, StatusBar} from 'react-native';
import React from 'react';
import {globalStyles} from '../../styles/globalStyles';
import {
  ButtonComponent,
  RowComponent,
  SectionComponent,
  TextComponent,
} from '../../components';
import Feather from 'react-native-vector-icons/Feather';
import {ArrowCircleRight} from 'iconsax-react-native';
import {Image} from 'react-native';
import {fontFamilies} from '../../utils/constants/fontFamilies';

const EventScreen = () => {
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
        iconFlex="right"
        icon={<ArrowCircleRight size={22} color="white" />}
        text="EXPLORE EVENTS"
        type="primary"
        textStyle={{fontFamily: fontFamilies.regular}}
        styles={{marginBottom: 30, marginLeft: 40}}
      />
    </View>
  );
};

export default EventScreen;
