import Geolocation from '@react-native-community/geolocation';
import {useFocusEffect} from '@react-navigation/native';
import axios from 'axios';
import {
  Filter,
  Location,
  Notification,
  SearchNormal,
} from 'iconsax-react-native';
import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import categoryAPI from '../../apis/categoryApi';
import eventAPI from '../../apis/eventApi';
import userAPI from '../../apis/userApi';
import {
  ButtonComponent,
  EventItem,
  RowComponent,
  SectionComponent,
  ShapeComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';
import {AddressModel} from '../../models/AddressModel';
import {EventModel} from '../../models/EventModel';
import {authSelector} from '../../redux/reducers/authReducer';
import {globalStyles} from '../../styles/globalStyles';
import {appColors} from '../../utils/constants/appColors';
import {appInfo} from '../../utils/constants/appInfos';
import {fontFamilies} from '../../utils/constants/fontFamilies';
import CategoriesList from '../../components/CategoriesList';
import {CurrentLocation} from '..';
import LodingModal from '../../components/modals/LoadingModal';
import SkeletonContent from 'react-native-skeleton-content';
import { HandleNotification } from '../../utils/handleNotification';

const HomeScreen = ({navigation}: any) => {
  const dispatch = useDispatch();
  const auth = useSelector(authSelector);
  // console.log(user)
  const [user, setUser] = useState<any>();
  const [categories, setCategories] = useState([]);
  const [eventUpcoming, setEventUpcoming] = useState<EventModel[]>([]);
  const [eventNear, setEventNear] = useState<EventModel[]>([]);
  const [currentLocation, setCurrentLocation] = useState<AddressModel>();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedCategory, setSelectedCategory] = useState('');
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [isLoading, setIsLoading] = useState(false);
  const handleSelectCategory = (categoryKey: any) => {
    setSelectedCategory(categoryKey);
    // console.log('Selected Category:', categoryKey);
  };
// useEffect(() => {
//   HandleNotification.checkNoticationPersion();
// }, [])
  const limit = 5;
  useEffect(() => {
    // Lấy vị trí hiện tại của người dùng khi component được mount
    Geolocation.getCurrentPosition(
      (position: any) => {
        // Lấy thông tin vị trí từ position
        const {latitude, longitude} = position.coords;
        // Cập nhật state với vị trí mới
        reverseGeoCode(latitude, longitude);
      },
      (error: any) => console.log('Error getting location: ', error),
      {},
    );
  }, []);
  useFocusEffect(
    React.useCallback(() => {
      fetchEvents(selectedCategory);
      fetchEvents(
        selectedCategory,
        currentLocation?.position.lat,
        currentLocation?.position.lng,
      );
      getUser();
      // console.log(selectedCategory)
    }, [currentLocation, selectedCategory]),
  );
  // useEffect(() => {
  //   fetchEvents(currentLocation?.position.lat, currentLocation?.position.lng);
  // }, [currentLocation]);
  const fetchEvents = async (
    category?: string,
    lat?: number,
    long?: number,
    distance?: number,
  ) => {
    const api =
      lat && long
        ? `/?limit=${limit}&date=${currentTime}&lat=${lat}&long=${long}&distance=${
            distance ? distance : 5
          }&category=${category}`
        : `/?limit=${limit}&date=${currentTime}&category=${selectedCategory}`;
    try {
      setIsLoading(true)
      const res = await eventAPI.HandleEvent(api);
      if (res && res.data && lat && long) {
        setEventNear(res.data);
      } else {
        setEventUpcoming(res.data);
      }
      // console.log(events);
      setIsLoading(false)

    } catch (error) {
      console.error('Error fetching events:', error);
      setIsLoading(false)

    }
  };
  const reverseGeoCode = async (lat: number, long: number) => {
    const api = `https://revgeocode.search.hereapi.com/v1/revgeocode?at=${lat},${long}&lang=vi-VN&apiKey=${appInfo.API_KEY_REVGEOCODE}`;

    try {
      const res = await axios(api);
      if (res && res.status === 200 && res.data) {
        const items = res.data.items;
        // console.log(items[0]);
        setCurrentLocation(items[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getCategories = async () => {
    try {
      const res = await categoryAPI.HandleCategory('/list');
      setCategories(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getUser = async () => {
    try {
      const res = await userAPI.HandleUser(`/userId?userId=${auth.id}`);
      setUser(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView
      style={[
        globalStyles.container,
        {
          backgroundColor: appColors.white2,
          paddingTop: StatusBar.currentHeight,
        },
      ]}>
      <StatusBar barStyle={'dark-content'} />

      {/* HeaderComponent */}
      {/* <View
        style={{
          backgroundColor: appColors.purple,
          height: '23%',
          borderBottomLeftRadius: 40,
          borderBottomRightRadius: 40,
          paddingTop: StatusBar.currentHeight,
          //  paddingHorizontal: 20,
        }}>
        <View style={{paddingHorizontal: 20, flex: 1}}>
          <RowComponent>
            <TouchableOpacity>
              <AntDesign name="menuunfold" size={25} color={appColors.white} />
            </TouchableOpacity>
            <View style={{flex: 1, alignItems: 'center'}}>
              <RowComponent>
                <TextComponent
                  text="Current Location"
                  color={appColors.gray2}
                />
                <MaterialIcons
                  name="arrow-drop-down"
                  size={17}
                  color={appColors.white}
                />
              </RowComponent>
              <TextComponent
                text={`${currentLocation?.address.city}, ${currentLocation?.address.countryCode}`}
                color="white"
                font={fontFamilies.medium}
              />
            </View>

            <ShapeComponent
              onPress={() => navigation.navigate('NotificationScreen')}>
              <View>
                <Notification size={18} color="white" />
                <View
                  style={{
                    backgroundColor: '#02E9FE',
                    width: 6,
                    height: 6,
                    borderRadius: 100,
                    position: 'absolute',
                    top: 1,
                    right: 1,
                  }}></View>
              </View>
            </ShapeComponent>
          </RowComponent>
          <TouchableOpacity onPress={() => navigation.navigate('SearchScreen')}>
            <RowComponent styles={{marginTop: '4%'}}>
              <RowComponent styles={{flex: 1}}>
                <SearchNormal size={22} color="white" variant="TwoTone" />
                <View
                  style={{
                    width: 1,
                    height: 18,
                    marginHorizontal: 12,
                    backgroundColor: '#A29EF0',
                  }}
                />
                <TextComponent
                  flex={1}
                  text="Search..."
                  color={appColors.gray2}
                  size={20}
                />
              </RowComponent>
              <TouchableOpacity
                onPress={() => {}}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: appColors.gray3,
                  borderRadius: 100,
                  paddingHorizontal: 12,
                  paddingVertical: 8,
                }}>
                <ShapeComponent
                  styles={{width: 22, height: 22}}
                  color="#A29EF0">
                  <Sort size={17} color={appColors.primary} />
                </ShapeComponent>
                <SpaceComponent width={5} />
                <TextComponent text="Filters" color="white" />
              </TouchableOpacity>
            </RowComponent>
          </TouchableOpacity>
        </View>

        <CategoriesList />
      </View> */}

      <ScrollView
        style={{flex: 1}}
        showsVerticalScrollIndicator={false}
        onScroll={e => {
          animatedValue.setValue(e.nativeEvent.contentOffset.y);
        }}>
        {/* /Header */}
        <SectionComponent>
          <RowComponent styles={{justifyContent: 'space-between'}}>
            <RowComponent>
              <Image
                source={{
                  uri: user
                    ? user.photo
                    : 'https://th.bing.com/th/id/OIP.DxdqBFLVLPcWsjkds8636QHaHf?rs=1&pid=ImgDetMain',
                }}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 100,
                  marginRight: 8,
                }}
              />
              <View>
                <TextComponent text="Good Morning" />
                <TextComponent
                  text={String(user?.name)}
                  font={fontFamilies.medium}
                  size={16}
                />
              </View>
            </RowComponent>
            <ShapeComponent
              styles={{
                backgroundColor: 'white',
                borderColor: appColors.gray2,
                borderWidth: 1,
              }}
              onPress={() => navigation.navigate('NotificationScreen')}>
              <View>
                <Notification size={18} color="black" />
                <View
                  style={{
                    backgroundColor: '#02E9FE',
                    width: 6,
                    height: 6,
                    borderRadius: 100,
                    position: 'absolute',
                    top: 1,
                    right: 1,
                  }}></View>
              </View>
            </ShapeComponent>
          </RowComponent>
          <ButtonComponent
            text="What event are looking for"
            iconLeft={<SearchNormal size={22} color={appColors.gray2} />}
            iconRight={<Filter size={22} color={appColors.primary} />}
            type="primary"
            styles={{width: '100%', marginTop: 20}}
            color={'#F5F5F5'}
            textColor={appColors.gray2}
          />
        </SectionComponent>

        {/* /Header */}
        <View style={{paddingHorizontal: 16}}>
          <CategoriesList onSelectCategory={handleSelectCategory} />
        </View>

        {/* Body */}
        <SectionComponent>
          <RowComponent
            styles={{
              // marginTop: 40,
              justifyContent: 'space-between',
              // paddingHorizontal: 16,
            }}>
            <TextComponent text="Upcomming Events" title size={20} />
            <TextComponent text="See All" />
          </RowComponent>
        </SectionComponent>

        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal
          data={eventUpcoming}
          renderItem={({item, index}) => (
            <EventItem key={index} item={item} type="card" />
          )}
        />

        <RowComponent
          styles={{
            // marginTop: 40,
            justifyContent: 'space-between',
            paddingHorizontal: 16,
          }}>
          <TextComponent text="NearBy" title size={20} />
          <TextComponent text="See All" />
        </RowComponent>

        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal
          data={eventNear}
          renderItem={({index, item}) => (
            <EventItem key={index} item={item} type="card" />
          )}
        />
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal
          data={eventUpcoming}
          renderItem={({item, index}) => (
            <EventItem key={index} item={item} type="card" />
          )}
        />
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal
          data={eventUpcoming}
          renderItem={({item, index}) => (
            <EventItem key={index} item={item} type="card" />
          )}
        />
      </ScrollView>
      {/* <CurrentLocation/>
       */}
      <View style={{alignItems: 'center'}}>
        <Animated.View
          style={[
            globalStyles.shadow,
            {
              paddingHorizontal: 13,
              paddingVertical: 13,
              position: 'absolute',
              backgroundColor: appColors.white,
              borderRadius: 100,
              zIndex: 1,
              bottom: 15,
              justifyContent: 'center',
              alignItems: 'center',
              opacity: animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 0],
              }),
              flexDirection: 'row',
            },
          ]}>
          <Location size={20} color={appColors.primary} />
          <SpaceComponent width={5} />
          <TextComponent
            text={`${currentLocation?.address.city}, ${currentLocation?.address.countryCode}`}
            color={appColors.primary}
            font={fontFamilies.medium}
          />
        </Animated.View>
        
      </View>
      <LodingModal visible={isLoading}/>
     
    </SafeAreaView>
  );
};
export default HomeScreen;
