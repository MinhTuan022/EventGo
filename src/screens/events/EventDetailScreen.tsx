import Mapbox from '@rnmapbox/maps';
import {ArrowLeft, Calendar, Heart, Location} from 'iconsax-react-native';
import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  Image,
  Linking,
  SafeAreaView,
  ScrollView,
  Share,
  StatusBar,
  TouchableOpacity,
  View,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useSelector} from 'react-redux';
import {
  ButtonComponent,
  RowComponent,
  SectionComponent,
  ShapeComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';
import {authSelector} from '../../redux/reducers/authReducer';
import {globalStyles} from '../../styles/globalStyles';
import {appColors} from '../../utils/constants/appColors';
import {fontFamilies} from '../../utils/constants/fontFamilies';
import {DateTime} from '../../utils/convertDateTime';
import userAPI from '../../apis/userApi';
import { UserModel } from '../../models/UserModel';

const EventDetailScreen = ({navigation, route}: any) => {
  const {item}: {item: any} = route.params;
  const userId = useSelector(authSelector).id;
  const [showMap, setShowMap] = useState(false);
  const [profile, setProfile] = useState<UserModel>();
  // console.log(DateTime.GetDate(item.startTime));

  // const [eventDetail, setEventDetail] = useState<any>();

  // useEffect(() => {
  //   const hanldleEventDetail = async () => {
  //     try {
  //       const res = await eventAPI.HandleEvent(`/byId/${item._id}`);
  //       setEventDetail(res.data);
  //       // console.log(res)
  //       // console.log(eventDetail);
  //     } catch (error) {}
  //   };

  //   hanldleEventDetail();
  //   console.log(eventDetail);
  // }, []);
  useEffect(() => {
    if(item){
      
      handleProfile(item.organizer);
    }
    
  }, [item]);
  const handleProfile = async (id: string) => {
    try {
      const res = await userAPI.HandleUser(
        `/userId?userId=${id}`,
      );
      setProfile(res.data);
      // console.log(res)
    } catch (error) {
      console.log(error);
    }
  };
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

  const handleShowMap = () => {
    if (showMap === false) {
      setShowMap(true);
    } else {
      setShowMap(false);
    }
  };

  const openMap = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=105,21`;
    Linking.openURL(url);
  };
  const animatedValue = useRef(new Animated.Value(0)).current;
  // console.log(item._id);
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
            <Heart size={20} color={'red'} variant="Bold" />
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
        <View style={{height: 200}}>
          <Image
            resizeMode="cover"
            source={{uri: item.photoUrl}}
            style={{height: '100%', width: '100%'}}
          />
        </View>

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
                <RowComponent styles={{marginVertical: 12}}>
                  {Array.from({
                    length:
                      item.attendees.length > 3 ? 3 : item.attendees.length,
                  }).map((it, index) => (
                    <Image
                      key={`img${index}`}
                      source={{
                        uri: item.attendees[index].photo
                          ? item.attendees[index].photo
                          : 'https://images.pexels.com/photos/20568187/pexels-photo-20568187/free-photo-of-l-nh-tuy-t-th-i-trang-nh-ng-ng-i.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
                      }}
                      style={{
                        width: 24,
                        height: 24,
                        borderRadius: 100,
                        marginLeft: index > 0 ? -8 : 0,
                      }}
                    />
                  ))}

                  <TextComponent
                    styles={{marginLeft: 10}}
                    color={appColors.primary}
                    font={fontFamilies.medium}
                    text={`${item.attendees.length} Going`}
                  />
                </RowComponent>
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
          <TextComponent text={item.title} size={30} title />
          <SpaceComponent height={20} />
          <RowComponent>
            <ShapeComponent color={appColors.purple2} size={48} radius={12}>
              <Calendar size={25} color={appColors.purple} variant="Bold" />
            </ShapeComponent>
            <SpaceComponent width={10} />
            <View>
              <TextComponent
                text={DateTime.GetDate(item.startTime)}
                font={fontFamilies.medium}
                size={16}
              />
              {/* <TextComponent text="Tuesday, 4:00 PM - 9:00 PM" size={12} /> */}
              <TextComponent
                text={`${DateTime.GetTime(item.startTime)} - ${DateTime.GetTime(
                  item.endTime,
                )}`}
                size={12}
              />
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
                text={item.location}
                font={fontFamilies.medium}
                size={16}
              />
              <TextComponent text={item.location} size={12} />
            </View>
          </RowComponent>
          <SpaceComponent height={20} />
          {profile &&
          <RowComponent styles={{justifyContent: 'space-between'}}>
            <RowComponent
              onPress={
                userId !== item.organizer
                  ? () => {
                      navigation.navigate('ProfileNavigator', {
                        profileData: profile,
                      });
                    }
                  : () => {
                      navigation.navigate('Profile');
                    }
              }>
              <Image
                source={{
                  uri: profile.photo
                    ? profile.photo
                    : 'https://images.pexels.com/photos/1825012/pexels-photo-1825012.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
                }}
                style={{width: 48, height: 48, borderRadius: 12}}></Image>
              <SpaceComponent width={10} />
              <View>
                <TextComponent
                  text={profile.name}
                  font={fontFamilies.medium}
                  size={16}
                />
                <TextComponent text="Organizer" size={12} />
              </View>
            </RowComponent>
            {userId !== item.organizer ? (
              <TouchableOpacity
                style={{
                  backgroundColor: appColors.purple2,
                  paddingHorizontal: 18,
                  paddingVertical: 8,
                  borderRadius: 12,
                }}>
                <TextComponent text="Follow" color={appColors.primary} />
              </TouchableOpacity>
            ) : (
              <TextComponent
                text="You"
                font={fontFamilies.semiBold}
                color={appColors.gray2}
              />
            )}
          </RowComponent>}
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
            <TextComponent maxLength={187} size={16} text={item.description} />
          </View>
        </SectionComponent>
        <SectionComponent>
          <View
            style={{
              backgroundColor: appColors.gray2,
              width: '100%',
              height: 0.4,
            }}></View>
          <View style={{paddingTop: 20, flex: 1}}>
            <RowComponent styles={{justifyContent: 'space-between'}}>
              <TextComponent text="Location" title size={20} />
              <ButtonComponent
                onPress={handleShowMap}
                text={!showMap ? 'Show map' : 'Hide map'}
                type="link"
                textStyle={{fontFamily: fontFamilies.medium, fontSize: 16}}
              />
            </RowComponent>

            <SpaceComponent height={10} />
            <RowComponent>
              <Location size={20} color="black" variant="Bold" />
              <SpaceComponent width={10} />
              <View>
                <TextComponent
                  text={item.location}
                  font={fontFamilies.medium}
                />
                <TextComponent text="27 Via Tortona" />
                <TextComponent text="20144 Milano" />
              </View>
            </RowComponent>
            {showMap ? (
              <TouchableOpacity
                onPress={openMap}
                style={{
                  width: '100%',
                  paddingTop: 20,
                  height: 230,
                  borderRadius: 12,
                }}>
                <Mapbox.MapView
                  zoomEnabled={false}
                  style={{flex: 1}}
                  attributionEnabled={false}
                  logoEnabled={false}>
                  <Mapbox.Camera
                    animationMode="flyTo"
                    zoomLevel={14}
                    centerCoordinate={[105.7655, 21.0109]}
                  />
                  <Mapbox.MarkerView coordinate={[105.7655, 21.0109]}>
                    <View style={{}}>
                      <Location size={30} color="red" variant="Bold" />
                    </View>
                  </Mapbox.MarkerView>
                </Mapbox.MapView>
              </TouchableOpacity>
            ) : (
              <></>
            )}
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
