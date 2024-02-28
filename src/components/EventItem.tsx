import { useNavigation } from '@react-navigation/native';
import { Facebook, Location } from 'iconsax-react-native';
import React from 'react';
import { Dimensions, ImageBackground } from 'react-native';
import { AvataGroup, CardComponent, RowComponent, SpaceComponent, TextComponent } from '.';
import { appColors } from '../constants/appColors';
import { fontFamilies } from '../constants/fontFamilies';

interface Props {
  item: any;
  type: 'cardhome' | 'cardtab';
}

const EventItem = (props: Props) => {
  const {item, type} = props;
  const navigation: any = useNavigation();
  return (
    <CardComponent
      styles={{
        width: Dimensions.get('window').width * 0.6,
        //   flexDirection: 'column'
        // backgroundColor: 'coral',
        
      }}
      onPress={() => navigation.navigate('EventDetailScreen')}>
      <ImageBackground
        imageStyle={{padding: 10, resizeMode: 'cover', borderRadius: 12}}
        style={{flex: 1, height: 131, justifyContent: 'space-between', flexDirection:'row'}}
        source={require('../assets/images/event-img.png')}>
        <CardComponent styles={{alignItems: 'center', width: 50, height: 50}}>
         <TextComponent text='10' size={15} font={fontFamilies.medium} color='red'/>
         <TextComponent text='June' size={10}/>
        </CardComponent>
        <CardComponent styles={{alignItems: 'center', width: 45, height: 45}}>
         <Facebook color='red' size={20}/>
        </CardComponent>
      </ImageBackground>
      <TextComponent text="International Band Mu..." title size={18} />
      <AvataGroup />
      <RowComponent>
        <Location size={16} color={appColors.gray2} variant='Bold'/>
        <SpaceComponent width={5}/>
        <TextComponent
          text="36 Guild Street LonDon, UK"
          color={appColors.gray2}
        />
      </RowComponent>
    </CardComponent>
  );
};

export default EventItem;
