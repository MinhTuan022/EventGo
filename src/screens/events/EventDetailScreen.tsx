import {ArrowLeft, Calendar, Heart, Location} from 'iconsax-react-native';
import React, {useRef, useState} from 'react';
import {
  Animated,
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  Share,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  AvataGroup,
  ButtonComponent,
  CardComponent,
  RowComponent,
  SectionComponent,
  ShapeComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';
import {appColors} from '../../utils/constants/appColors';
import {fontFamilies} from '../../utils/constants/fontFamilies';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {globalStyles} from '../../styles/globalStyles';

const EventDetailScreen = ({navigation}: any) => {
  const handleShare = async () => {
    try {
      const result = await Share.share({
        message: `Check out this event`,
        url: 'jiji',
        title: 'hfhf',
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

  const animatedValue = useRef(new Animated.Value(0)).current;

  return (
    <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
      <StatusBar barStyle="dark-content" />
      <Animated.View
        style={{
          paddingTop: StatusBar.currentHeight,
          paddingHorizontal: 20,
          width: '100%',
          height: 100,
          position: 'absolute',
          backgroundColor: 'white',
          //   top: 0,
          zIndex: 1,
          opacity: animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
          }),
        }}></Animated.View>
      <RowComponent
        styles={{
          justifyContent: 'space-between',
          position: 'absolute',
          top: Number(StatusBar.currentHeight) + 10,
          width: '100%',
          paddingHorizontal: 24,
          zIndex: 1,
        }}>
        <RowComponent styles={{}}>
          <ShapeComponent
            radius={12}
            color={appColors.white}
            size={36}
            onPress={() => navigation.goBack()}>
            <ArrowLeft size={20} color="black" />
          </ShapeComponent>
        </RowComponent>
        <RowComponent>
          <ShapeComponent radius={12} color={appColors.white} size={36}>
            <Heart size={20} color={'red'} variant='Bold' />
          </ShapeComponent>
          <SpaceComponent width={10} />
          <ShapeComponent
            radius={12}
            color={appColors.white}
            size={36}
            onPress={handleShare}>
            <MaterialIcons name="ios-share" size={20} color={'black'} />
          </ShapeComponent>
        </RowComponent>
      </RowComponent>
      <ScrollView
        onScroll={e => {
          animatedValue.setValue(e.nativeEvent.contentOffset.y);
        }}
        scrollEventThrottle={16}>
        <Image
          source={require('../../assets/images/bg-eventdt.png')}
          style={{width: '100%'}}
        />
        <View
          style={{
            marginHorizontal: '12%',
          }}>
          <View
            style={{
              width: '100%',
              position: 'absolute',
              bottom: -30,
            }}>
            <TouchableOpacity
              style={[
                globalStyles.shadow,
                {
                  borderRadius: 100,
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  backgroundColor: 'white',
                },
              ]}>
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
            </TouchableOpacity>
          </View>
        </View>
        <SectionComponent>
          <SpaceComponent height={30} />
          <TextComponent
            text="International Band Music Concert"
            size={35}
            title
          />
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
        </SectionComponent>
        <SectionComponent>
          <View
            style={{
              backgroundColor: appColors.gray2,
              width: '100%',
              height: 0.4,
            }}></View>
          <View style={{paddingTop: 20}}>
            <TextComponent
              text="About Event"
              size={18}
              font={fontFamilies.medium}
            />
            <SpaceComponent height={20} />
            <TextComponent
              maxLength={187}
              size={16}
              text="Join us for an electrifying night at the Music Concert, where music and energy intertwine to create an unforgettable experience! Featuring top-notch artists and chart-topping hits, the event promises to captivate audiences from around the globe. From vibrant pop melodies to pulsating rock anthems and mesmerizing EDM beats, the English Music Concert guarantees to deliver a night of unparalleled musicality and sheer delight"
            />
          </View>
        </SectionComponent>
        <SectionComponent>
          <View
            style={{
              backgroundColor: appColors.gray2,
              width: '100%',
              height: 0.4,
            }}></View>
          <View style={{paddingTop: 20}}>
            <RowComponent styles={{justifyContent: 'space-between'}}>
              <TextComponent text="Location" title size={20} />
              <ButtonComponent
                text="Show map"
                type="link"
                textStyle={{fontFamily: fontFamilies.medium, fontSize: 16}}
              />
            </RowComponent>
            <SpaceComponent height={10} />
            <RowComponent>
              <Location size={20} color="black" variant='Bold'/>
              <SpaceComponent width={10} />
              <View>
                <TextComponent text="36 Guilde Street London, UK" font={fontFamilies.medium}/>
                <TextComponent text="27 Via Tortona" />
                <TextComponent text="20144 Milano" />
              </View>
            </RowComponent>
          </View>
        </SectionComponent>
        <SectionComponent>
          <View
            style={{
              backgroundColor: appColors.gray2,
              width: '100%',
              height: 0.4,
            }}></View>
          <View style={{paddingTop: 20}}>
            <TextComponent text="More Event like this" title size={20} />
            <TouchableOpacity style={{paddingVertical: 10}}>
              <RowComponent>
                <Image
                  source={require('../../assets/images/event-img.png')}
                  style={{width: 80, height: 80, borderRadius: 12}}
                />
                <View style={{flex: 1, marginLeft: 20}}>
                  <TextComponent
                    text="1ST MAY-SAT -2:00 PM"
                    color={appColors.primary}
                    size={12}
                    font={fontFamilies.medium}
                  />
                  <TextComponent
                    text="A virtual evening of smooth jazz"
                    title
                    size={19}
                  />
                </View>
              </RowComponent>
            </TouchableOpacity>
            <TouchableOpacity style={{paddingVertical: 10}}>
              <RowComponent>
                <Image
                  source={require('../../assets/images/event-img.png')}
                  style={{width: 80, height: 80, borderRadius: 12}}
                />
                <View style={{flex: 1, marginLeft: 20}}>
                  <TextComponent
                    text="1ST MAY-SAT -2:00 PM"
                    color={appColors.primary}
                    size={12}
                    font={fontFamilies.medium}
                  />
                  <TextComponent
                    text="A virtual evening of smooth jazz"
                    title
                    size={19}
                  />
                </View>
              </RowComponent>
            </TouchableOpacity>
          </View>
        </SectionComponent>
      </ScrollView>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: 20,
        }}>
        <ButtonComponent
          styles={{width: '70%', padding: 12}}
          text="GET TICKET $120"
          type="primary"
          textStyle={{fontFamily: fontFamilies.medium, fontSize: 16}}
        />
      </View>
    </SafeAreaView>
  );
};

export default EventDetailScreen;
