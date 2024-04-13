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

const FavoriteScreen = () => {
  const user = useSelector(authSelector);
  const [idsFavorite, setIdsFavorite] = useState<string[]>([]);
  const [eventFavorites, setEventFavorites] = useState<any>([]);

  useEffect(() => {
    if (user) {
      getIdFavorites();
    }
  }, [user]);
  useEffect(() => {
    if (idsFavorite.length > 0) {
      getFavorites();
    }
  }, [idsFavorite]);
  

  const getIdFavorites = async () => {
    try {
      const res = await userAPI.HandleUser(`/favorites?userId=${user.id}`);
      // console.log(res)
      setIdsFavorite(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getFavorites = async () =>{
    try {
      const res = await eventAPI.HandleEvent(`/favorite?ids=${idsFavorite}`)
      // console.log(res)
      setEventFavorites(res.data)
    } catch (error) {
      console.log("d",error)
    }
  }
  return (
    <View
      style={[globalStyles.container, {paddingTop: StatusBar.currentHeight}]}>
      {/* <SectionComponent>
        <RowComponent styles={{justifyContent: 'space-between'}}>
          <TextComponent text="Favorites" title size={22} />
          <RowComponent>
            <SearchFavorite size={22} color="black" />
            <SpaceComponent width={10} />
            <FilterSearch size={22} color="black" />
          </RowComponent>
        </RowComponent>
      </SectionComponent> */}
      <HeaderComponent title='Favorites'/>
      <SectionComponent >
        <TextComponent text={`${eventFavorites.length} favorites`} title size={18}/>
      </SectionComponent>
      <FlatList
        data={eventFavorites}
        renderItem={({item, index}) => (
          <EventItem item={item} type="list" key={index}/>
        )}
      />
    </View>
  );
};

export default FavoriteScreen;
