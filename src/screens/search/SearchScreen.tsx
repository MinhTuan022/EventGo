import {
  ArrowCircleRight,
  ArrowLeft,
  FilterSearch,
  Location,
  SearchNormal
} from 'iconsax-react-native';
import React, { useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  StatusBar,
  TextInput,
  TouchableOpacity,
  View
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
  TextComponent
} from '../../components';
import CategoriesList from '../../components/CategoriesList';
import { globalStyles } from '../../styles/globalStyles';
import { appColors } from '../../utils/constants/appColors';
import { fontFamilies } from '../../utils/constants/fontFamilies';

const SearchScreen = ({navigation}: any) => {
  const inputRef = useRef<any>();
  const refRBSheet = useRef<any>();
  const [isFocused, setIsFocused] = useState(false);
  const [textSearch, setTextSearch] = useState('');
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

  const handleFocus = () => {
    setIsFocused(true);
  };
  const handleBlur = () => {
    setIsFocused(false);
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
            <TextComponent text="Filter" title />
            <View
              style={{
                height: 1,
                backgroundColor: appColors.gray2,
                width: '90%',
                marginVertical: 20,
              }}
            />
            <SectionComponent styles={{width:"100%"}}>
              <TextComponent
                text="Time & Date"
                font={fontFamilies.medium}
                size={16}
              />
              <RowComponent>
                <ButtonComponent
                  text="Today"
                  type="primary"
                  color="white"
                  textColor={appColors.gray2}
                  styles={{
                    borderColor: appColors.gray2,
                    borderWidth: 1,
                    flex: 1,
                    marginRight: 10,
                    paddingVertical: 12,
                    paddingHorizontal: 5,
                  }}
                />
                <ButtonComponent
                  text="Tomorrow"
                  type="primary"
                  color="white"
                  textColor={appColors.gray2}
                  styles={{
                    borderColor: appColors.gray2,
                    borderWidth: 1,
                    flex: 1,
                    marginRight: 10,
                    paddingVertical: 12,
                    paddingHorizontal: 5,
                  }}
                />
                <ButtonComponent
                  text="This week"
                  type="primary"
                  color="white"
                  textColor={appColors.gray2}
                  styles={{
                    borderColor: appColors.gray2,
                    borderWidth: 1,
                    flex: 1,
                    marginRight: 10,
                    paddingVertical: 12,
                    paddingHorizontal: 5,
                  }}
                />
              </RowComponent>
            </SectionComponent>
            <SectionComponent styles={{width:"100%"}}>
              <TextComponent
                text="Location"
                font={fontFamilies.medium}
                size={18}
              />
              <RowComponent
                onPress={() => {}}
                styles={{
                  borderRadius: 12,
                  //   justifyContent: 'flex-start',
                  borderColor: appColors.gray2,
                  borderWidth: 1,
                  marginTop: 10,
                  paddingVertical: 12,
                  paddingHorizontal: 5,
                  //   width:'60%',
                  //   flex:1
                }}>
                <ShapeComponent size={40} color={appColors.purple2} radius={12}>
                  <Location size={18} color={appColors.primary} />
                </ShapeComponent>
                <TextComponent
                  size={18}
                  text="New York, USA"
                  styles={{paddingHorizontal: 10}}
                />
                <ArrowCircleRight size={24} color={appColors.primary} />
              </RowComponent>
            </SectionComponent>
            <SectionComponent styles={{width:"100%"}}>
              <RowComponent styles={{justifyContent: 'space-between'}}>
                <TextComponent
                  size={18}
                  text="Select price range"
                  font={fontFamilies.medium}
                />
                <TextComponent text="$20-$120" color={appColors.primary} />
              </RowComponent>
              <TextComponent text="HAHAHAHAHAHA" />
            </SectionComponent>
          </View>
          <RowComponent styles={{paddingHorizontal: 16, marginVertical:20}}>
            <ButtonComponent
              styles={{flex: 1, borderRadius: 28}}
              text="RESET"
              type="primary"
              color={appColors.purple2}
              textColor="black"
            />
            <SpaceComponent width={10} />
            <ButtonComponent
              styles={{flex: 1, borderRadius: 28}}
              text="APPLY"
              type="primary"
            />
          </RowComponent>
        </RBSheet>
      </RowComponent>
      <CategoriesList onSelectCategory={() => {}} />
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

export default SearchScreen;
