import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import Mapbox from '@rnmapbox/maps';
import {
  ArrowLeft,
  Calendar,
  Heart,
  Location,
  Magicpen,
  Ticket,
} from 'iconsax-react-native';
import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  Image,
  Linking,
  Modal,
  SafeAreaView,
  ScrollView,
  Share,
  StatusBar,
  TouchableOpacity,
  View,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';
import categoryAPI from '../../apis/categoryApi';
import eventAPI from '../../apis/eventApi';
import organizerAPI from '../../apis/organizerApi';
import ticketAPI from '../../apis/ticketApi';
import userAPI from '../../apis/userApi';
import {
  ButtonComponent,
  InputComponent,
  RowComponent,
  SectionComponent,
  ShapeComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';
import {EventModel} from '../../models/EventModel';
import {OrganizerModel} from '../../models/OrganizerModel';
import {
  addFavoriteEvent,
  authSelector,
  removeFavoriteEvent,
} from '../../redux/reducers/authReducer';
import {appColors} from '../../utils/constants/appColors';
import {fontFamilies} from '../../utils/constants/fontFamilies';
import {DateTime} from '../../utils/convertDateTime';
import {formatCurrency} from '../../utils/util';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LoadingModal from '../../components/modals/LoadingModal';

const EventDetailScreen = ({navigation, route}: any) => {
  const {id}: {id: string} = route.params;
  const {isManage} = route.params;

  const user = useSelector(authSelector);
  const [item, setItem] = useState<EventModel>();
  const [showMap, setShowMap] = useState(false);
  // const [isFollowing, setisFollowing] = useState(false);
  const [relationship, setRelationship] = useState('');
  const [userId, setUserId] = useState(user.id);
  const [favorite, setFavorite] = useState(false);
  const dispatch = useDispatch();
  const [organizer, setOrganizer] = useState<OrganizerModel>();
  const [attendees, setAttendees] = useState<any>([]);
  const [ticketData, setTicketData] = useState<any>();
  const [isEnd, setIsEnd] = useState(false);
  const [isOutStock, setIsOutStock] = useState(false);
  const [friend, setFriend] = useState<any>([]);
  const [isFollowing, setisFollowing] = useState(false);
  const [category, setCategory] = useState<any>();
  const [events, setEvents] = useState();
  const [currentTime, setCurrentTime] = useState(new Date());

  const [titleUpdate, setTitleUpdate] = useState(``);
  const [descriptionUpdate, setDescriptionUpdate] = useState('');

  const [ipTitle, setIpTitle] = useState(false);
  const [ipDesciption, setIpDesciption] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    getEventbyId(id);
  }, [id]);
  useEffect(() => {
    const currentTime = new Date();
    if (item) {
      const startEvent = new Date(item.startTime);
      if (currentTime > startEvent) {
        setIsEnd(true);
      }
    }
    if (ticketData) {
      let allZeroQuantity = true;
      ticketData.forEach((ticket: any) => {
        if (ticket.quantity !== 0) {
          allZeroQuantity = false;
        }
      });
      if (allZeroQuantity) {
        setIsOutStock(true);
      }
    }
  }, [item, ticketData]);

  useEffect(() => {
    if (item) {
      setTitleUpdate(item.title);
      setDescriptionUpdate(item.description);
      if (item.attendees) {
        getGoing(item.attendees);
      }
      if (item.category) {
        getCategoryById(item.category);
        // getEvents();
      }
      if (item.organizer) {
        getOrganizer(item.organizer);
      }

      if (item.tickets) {
        getTicket(item.tickets);
      }
    }

    if (user.favorites && user.favorites.includes(id)) {
      setFavorite(true);
    }
    if (user) {
      AsyncStorage.setItem('auth', JSON.stringify(user));
      // console.log('user', user);
    }
  }, [item, user]);
  useFocusEffect(
    React.useCallback(() => {
      if (item) {
        // checkRelationship(item.organizer);
        checkFollowing(item.organizer);
      }
    }, [item]),
  );

  // const checkRelationship = async (targetId: any) => {
  //   try {
  //     const res = await userAPI.HandleUser(
  //       `/check-relationship?userId=${userId}&targetUserId=${targetId}`,
  //     );
  //     setRelationship(res.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const checkFollowing = async (targetId: any) => {
    try {
      const res = await userAPI.HandleUser(
        `/check-following?userId=${userId}&targetUserId=${targetId}`,
      );
      setisFollowing(res.data);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  const getEventbyId = async (eventId: any) => {
    try {
      setIsLoading(true);

      const res = await eventAPI.HandleEvent(`/byId?id=${eventId}`);
      setItem(res.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const getCategoryById = async (cateId: any) => {
    try {
      const res = await categoryAPI.HandleCategory(`/byId?cateId=${cateId}`);
      console.log(res);
      setCategory(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getOrganizer = async (uid: any) => {
    try {
      const res = await organizerAPI.HandleOrganizer(`/byId?userId=${uid}`);
      setOrganizer(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getGoing = async (ids: any) => {
    try {
      const res = await eventAPI.HandleEvent(`/going?ids=${ids}`);
      setAttendees(res.data);
    } catch (error) {
      console.log('going', error);
    }
  };
  const getTicket = async (ids: any) => {
    try {
      const res = await ticketAPI.HandleTicket(`?ids=${ids}`);
      setTicketData(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleFavorite = async () => {
    try {
      setFavorite(!favorite);

      const res = await userAPI.HandleUser(
        `/favorite`,
        {userId, eventId: id},
        'post',
      );
      console.log(res);

      if (favorite) {
        dispatch(removeFavoriteEvent(id));
      } else {
        dispatch(addFavoriteEvent(id));
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getEvents = async () => {
    // const api = `?category=${cateId}`;
    // console.log(cateId)

    try {
      const res = await eventAPI.HandleEvent(
        `?category=${category.categoryName}`,
      );
      console.log(res);
      setEvents(res.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };
  const handleFollow = async () => {
    try {
      const targetUserId = item?.organizer;
      const res = await userAPI.HandleUser(
        '/follow',
        {userId, targetUserId},
        'post',
      );
      // console.log(res);
      // if (relationship === 'following') {
      //   setRelationship('none');
      // } else if (relationship === 'friend') {
      //   setRelationship('follower');
      // } else if (relationship === 'follower') {
      //   setRelationship('friend');
      // } else if (relationship === 'none') {
      //   setRelationship('following');
      // }
      setisFollowing(!isFollowing);
    } catch (error) {
      console.log(error);
    }
  };

  const updateEvent = async () => {
    try {
      const res = await eventAPI.HandleEvent(
        `/update?eventId=${id}`,
        {title: titleUpdate, description: descriptionUpdate},
        'put',
      );
      setShowModal(true)
    } catch (error) {
      console.log('update', error);
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
    if (item) {
      const url = `https://www.google.com/maps/search/?api=1&query=${item.geometry.coordinates[1]},${item.geometry.coordinates[0]}`;
      Linking.openURL(url);
    }
  };

  const animatedValue = useRef(new Animated.Value(0)).current;

  return (
    <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
      <StatusBar barStyle="dark-content" />
      {showModal && (
        <Modal transparent={true}>
          <StatusBar backgroundColor="rgba(0, 0, 0, 0.5)" translucent={true} />
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            }}>
            <View
              style={{
                backgroundColor: appColors.white,
                width: '80%',
                height: '30%',
                borderRadius: 50,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <TextComponent
                text="Thành công"
                color={appColors.primary}
                title
                size={20}
              />
              <View
                style={{
                  paddingHorizontal: 30,
                  paddingVertical: 20,
                  alignItems: 'center',
                }}>
                <TextComponent
                  text="Bạn đã sửa sự kiện thành công"
                  size={16}
                />
              </View>
              <ButtonComponent
                text="Trang Chủ"
                type="primary"
                onPress={() => {
                  setShowModal(false), navigation.navigate('HomeOgz');
                }}
                color={appColors.purple2}
                textColor={appColors.primary}
              />
            </View>
          </View>
        </Modal>
      )}
      <Animated.View
        style={{
          paddingTop: StatusBar.currentHeight,
          paddingHorizontal: 20,
          width: '100%',
          height: 100,
          position: 'absolute',
          backgroundColor: 'white',
          // alignItems:'center',
          // justifyContent:'center',
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
        {!isManage ? (
          <RowComponent>
            <ShapeComponent
              radius={12}
              color={appColors.white}
              size={36}
              onPress={handleFavorite}>
              <Heart
                size={20}
                color={appColors.primary}
                variant={favorite ? 'Bold' : 'Linear'}
              />
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
        ) : (
          <RowComponent
            onPress={updateEvent}
            styles={{
              backgroundColor: appColors.primary,
              paddingHorizontal: 10,
              paddingVertical: 7,
              borderRadius: 12,
            }}>
            <AntDesign name="check" size={20} color={appColors.white} />
            <TextComponent
              text="Lưu"
              color="white"
              font={fontFamilies.medium}
            />
          </RowComponent>
        )}
      </RowComponent>

      <ScrollView
        onScroll={e => {
          animatedValue.setValue(e.nativeEvent.contentOffset.y);
        }}
        scrollEventThrottle={16}>
        <View style={{height: 300}}>
          <Image
            resizeMode="cover"
            source={{
              uri: item
                ? item.photoEvent
                : 'https://th.bing.com/th/id/R.3663a6a0645024b783dfaba0e16eca2f?rik=RmACL83QdOI4tw&riu=http%3a%2f%2fwww.thedalejrfoundation.org%2fwidgets%2fstatic%2fimages%2fdefaultimage.png&ehk=%2fCMinQQyGjCzek1QICfIMogrKSbDKrXuYS5P5agBNFQ%3d&risl=&pid=ImgRaw&r=0',
            }}
            style={{height: '100%', width: '100%'}}
          />
        </View>
        {item && (
          <SectionComponent>
            {!ipTitle ? (
              <RowComponent>
                <TextComponent text={item.title} size={30} title />
                <SpaceComponent width={15} />
                {isManage && (
                  <Magicpen
                    size={20}
                    color="black"
                    onPress={() => {
                      setIpTitle(true);
                    }}
                  />
                )}
              </RowComponent>
            ) : (
              <InputComponent
                value={titleUpdate}
                onChange={val => {
                  setTitleUpdate(val);
                }}
              />
            )}
            <SpaceComponent height={10} />
            <RowComponent>
              <View
                style={{
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  borderRadius: 6,
                  borderWidth: 1,
                  borderColor: appColors.primary,
                }}>
                <TextComponent
                  text={`${category?.categoryName}`}
                  color={appColors.primary}
                />
              </View>
              <SpaceComponent width={10} />
              <RowComponent
                styles={{marginVertical: 12}}
                onPress={() =>
                  navigation.navigate('GoingScreen', {
                    attendees: attendees,
                  })
                }>
              
                {Array.from({
                  length: attendees.length > 3 ? 3 : attendees.length,
                }).map((it, index) => (
                  <Image
                    key={`img${index}`}
                    source={{
                      uri: attendees
                        ? attendees[index].photo
                        : 'https://th.bing.com/th/id/OIP.DxdqBFLVLPcWsjkds8636QHaHf?rs=1&pid=ImgDetMain',
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
                  // color={appColors.primary}
                  // font={fontFamilies.medium}
                  text={`${attendees.length} Người tham dự`}
                />
              </RowComponent>
            </RowComponent>
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
                  text={`${DateTime.GetTime(
                    item.startTime,
                  )} - ${DateTime.GetTime(item.endTime)}`}
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
                  text={item.address}
                  font={fontFamilies.medium}
                  size={16}
                />
                <TextComponent text={item.fullAddress} size={12} />
              </View>
            </RowComponent>
            <SpaceComponent height={20} />

            <RowComponent>
              <ShapeComponent color={appColors.purple2} size={48} radius={12}>
                <Ticket size={25} color={appColors.purple} variant="Bold" />
              </ShapeComponent>
              <SpaceComponent width={10} />
              <View>
                {ticketData && (
                  <TextComponent
                    text={
                      ticketData[0].price === 0
                        ? `Free`
                        : ticketData.length > 1
                        ? `${formatCurrency(
                            Math.min(
                              ...ticketData.map((ticket: any) => ticket.price),
                            ),
                          )} - ${formatCurrency(
                            Math.max(
                              ...ticketData.map((ticket: any) => ticket.price),
                            ),
                          )}`
                        : `${formatCurrency(ticketData[0].price)}`
                    }
                    font={fontFamilies.medium}
                    size={16}
                  />
                )}
                <TextComponent text={'Giá vé tuy theo loại'} size={12} />
              </View>
            </RowComponent>
          </SectionComponent>
        )}
        <View
          style={{
            marginHorizontal: 16,
            backgroundColor: appColors.gray2,
            height: 0.7,
          }}></View>
        <SectionComponent styles={{}}>
          {/* {item && ( */}
          <RowComponent styles={{justifyContent: 'space-between'}}>
            <RowComponent
              onPress={() => {
                navigation.navigate('ProfileOganizer', {
                  profiledata: organizer?._id,
                });
              }}>
              <Image
                source={{
                  uri: organizer
                    ? organizer.photo
                    : 'https://th.bing.com/th/id/OIP.DxdqBFLVLPcWsjkds8636QHaHf?rs=1&pid=ImgDetMain',
                }}
                style={{width: 48, height: 48, borderRadius: 12}}></Image>
              <SpaceComponent width={10} />
              <View>
                <TextComponent
                  text={String(organizer?.organizationName)}
                  font={fontFamilies.medium}
                  size={16}
                />
                <TextComponent text="Tổ chức sự kiện" size={12} />
              </View>
            </RowComponent>
            {/* <TouchableOpacity
                  onPress={handleFollow}
                  style={{
                    backgroundColor: appColors.purple2,
                    paddingHorizontal: 18,
                    paddingVertical: 8,
                    borderRadius: 12,
                  }}>
                  {relationship && relationship === 'friend' ? (
                    <TextComponent text="Friend" color={appColors.primary} />
                  ) : relationship === 'following' ? (
                    <TextComponent text="Following" color={appColors.primary} />
                  ) : relationship === 'follower' ? (
                    <TextComponent
                      text="Follow Lại"
                      color={appColors.primary}
                    />
                  ) : (
                    <TextComponent text="Follow" color={appColors.primary} />
                  )}
                </TouchableOpacity> */}
            {organizer && userId !== organizer._id ? (
              <TouchableOpacity
                onPress={handleFollow}
                style={{
                  backgroundColor: !isFollowing
                    ? appColors.primary
                    : appColors.purple2,
                  paddingHorizontal: 18,
                  paddingVertical: 8,
                  borderRadius: 12,
                }}>
                {isFollowing ? (
                  <TextComponent text="Following" color={appColors.primary} />
                ) : (
                  <TextComponent text="Follow" color={appColors.white} />
                )}
              </TouchableOpacity>
            ) : (
              <TextComponent text="You" font={fontFamilies.medium} />
            )}
          </RowComponent>
          {/* )} */}

          <View style={{paddingTop: 20}}>
            <RowComponent>
              <TextComponent
                text="Thông tin sự kiện "
                size={18}
                font={fontFamilies.medium}
              />
              {isManage && (
                <Magicpen
                  size={20}
                  color="black"
                  onPress={() => {
                    setIpDesciption(!ipDesciption);
                  }}
                />
              )}
            </RowComponent>

            <SpaceComponent height={20} />
            {!ipDesciption ? (
              <TextComponent
                isMore
                maxLength={187}
                size={16}
                text={String(item?.description)}
              />
            ) : (
              <InputComponent
                value={descriptionUpdate}
                onChange={val => {
                  setDescriptionUpdate(val);
                }}
              />
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
          <View style={{paddingTop: 20, flex: 1}}>
            <RowComponent styles={{justifyContent: 'space-between'}}>
              <TextComponent text="Địa điểm" title size={20} />
              <ButtonComponent
                onPress={handleShowMap}
                text={!showMap ? 'Xem bản đồ' : 'Ẩn bản đồ'}
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
                  text={String(item?.address)}
                  font={fontFamilies.medium}
                />
                <TextComponent text={`${item?.fullAddress}`} />
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
                    centerCoordinate={item?.geometry.coordinates}
                  />
                  <Mapbox.MarkerView coordinate={item?.geometry.coordinates}>
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
          {/* <View style={{paddingTop: 20}}>
            <TextComponent text="More Event like this" title size={20} />
            <FlatList
              scrollEnabled={false}
              data={events}
              renderItem={({item, index}) => (
                <EventItem type="list" item={item} key={index} />
              )}
            />
          </View> */}
        </SectionComponent>
      </ScrollView>
      {organizer && userId !== organizer._id && (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 20,
          }}>
          <ButtonComponent
            disable={isEnd ? true : isOutStock ? true : false}
            onPress={() =>
              navigation.navigate('OrderTickets', {
                item: item,
                tickets: ticketData,
              })
            }
            styles={{width: '70%', padding: 12}}
            text={
              isEnd
                ? 'Sự kiện đã kết thúc'
                : isOutStock
                ? 'Đã hết vé'
                : `Đặt Vé`
            }
            type="primary"
            textStyle={{fontFamily: fontFamilies.medium, fontSize: 16}}
          />
        </View>
      )}
      <LoadingModal backgd="white" visible={isLoading} />
    </SafeAreaView>
  );
};

export default EventDetailScreen;
