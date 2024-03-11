import {View, Text, Image, ScrollView} from 'react-native';
import React from 'react';
import {globalStyles} from '../../styles/globalStyles';
import {
  CardComponent,
  RowComponent,
  SectionComponent,
  TextComponent,
} from '../../components';
import { appColors } from '../../constants/appColors';
import { fontFamilies } from '../../constants/fontFamilies';

const EventComponrnt = () => {
  return (
    <View style={globalStyles.container}>
      <SectionComponent>
        <ScrollView>
          <CardComponent>
            <RowComponent>
              <Image
                source={require('../../assets/images/luffi.jpg')}
                style={{width: 60, height: 80, borderRadius: 12}}
              />
              <View style={{flex: 1, marginLeft: 20}}>
                <TextComponent text="1ST MAY-SAT -2:00 PM" color={appColors.primary} size={12} font={fontFamilies.medium}/>
                <TextComponent
                  text="A virtual evening of smooth jazz"
                  title
                  size={19}
                />
              </View>
            </RowComponent>
          </CardComponent>
          <CardComponent>
            <RowComponent>
              <Image
                source={require('../../assets/images/luffi.jpg')}
                style={{width: 60, height: 80, borderRadius: 12}}
              />
              <View style={{flex: 1, marginLeft: 20}}>
                <TextComponent text="1ST MAY-SAT -2:00 PM" color={appColors.primary} size={12} font={fontFamilies.medium}/>
                <TextComponent
                  text="A virtual evening of smooth jazz"
                  title
                  size={19}
                />
              </View>
            </RowComponent>
          </CardComponent>
          <CardComponent>
            <RowComponent>
              <Image
                source={require('../../assets/images/luffi.jpg')}
                style={{width: 60, height: 80, borderRadius: 12}}
              />
              <View style={{flex: 1, marginLeft: 20}}>
                <TextComponent text="1ST MAY-SAT -2:00 PM" color={appColors.primary} size={12} font={fontFamilies.medium}/>
                <TextComponent
                  text="A virtual evening of smooth jazz"
                  title
                  size={19}
                />
              </View>
            </RowComponent>
          </CardComponent>
        </ScrollView>
      </SectionComponent>
    </View>
  );
};

export default EventComponrnt;
