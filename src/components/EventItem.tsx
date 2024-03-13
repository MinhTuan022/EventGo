import {useNavigation} from '@react-navigation/native';
import {
  ArchiveTick,
  Facebook,
  GalleryFavorite,
  Location,
} from 'iconsax-react-native';
import React from 'react';
import {Dimensions, ImageBackground} from 'react-native';
import {
  AvataGroup,
  CardComponent,
  RowComponent,
  ShapeComponent,
  SpaceComponent,
  TextComponent,
} from '.';
import {appColors} from '../utils/constants/appColors';
import {fontFamilies} from '../utils/constants/fontFamilies';

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
      }}
      onPress={() => navigation.navigate('EventDetail')}>
      <ImageBackground
        imageStyle={{padding: 10, resizeMode: 'cover', borderRadius: 12}}
        style={{
          flex: 1,
          height: 131,
          justifyContent: 'space-between',
          flexDirection: 'row',
          marginBottom: 16,
        }}
        source={require('../assets/images/event-img.png')}>
          <CardComponent
            styles={{
              alignItems: 'center',
              width: 45,
              height: 45,
              justifyContent: 'center',
              paddingHorizontal: 0,
              paddingVertical: 0
            }}>
            <TextComponent
              text="10"
              size={18}
              font={fontFamilies.medium}
              color="red"
            />
            <TextComponent
              text="June"
              size={11}
              font={fontFamilies.medium}
              color="red"
            />
          </CardComponent>
          
          <ShapeComponent
            radius={10}
            size={30}
            color="white"
            styles={{margin: 12,}}>
            <ArchiveTick color="red" size={14} variant="Bold" />
          </ShapeComponent>
      </ImageBackground>
      <TextComponent text="International Band Mu..." title size={18} />
      <AvataGroup />
      <RowComponent>
        <Location size={16} color={appColors.gray2} variant="Bold" />
        <SpaceComponent width={5} />
        <TextComponent
          text="36 Guild Street LonDon, UK"
          color={appColors.gray2}
        />
      </RowComponent>
    </CardComponent>
  );
};

export default EventItem;
