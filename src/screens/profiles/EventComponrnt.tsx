import React, {useEffect, useState} from 'react';
import {Dimensions, FlatList, Image, View} from 'react-native';
import {
  CardComponent,
  EventItem,
  RowComponent,
  SectionComponent,
  TextComponent,
} from '../../components';
import {globalStyles} from '../../styles/globalStyles';
import {appColors} from '../../utils/constants/appColors';
import {fontFamilies} from '../../utils/constants/fontFamilies';
import eventAPI from '../../apis/eventApi';

const EventComponent = ({navigation, route}: any) => {
  const {id} = route.params;
  console.log(id);
  const [eventData, setEventData] = useState([]);
  useEffect(() => {
    if (id) {
      getEvent();
    }
  }, [id]);
  const getEvent = async () => {
    try {
      const res = await eventAPI.HandleEvent(`/byOrganizer?id=${id}`);
      console.log(res)
      setEventData(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={globalStyles.container}>
      <SectionComponent styles={{flex: 1}}>
        {eventData.length !== 0 ? (
          <FlatList
            data={eventData}
            renderItem={({item, index}:any) => (
              // <CardComponent
              //   key={index}
              //   onPress={() => navigation.navigate('EventDetail', {item})}>
              //   <RowComponent>
              //     {/* <Image
              //       source={{uri: item.photoUrl}}
              //       style={{width: 80, height: 80, borderRadius: 12}}
              //     /> */}
              //     <View style={{flex: 1, marginLeft: 20}}>
              //       <TextComponent
              //         text="1ST MAY-SAT -2:00 PM"
              //         color={appColors.primary}
              //         size={12}
              //         font={fontFamilies.medium}
              //       />
              //       <TextComponent text={item?.title} title size={19} />
              //     </View>
              //   </RowComponent>
              // </CardComponent>
              <EventItem styles={{width: Dimensions.get('window').width * 0.86}} item={item} type="list" />
            )}
          />
        ) : (
          <View
            style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
            <TextComponent
              text="Người dùng chưa tạo sự kiện nào"
              size={18}
              color={appColors.gray2}
            />
          </View>
        )}
      </SectionComponent>
    </View>
  );
};

export default EventComponent;
