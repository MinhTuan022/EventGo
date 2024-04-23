import {View, Text, StatusBar, TouchableOpacity, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {globalStyles} from '../../styles/globalStyles';
import {
  EventItem,
  HeaderComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';
import {ArrowLeft} from 'iconsax-react-native';
import {fontFamilies} from '../../utils/constants/fontFamilies';
import eventAPI from '../../apis/eventApi';

const SeeAllEvent = ({navigation, route}: any) => {
  const data = route.params;
  const [events, setEvents] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);

  const limit = 0;

  useEffect(() => {
    if (data.dataType === 'nearby' && data.lat && data.long) {
      getAllEvent(data.lat, data.long);
    } else {
      getAllEvent();
    }
  }, [data.dataType]);
  const getAllEvent = async (lat?: number, long?: number) => {
    const api =
      lat && long
        ? `/?limit=${limit}&date=${currentTime}&lat=${lat}&long=${long}&distance=${5}`
        : `/?limit=${limit}&date=${currentTime}`;
    try {
      setIsLoading(true);
      const res = await eventAPI.HandleEvent(api);
      if (res && res.data && lat && long) {
        setEvents(res.data);
      } else {
        setEvents(res.data);
      }
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching events:', error);
      setIsLoading(false);
    }
  };
  return (
    <View
      style={[globalStyles.container, {paddingTop: StatusBar.currentHeight}]}>
      <HeaderComponent goBack title="Sự kiện sắp diễn ra" />
      <FlatList
        data={events}
        renderItem={({item, index}) => <EventItem item={item} type="list"  key={index}/>}
      />
    </View>
  );
};

export default SeeAllEvent;
