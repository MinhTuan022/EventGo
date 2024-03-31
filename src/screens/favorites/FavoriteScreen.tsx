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

const FavoriteScreen = () => {
  const user = useSelector(authSelector);
  const [eventFavorites, setEventFavorites] = useState([]);

  useEffect(() => {
    if (user) {
      handleFavorites();
    }
  }, [user]);
  const handleFavorites = async () => {
    try {
      const res = await userAPI.HandleUser(`/favorites?userId=${user.id}`);
      setEventFavorites(res.data);
      // console.log(res)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View
      style={[globalStyles.container, {paddingTop: StatusBar.currentHeight}]}>
      <SectionComponent>
        <RowComponent styles={{justifyContent: 'space-between'}}>
          <TextComponent text="Favorites" title size={22} />
          <RowComponent>
            <SearchFavorite size={22} color="black" />
            <SpaceComponent width={10} />
            <FilterSearch size={22} color="black" />
          </RowComponent>
        </RowComponent>
      </SectionComponent>
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
