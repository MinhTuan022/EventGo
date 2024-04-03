import {useNavigation} from '@react-navigation/native';
import {
  ArchiveTick,
  Facebook,
  GalleryFavorite,
  Heart,
  Location,
} from 'iconsax-react-native';
import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  AvataGroup,
  CardComponent,
  RowComponent,
  SectionComponent,
  ShapeComponent,
  SpaceComponent,
  TextComponent,
} from '.';
import {appColors} from '../utils/constants/appColors';
import {fontFamilies} from '../utils/constants/fontFamilies';
import {EventModel} from '../models/EventModel';
import eventAPI from '../apis/eventApi';
import {DateTime} from '../utils/convertDateTime';
import userAPI from '../apis/userApi';
import {useSelector} from 'react-redux';
import {AuthState, authSelector} from '../redux/reducers/authReducer';

interface Props {
  item: EventModel;
  type: 'card' | 'list';
  disible?: boolean;
}

const EventItem = (props: Props) => {
  const {item, type, disible} = props;
  const user: AuthState = useSelector(authSelector);
  const navigation: any = useNavigation();
  const [attendees, setAttendees] = useState<any>([]);

  useEffect(() => {
    getGoing(item.attendees);
  }, [item.attendees]);
  const getGoing = async (ids: any) => {
    try {
      const res = await eventAPI.HandleEvent(`/going?ids=${ids}`);
      setAttendees(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <CardComponent
      styles={{
        width:
          type === 'card'
            ? Dimensions.get('window').width * 0.6
            : Dimensions.get('window').width * 0.93,
      }}
      onPress={
        !disible ? () => navigation.navigate('EventDetail', {item}) : undefined
      }>
      {type === 'card' ? (
        <>
          <ImageBackground
            imageStyle={{padding: 10, resizeMode: 'cover', borderRadius: 12}}
            style={{
              flex: 1,
              height: 131,
              justifyContent: 'space-between',
              flexDirection: 'row',
              marginBottom: 16,
            }}
            source={{uri: item.photoUrl ?? item.photoUrl}}>
            <CardComponent
              styles={{
                alignItems: 'center',
                width: 45,
                height: 45,
                justifyContent: 'center',
                paddingHorizontal: 0,
                paddingVertical: 0,
              }}>
              <TextComponent
                text={DateTime.GetOnlyDate(item.startTime)}
                size={18}
                font={fontFamilies.medium}
                color="red"
              />
              <TextComponent
                text={DateTime.GetOnlyMonth(item.startTime)}
                size={11}
                font={fontFamilies.medium}
                color="red"
              />
            </CardComponent>

            <ShapeComponent
              onPress={() => {}}
              radius={10}
              size={30}
              color="white"
              styles={{margin: 12}}>
              <Heart
                color="red"
                size={18}
                variant={
                  user.favorites && item && user.favorites.includes(item._id)
                    ? 'Bold'
                    : 'Linear'
                }
              />
            </ShapeComponent>
          </ImageBackground>
          <TextComponent text={item.title} title size={18} />
          <RowComponent styles={{marginVertical: 12}}>
            {Array.from({
              length: attendees.length > 3 ? 3 : attendees.length,
            }).map((ite, index) => (
              <Image
                key={`img${index}`}
                source={{
                  uri: attendees[index].photo
                    ? attendees[index].photo
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
          <RowComponent>
            <Location size={16} color={appColors.gray2} variant="Bold" />
            <SpaceComponent width={5} />
            <TextComponent text={item.location} color={appColors.gray2} />
          </RowComponent>
        </>
      ) : (
        <>
          <RowComponent>
            <Image
              source={{uri: item.photoUrl}}
              style={{height: 90, width: 90, borderRadius: 12}}
            />
            <View
              style={{
                flex: 1,
                marginLeft: 10,
              }}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'space-around',
                }}>
                <TextComponent text={item.title} title size={18} />
                <TextComponent
                  text={`${DateTime.GetDateNotYear(
                    item.startTime,
                  )} - ${DateTime.GetTime24h(
                    item.startTime,
                  )} - ${DateTime.GetTime24h(item.endTime)} `}
                  color={appColors.primary}
                  font={fontFamilies.medium}
                />
                <RowComponent styles={{justifyContent: 'space-between'}}>
                  <RowComponent>
                    <Location
                      size={16}
                      color={appColors.primary}
                      variant="Bold"
                    />
                    <TextComponent text={item.location} />
                  </RowComponent>

                  <TouchableOpacity>
                    <Heart
                      size={18}
                      color={appColors.primary}
                      variant={
                        user.favorites &&
                        item &&
                        user.favorites.includes(item._id)
                          ? 'Bold'
                          : 'Linear'
                      }
                    />
                  </TouchableOpacity>
                </RowComponent>
              </View>
            </View>
          </RowComponent>
        </>
      )}
    </CardComponent>
  );
};

export default EventItem;
