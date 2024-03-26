import Mapbox from '@rnmapbox/maps';
import {Location} from 'iconsax-react-native';
import React, {useEffect, useState} from 'react';
import {StatusBar, View} from 'react-native';
import {
  RowComponent,
  SectionComponent,
  ShapeComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';
import {globalStyles} from '../../styles/globalStyles';
import {appColors} from '../../utils/constants/appColors';
import eventAPI from '../../apis/eventApi';
import Geolocation from '@react-native-community/geolocation';
import {EventModel} from '../../models/EventModel';

const MapScreen = ({navigation}: any) => {
  const [events, setEvents] = useState([]);
  // const [location, setLocation] = useState({latitude: 0, longitude: 0});
  useEffect(() => {
    Geolocation.getCurrentPosition(
      (position: any) => {
        const {latitude, longitude} = position.coords;
        getEvents(latitude, longitude)

      },
      (error: any) => console.log('Error getting location: ', error),
      {},
    );
  }, []);

  const getEvents = async (lat: number, long: number, distance?: number) => {
    const api = `/?lat=${lat}&long=${long}&distance=${distance ? distance : 5}`;
    try {
      const res = await eventAPI.HandleEvent(api);
      setEvents(res.data);

      // console.log(events);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };
  return (
    <View style={[globalStyles.container, {}]}>
      <StatusBar barStyle={'dark-content'} />
      <Mapbox.MapView style={{flex: 1}} logoEnabled={false}>
        <Mapbox.Camera
          zoomLevel={15}
          followUserLocation
          animationMode="flyTo"
          minZoomLevel={10}
        />
        <Mapbox.UserLocation visible={true} />

        {events.map((item: EventModel, index: any) => (
          <Mapbox.MarkerView
            id={`hgg${index}`}
            key={index}
            coordinate={[
              item.position.coordinates[1],
              item.position.coordinates[0],
            ]}>
            <View
              style={{
                backgroundColor: appColors.purple2,
                padding: 5,
                borderRadius: 5,
              }}>
              <TextComponent text={item.title} />
            </View>
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
              <TextComponent text="Location" />
            </View>
            <SpaceComponent width={20} />
            <ShapeComponent radius={12} size={50} color={appColors.purple2}>
              <Location size={25} color="black" />
            </ShapeComponent>
          </RowComponent>
        </SectionComponent>
      </View>
    </View>
  );
};

export default MapScreen;
