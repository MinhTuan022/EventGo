import {
  ArrowCircleRight,
  FilterSearch,
  SearchFavorite,
} from 'iconsax-react-native';
import React, {useEffect, useState} from 'react';
import {FlatList, Image, StatusBar, View} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {
  ButtonComponent,
  EventItem,
  HeaderComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';
import {globalStyles} from '../../styles/globalStyles';
import {fontFamilies} from '../../utils/constants/fontFamilies';
import userAPI from '../../apis/userApi';
import {useSelector} from 'react-redux';
import {authSelector} from '../../redux/reducers/authReducer';
import {EventModel} from '../../models/EventModel';
import eventAPI from '../../apis/eventApi';
import {useFocusEffect} from '@react-navigation/native';
import LoadingModal from '../../components/modals/LoadingModal';
import LoadingComponent from '../../components/LoadingComponent';

const FavoriteScreen = () => {
  const user = useSelector(authSelector);
  const [idsFavorite, setIdsFavorite] = useState<string[]>([]);
  const [eventFavorites, setEventFavorites] = useState<any>([]);
  const [isLoading, setisLoading] = useState(false);
  // useEffect(() => {

  //     getIdFavorites();

  // }, []);
  // useEffect(() => {
  //   // if (idsFavorite.length > 0) {
  //     getFavorites();
  //   // }
  // }, [idsFavorite]);
  useFocusEffect(
    React.useCallback(() => {
      getIdFavorites();
      if (idsFavorite && idsFavorite.length > 0) {
        getFavorites();
      } else {
        setEventFavorites([]);
      }
    }, [idsFavorite]),
  );

  const getIdFavorites = async () => {
    try {

      const res = await userAPI.HandleUser(`/favorites?userId=${user.id}`);
      // console.log(res)
      setIdsFavorite(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getFavorites = async () => {
    try {

      if (idsFavorite.length === 0) {
        return; // Không có idsFavorite, không cần gọi API
      }

      const res = await eventAPI.HandleEvent(`/favorite?ids=${idsFavorite}`);
      // console.log(res)
      setEventFavorites(res.data);


    } catch (error) {
      console.log('d', error);

    }
  };
  return (
    <View
      style={[globalStyles.container, {paddingTop: StatusBar.currentHeight}]}>
      <HeaderComponent title="Ưu Thích" />
      <SectionComponent>
        <TextComponent
          text={`${eventFavorites.length} Sự kiện ưu thích`}
          title
          size={18}
        />
      </SectionComponent>
      {eventFavorites.length > 0 ? (
        <FlatList
          data={eventFavorites}
          renderItem={({item, index}) => (
            <EventItem item={item} type="list" key={index} maxTitle={24} />
          )}
        />
      ) : (
        // <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        //   <Image
        //     source={require('../../assets/images/noticket.png')}
        //     style={{width: '100%', height: 300}}
        //     resizeMode="cover"
        //   />
        //   <TextComponent text="Không có sự kiện ưu thích nào" title size={18} />
        // </View>
        <LoadingComponent
          mess="Không có sự kiện ưu thích nào"
          children={
            <Image
              source={require('../../assets/images/noticket.png')}
              style={{width: 300, height: 300}}
              resizeMode="cover"
            />
          }
          values={eventFavorites.length}
          isLoading={isLoading}
        />
      )}
      <LoadingModal backgd="white" visible={isLoading} />
    </View>
  );
};

export default FavoriteScreen;
