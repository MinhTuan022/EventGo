import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';
import {Notification, SearchNormal, Sort} from 'iconsax-react-native';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  View,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useDispatch} from 'react-redux';
import eventAPI from '../../apis/eventApi';
import {
  EventItem,
  RowComponent,
  SectionComponent,
  ShapeComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';
import CategoriesList from '../../components/CategoriesList';
import {AddressModel} from '../../models/AddressModel';
import {globalStyles} from '../../styles/globalStyles';
import {appColors} from '../../utils/constants/appColors';
import {fontFamilies} from '../../utils/constants/fontFamilies';
import categoryAPI from '../../apis/categoryApi';
import {appInfo} from '../../utils/constants/appInfos';
import {WebView} from 'react-native-webview';
import {useFocusEffect} from '@react-navigation/native';

const HomeScreen = ({navigation}: any) => {
  const dispatch = useDispatch();
  const [categories, setCategories] = useState([]);
  const [eventUpcoming, setEventUpcoming] = useState([]);
  const [eventNear, setEventNear] = useState([]);
  const [currentLocation, setCurrentLocation] = useState<AddressModel>();
  const [currentTime, setCurrentTime] = useState(new Date());
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
      fetchEvents();
      fetchEvents(currentLocation?.position.lat, currentLocation?.position.lng);
    }, [currentLocation]),
  );
  // useEffect(() => {
  //   fetchEvents(currentLocation?.position.lat, currentLocation?.position.lng);
  // }, [currentLocation]);
  const fetchEvents = async (
    lat?: number,
    long?: number,
    distance?: number,
  ) => {
    const api =
      lat && long
        ? `/?limit=${limit}&date=${currentTime}&lat=${lat}&long=${long}&distance=${
            distance ? distance : 5
          }`
        : `/?limit=${limit}&date=${currentTime}`;
    try {
      const res = await eventAPI.HandleEvent(api);
      if (res && res.data && lat && long) {
        setEventNear(res.data);
      } else {
        setEventUpcoming(res.data);
      }
      // console.log(events);
    } catch (error) {
      console.error('Error fetching events:', error);
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
  return (
    <View style={[globalStyles.container, {backgroundColor: appColors.white2}]}>
      <StatusBar barStyle={'light-content'} />

      {/* HeaderComponent */}
      <View
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
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
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
      </View>

      {/* Body */}
      <ScrollView
        style={{flex: 1, marginTop: 40}}
        showsVerticalScrollIndicator={false}>
        <RowComponent
          styles={{
            // marginTop: 40,
            justifyContent: 'space-between',
            paddingHorizontal: 16,
          }}>
          <TextComponent text="Upcomming Events" title />
          <TextComponent text="See All" />
        </RowComponent>

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
          <TextComponent text="NearBy" title />
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
      </ScrollView>
      {/* <WebView source={{ uri: 'https://reactnative.dev/' }}/> */}
    </View>
  );
};
export default HomeScreen;
