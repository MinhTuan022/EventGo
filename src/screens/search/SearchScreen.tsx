import {
  ArrowCircleRight,
  ArrowLeft,
  FilterSearch,
  Location,
  SearchNormal,
} from 'iconsax-react-native';
import React, {useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  FlatList,
  StatusBar,
  StyleSheet,
  Switch,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import eventAPI from '../../apis/eventApi';
import {
  ButtonComponent,
  EventItem,
  RowComponent,
  SectionComponent,
  ShapeComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';
import CategoriesList from '../../components/CategoriesList';
import {globalStyles} from '../../styles/globalStyles';
import {appColors} from '../../utils/constants/appColors';
import {fontFamilies} from '../../utils/constants/fontFamilies';

const SearchScreen = ({navigation}: any) => {
  const inputRef = useRef<any>();
  const refRBSheet = useRef<any>();
  const [isFocused, setIsFocused] = useState(false);
  const [textSearch, setTextSearch] = useState('');
  // const [title, setTitle] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  // const [address, setAddress] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [events, setEvents] = useState([]);
  useEffect(() => {
    inputRef.current.focus();
    handleSearch();
  }, [textSearch]);

  const handleSearch = async () => {
    try {
      const res = await eventAPI.HandleEvent(`/search?title=${textSearch}`);
      console.log(res);
      setEvents(res.data);
    } catch (error) {
      console.log(error);
    }
  };
useEffect(() => {
console.log(selectedCategories)
},[selectedCategories])
  const handleFocus = () => {
    setIsFocused(true);
  };
  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleTimeOption = (option: string) => {
    let selectedDate = new Date();
    switch (option) {
      case 'today':
        setSelectedTime(selectedDate.toISOString());
        break;
      case 'tomorrow':
        selectedDate.setDate(selectedDate.getDate() + 1);
        setSelectedTime(selectedDate.toISOString());
        break;
      case 'nextWeek':
        selectedDate.setDate(selectedDate.getDate() + 7);
        setSelectedTime(selectedDate.toISOString());
        break;
      default:
        setSelectedTime('');
        break;
    }
  };
  const handleCategorySelection = (categories: string[]) => {
    setSelectedCategories(categories);
  };
  return (
    <View
      style={[
        globalStyles.container,
        {paddingTop: StatusBar.currentHeight, paddingHorizontal: 16},
      ]}>
      <StatusBar barStyle={'dark-content'}></StatusBar>
      <RowComponent styles={{marginVertical: 20}}>
        <RowComponent>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ArrowLeft size={24} color="black" variant="Linear" />
          </TouchableOpacity>
          <RowComponent
            styles={{
              backgroundColor: !isFocused
                ? appColors.whiteBg
                : appColors.purple2,
              marginHorizontal: 10,
              flex: 1,
              borderRadius: 12,
              paddingHorizontal: 15,
              borderColor: isFocused ? appColors.primary : appColors.whiteBg,
              borderWidth: 1,
            }}>
            <SearchNormal
              size={22}
              color={!isFocused ? appColors.gray : appColors.primary}
            />
            <SpaceComponent width={10} />
            <TextInput
              ref={inputRef}
              onChangeText={val => setTextSearch(val)}
              placeholder="Search..."
              placeholderTextColor={appColors.gray2}
              focusable
              style={{fontSize: 20, flex: 1}}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            <TouchableOpacity onPress={() => refRBSheet.current.open()}>
              <FilterSearch size={22} color={appColors.primary} />
            </TouchableOpacity>
          </RowComponent>
        </RowComponent>
        <RBSheet
          animationType="slide"
          openDuration={2000}
          ref={refRBSheet}
          closeOnDragDown={true}
          closeOnPressMask={true}
          customStyles={{
            container: {
              backgroundColor: 'white',
              height: 'auto',
              borderTopEndRadius: 38,
              borderTopStartRadius: 38,
            },
            wrapper: {
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            },
            draggableIcon: {
              backgroundColor: appColors.gray2,
            },
          }}>
          <View style={{alignItems: 'center'}}>
            <TextComponent text="Bộ lọc" title />
            <View
              style={{
                height: 1,
                backgroundColor: appColors.gray2,
                width: '90%',
                marginVertical: 20,
              }}
            />
            <SectionComponent styles={{width: '100%', paddingVertical: 0}}>
              <TextComponent
                text="Danh mục"
                font={fontFamilies.medium}
                size={16}
              />
              <SpaceComponent height={15} />
              <CategoriesList grid onSelectCategory={handleCategorySelection} allowMultiple />
            </SectionComponent>
            <SectionComponent styles={{width: '100%'}}>
              <TextComponent
                text="Thời gian"
                font={fontFamilies.medium}
                size={16}
              />
              <SpaceComponent height={15} />
              <RowComponent>
                <ButtonComponent onPress={() => handleTimeOption('today')}
                  text="Hôm nay"
                  type="primary"
                  color="white"
                  textColor={appColors.primary}
                  styles={[localStyle.time]}
                />
                <ButtonComponent onPress={() => handleTimeOption('tomorrow')}
                  text="Ngày mai"
                  type="primary"
                  color="white"
                  textColor={appColors.primary}
                  styles={[localStyle.time]}
                />
                <ButtonComponent onPress={() => handleTimeOption('nextWeek')}
                  text="Tuần tới"
                  type="primary"
                  color="white"
                  textColor={appColors.primary}
                  styles={[localStyle.time]}
                />
              </RowComponent>
            </SectionComponent>
            <SectionComponent styles={{width: '100%'}}>
              <RowComponent styles={{justifyContent: 'space-between'}}>
                <TextComponent
                  size={18}
                  text="Chỉ sự kiện miễn phí"
                  font={fontFamilies.medium}
                />

                <Switch
                  thumbColor={appColors.white}
                  trackColor={{true: appColors.primary}}
                  // value={isRemember}
                  onChange={() => {}}
                />
              </RowComponent>
            </SectionComponent>
          </View>
          <RowComponent styles={{paddingHorizontal: 16, marginVertical: 20}}>
            <ButtonComponent
              styles={{flex: 1, borderRadius: 28}}
              text="RESET"
              type="primary"
              color={appColors.purple2}
              textColor="black"
              textStyle={{fontFamily: fontFamilies.medium}}
            />
            <SpaceComponent width={10} />
            <ButtonComponent
              styles={{flex: 1, borderRadius: 28}}
              text="APPLY"
              type="primary"
              textStyle={{fontFamily: fontFamilies.medium}}
            />
          </RowComponent>
        </RBSheet>
      </RowComponent>
      <CategoriesList onSelectCategory={ handleCategorySelection} allowMultiple />
      <TextComponent
        text={`${events.length} Found`}
        title
        size={18}
        styles={{paddingVertical: 10}}
      />
      <FlatList
        data={events}
        renderItem={({item, index}) => (
          <EventItem
            item={item}
            type="list"
            styles={{width: Dimensions.get('window').width * 0.86}}
            key={index}
          />
        )}
      />
    </View>
  );
};

const localStyle = StyleSheet.create({
  time: {
    flex: 1,
    paddingHorizontal: 18,
    paddingVertical: 7,
    backgroundColor: appColors.white,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: appColors.primary,
    marginRight: 12,
    marginBottom: 5,
  },
});
export default SearchScreen;
