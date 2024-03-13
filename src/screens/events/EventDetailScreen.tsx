import {ArrowLeft, Calendar, Heart, Location} from 'iconsax-react-native';
import React from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  Share,
  StatusBar,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  AvataGroup,
  ButtonComponent,
  CardComponent,
  RowComponent,
  ShapeComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';
import {appColors} from '../../utils/constants/appColors';
import {fontFamilies} from '../../utils/constants/fontFamilies';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const EventDetailScreen = ({navigation}: any) => {
  const handleShare = async () => {
    try {
    
      const result = await Share.share({
        message: `Check out this event`, url:'jiji', title:'hfhf'
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log('Shared with activity type:', result.activityType);
        } else {
          console.log('Shared');
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('Dismissed');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <StatusBar barStyle="light-content" />
      <ImageBackground
        source={require('../../assets/images/bg-eventdt.png')}
        imageStyle={{height: 244}}>
        <View
          style={{
            paddingTop: Number(StatusBar.currentHeight) + 10,
            paddingHorizontal: 24,
          }}>
          <RowComponent styles={{justifyContent: 'space-between'}}>
            <RowComponent>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <ArrowLeft
                  size={24}
                  color="white"
                />
              </TouchableOpacity>

              <SpaceComponent width={15} />
              <TextComponent text="Event Details" title color="white" />
            </RowComponent>
            <RowComponent>
              <ShapeComponent radius={12} color={appColors.white3} size={36}>
                <MaterialIcons
                  name="bookmark"
                  size={20}
                  color={appColors.white}
                />
              </ShapeComponent>
              <SpaceComponent width={10} />
              <ShapeComponent
                radius={12}
                color={appColors.white3}
                size={36}
                onPress={handleShare}>
                <MaterialIcons
                  name="ios-share"
                  size={20}
                  color={appColors.white}
                />
              </ShapeComponent>
            </RowComponent>
          </RowComponent>
          <CardComponent styles={{borderRadius: 100, marginTop: 130}}>
            <RowComponent styles={{justifyContent: 'space-between'}}>
              <AvataGroup />
              <TouchableOpacity
                style={{
                  backgroundColor: appColors.primary,
                  paddingHorizontal: 18,
                  paddingVertical: 8,
                  borderRadius: 12,
                }}>
                <TextComponent text="Invite" color="white" />
              </TouchableOpacity>
            </RowComponent>
          </CardComponent>
        </View>
      </ImageBackground>
      <ScrollView style={{paddingHorizontal: 24}}>
        <TextComponent text="International Band Music Concert" size={35} />
        <SpaceComponent height={20} />
        <RowComponent>
          <ShapeComponent color={appColors.purple2} size={48} radius={12}>
            <Calendar size={25} color={appColors.purple} variant="Bold" />
          </ShapeComponent>
          <SpaceComponent width={10} />
          <View>
            <TextComponent
              text="14 December, 2021"
              font={fontFamilies.medium}
              size={16}
            />
            <TextComponent text="Tuesday, 4:00 PM - 9:00 PM" size={12} />
          </View>
        </RowComponent>
        <SpaceComponent height={20} />
        <RowComponent>
          <ShapeComponent color={appColors.purple2} size={48} radius={12}>
            <Location size={25} color={appColors.purple} variant="Bold" />
          </ShapeComponent>
          <SpaceComponent width={10} />
          <View>
            <TextComponent
              text="Gala Convention Center"
              font={fontFamilies.medium}
              size={16}
            />
            <TextComponent text="36 Guild Street London, UK" size={12} />
          </View>
        </RowComponent>
        <SpaceComponent height={20} />
        <RowComponent styles={{justifyContent: 'space-between'}}>
          <RowComponent>
            <Image
              source={require('../../assets/images/luffi.jpg')}
              style={{width: 48, height: 48, borderRadius: 12}}></Image>
            <SpaceComponent width={10} />
            <View>
              <TextComponent
                text="Minh Tuấn"
                font={fontFamilies.medium}
                size={16}
              />
              <TextComponent text="Organizer" size={12} />
            </View>
          </RowComponent>
          <TouchableOpacity
            style={{
              backgroundColor: appColors.purple2,
              paddingHorizontal: 18,
              paddingVertical: 8,
              borderRadius: 12,
            }}>
            <TextComponent text="Follow" color={appColors.primary} />
          </TouchableOpacity>
        </RowComponent>
        <SpaceComponent height={20} />
        <View>
          <TextComponent
            text="About Event"
            size={18}
            font={fontFamilies.medium}
          />
          <SpaceComponent height={20} />
          <TextComponent
            maxLength={200}
            size={16}
            text="Join us for an electrifying night at the Music Concert, where music and energy intertwine to create an unforgettable experience! Featuring top-notch artists and chart-topping hits, the event promises to captivate audiences from around the globe. From vibrant pop melodies to pulsating rock anthems and mesmerizing EDM beats, the English Music Concert guarantees to deliver a night of unparalleled musicality and sheer delight"
          />
        </View>
      </ScrollView>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: 20,
        }}>
        <ButtonComponent
          styles={{width: '70%', right: 0, left: 0, padding: 12}}
          text="GET TICKET $120"
          type="primary"
          textStyle={{fontFamily: fontFamilies.medium, fontSize: 16}}
        />
      </View>
    </View>
  );
};

export default EventDetailScreen;
