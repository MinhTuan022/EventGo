import Geolocation from '@react-native-community/geolocation';
import Mapbox from '@rnmapbox/maps';
import axios from 'axios';
import { Edit2, Location } from 'iconsax-react-native';
import React, { useEffect, useRef, useState } from 'react';
import {
  FlatList,
  Image,
  StatusBar,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import { useSelector } from 'react-redux';
import eventAPI from '../../apis/eventApi';
import {
  EventItem,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';
import { AddressModel } from '../../models/AddressModel';
import { EventModel } from '../../models/EventModel';
import { authSelector } from '../../redux/reducers/authReducer';
import { globalStyles } from '../../styles/globalStyles';
import { appColors } from '../../utils/constants/appColors';
import { appInfo } from '../../utils/constants/appInfos';
import { fontFamilies } from '../../utils/constants/fontFamilies';


const MapScreen = ({navigation}: any) => {
  const [events, setEvents] = useState([]);
  const [currentLocation, setCurrentLocation] = useState<AddressModel>();
  const [location, setLocation] = useState({latitude: 0, longitude: 0});
  const [textInputValue, setTextInputValue] = useState('');
  const [distance, setDistance] = useState('5');
  const [isEditDistance, setisEditDistance] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isPress, setIsPress] = useState(false);
  const user = useSelector(authSelector);

  const flatListRef = useRef<any>(null);
  useEffect(() => {
    Geolocation.getCurrentPosition(
      (position: any) => {
        const {latitude, longitude} = position.coords;
        getEvents(latitude, longitude, distance);
        reverseGeoCode(latitude, longitude);
        setLocation({latitude, longitude});
      },
      (error: any) => console.log('Error getting location: ', error),
      {},
    );
  }, [distance]);
  const handleMarkerClick = (index: any) => {
    setSelectedItem(index);
    setIsPress(true);
    // Gọi phương thức scroll đến item
    flatListRef.current.scrollToIndex({index});
  };

  const getEvents = async (lat: number, long: number, distance?: any) => {
    const api = `/?lat=${lat}&long=${long}&distance=${distance}`;
    try {
      const res = await eventAPI.HandleEvent(api);
      setEvents(res.data);
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
  const handleChangeDistance = () => {
    setisEditDistance(!isEditDistance);
    setDistance(textInputValue);
  };

  return (
    <View style={[globalStyles.container, {}]}>
      <StatusBar barStyle={'dark-content'} />
      <Mapbox.MapView style={{flex: 1}} logoEnabled={false}>
        <Mapbox.Camera
          zoomLevel={15}
          centerCoordinate={[location.longitude, location.latitude]}
          animationMode="none"
          minZoomLevel={15}
        />
        {/* <Mapbox.UserLocation visible={true} /> */}
        <Mapbox.MarkerView coordinate={[location.longitude, location.latitude]}>
          <View
            style={{
              backgroundColor: appColors.white,
              padding: 5,
              borderRadius: 100,
            }}>
            <Image
              source={{uri: user.photo}}
              style={{width: 50, height: 50, borderRadius: 100}}
            />
          </View>
        </Mapbox.MarkerView>
        {events.map((item: EventModel, index: any) => (
          <Mapbox.MarkerView
            // id={`hgg${index}`}
            key={index}
            coordinate={[
              item.position.coordinates[1],
              item.position.coordinates[0],
            ]}>
            <TouchableOpacity
              onPress={() => handleMarkerClick(index)}
              style={{
                backgroundColor:
                  selectedItem === index ? 'red' : appColors.primary,
                padding: 5,
                borderRadius: 100,
              }}>
              <View
                style={{
                  padding: 3,
                  backgroundColor: 'white',
                  borderRadius: 100,
                }}>
                <Image
                  source={{uri: item.photoUrl}}
                  style={{width: 35, height: 35, borderRadius: 100}}
                />
              </View>
            </TouchableOpacity>

          </Mapbox.MarkerView>
        ))}
      </Mapbox.MapView>
      <View
        style={{
          position: 'absolute',
          width: '100%',
          marginTop: Number(StatusBar.currentHeight) + 20,
        }}>
        <SectionComponent
          styles={{
            borderRadius: 30,
            marginHorizontal: 20,
            backgroundColor: 'white',
          }}>
          <RowComponent styles={{}}>
            <View style={{flex: 1}}>
              <RowComponent styles={{paddingBottom: 10}}>
                <Location size={14} color={appColors.primary} variant="Bold" />
                <TextComponent
                  text={`Location (within ${distance} km)`}
                  styles={{paddingLeft: 10}}
                />
              </RowComponent>

              <TextComponent
                text={
                  currentLocation
                    ? `${currentLocation.address.city}, ${currentLocation.address.countryName}`
                    : ''
                }
                font={fontFamilies.medium}
              />
            </View>

            <SpaceComponent width={20} />
            {isEditDistance ? (
              <RowComponent>
                <TextInput
                  style={{
                    borderWidth: 1,
                    borderColor: appColors.gray2,
                    height: 40,
                    width: 60,
                    textAlign: 'center',
                    borderRadius: 12,
                  }}
                  onChangeText={setTextInputValue}
                  placeholder="Km"
                />

                <TouchableOpacity onPress={handleChangeDistance} style={{}}>
                  <Entypo size={24} color={appColors.primary} name="check" />
                </TouchableOpacity>
              </RowComponent>
            ) : (
              <TouchableOpacity
                onPress={handleChangeDistance}
                style={{
                  backgroundColor: appColors.primary,
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  borderRadius: 100,
                }}>
                <RowComponent>
                  <Edit2 size={12} color={appColors.white} variant="Bold" />
                  <SpaceComponent width={7} />
                  <TextComponent text="Change" color="white" />
                </RowComponent>
              </TouchableOpacity>
            )}
          </RowComponent>
        </SectionComponent>
      </View>

      <FlatList
        ref={flatListRef}
        style={{position: 'absolute', bottom: 0, width: '100%'}}
        showsHorizontalScrollIndicator={false}
        data={events}
        horizontal
        renderItem={({item, index}) => (
          <EventItem key={index} item={item} type="list" />
        )}
      />
    </View>
  );
};

export default MapScreen;
