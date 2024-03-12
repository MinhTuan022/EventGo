import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {globalStyles} from '../../styles/globalStyles';
import {
  ButtonComponent,
  CardComponent,
  InputComponent,
  RowComponent,
  SectionComponent,
  ShapeComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';
import {
  ArrowCircleRight,
  ArrowLeft,
  ArrowLeft2,
  Calendar,
  Location,
  Music,
  SearchNormal,
  Sort,
} from 'iconsax-react-native';
import {appColors} from '../../constants/appColors';
import {fontFamilies} from '../../constants/fontFamilies';
import RBSheet from 'react-native-raw-bottom-sheet';
import CategoriesFilter from './components/CategoriesFilter';

const SearchScreen = ({navigation}: any) => {
  const inputRef = useRef<any>();
  const refRBSheet = useRef<any>();
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  return (
    <View
      style={[
        globalStyles.container,
        {paddingTop: StatusBar.currentHeight, paddingHorizontal: 16},
      ]}>
      <StatusBar barStyle={'dark-content'}></StatusBar>
      <RowComponent>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft size={24} color="black" variant="Linear" />
        </TouchableOpacity>

        <TextComponent text="Search" title styles={{paddingLeft: 10}} />
      </RowComponent>
      <RowComponent styles={{marginTop: '4%'}}>
        <RowComponent styles={{flex: 1}}>
          <SearchNormal size={22} color={appColors.primary} variant="TwoTone" />
          <View
            style={{
              width: 2,
              height: 24,
              marginHorizontal: 12,
              backgroundColor: appColors.primary,
            }}
          />
          <TextInput
            ref={inputRef}
            placeholder="Search..."
            placeholderTextColor={appColors.gray2}
            focusable
            style={{fontSize: 20, flex: 1}}></TextInput>
        </RowComponent>
        <TouchableOpacity
          onPress={() => refRBSheet.current.open()}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: appColors.gray3,
            borderRadius: 100,
            paddingHorizontal: 12,
            paddingVertical: 8,
          }}>
          <ShapeComponent styles={{width: 22, height: 22}} color="white">
            <Sort size={17} color={appColors.primary} />
          </ShapeComponent>
          <SpaceComponent width={5} />
          <TextComponent text="Filters" color="white" />
        </TouchableOpacity>
        <RBSheet
          animationType="slide"
          openDuration={2000}
          ref={refRBSheet}
          closeOnDragDown={true}
          closeOnPressMask={true}
          customStyles={{
            container: {
              backgroundColor: 'white',
              height: '90%',
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
          <View style={{flex: 1}}>
            <TextComponent text="Filter" title />
            <SectionComponent>
              <CategoriesFilter />
            </SectionComponent>
            <SectionComponent>
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
                <Calendar size={24} color={appColors.primary} variant="Bold" />
                <TextComponent
                  text="Choose from calender"
                  styles={{paddingHorizontal: 10}}
                  color={appColors.gray2}
                />
                <ArrowCircleRight size={24} color={appColors.primary} />
              </RowComponent>
            </SectionComponent>
            <SectionComponent>
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
            <SectionComponent>
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
          <RowComponent styles={{paddingHorizontal: 16}}>
            <ButtonComponent
              styles={{flex: 1, borderWidth: 1, borderColor: appColors.primary}}
              text="RESET"
              type="primary"
              color="white"
              textColor="black"
            />
            <SpaceComponent width={10} />
            <ButtonComponent styles={{flex: 1}} text="APPLY" type="primary" />
          </RowComponent>
        </RBSheet>
      </RowComponent>
      <ScrollView>
        <CardComponent styles={{}}>
          <RowComponent>
            <Image
              source={require('../../assets/images/luffi.jpg')}
              style={{width: 60, height: 80, borderRadius: 12}}
            />
            <View style={{flex: 1, marginLeft: 20}}>
              <TextComponent
                text="1ST MAY-SAT -2:00 PM"
                color={appColors.primary}
                size={12}
                font={fontFamilies.medium}
              />
              <TextComponent
                text="A virtual evening of smooth jazz"
                title
                size={19}
              />
            </View>
          </RowComponent>
        </CardComponent>
        <CardComponent styles={{}}>
          <RowComponent>
            <Image
              source={require('../../assets/images/luffi.jpg')}
              style={{width: 60, height: 80, borderRadius: 12}}
            />
            <View style={{flex: 1, marginLeft: 20}}>
              <TextComponent
                text="1ST MAY-SAT -2:00 PM"
                color={appColors.primary}
                size={12}
                font={fontFamilies.medium}
              />
              <TextComponent
                text="A virtual evening of smooth jazz"
                title
                size={19}
              />
            </View>
          </RowComponent>
        </CardComponent>
        <CardComponent styles={{}}>
          <RowComponent>
            <Image
              source={require('../../assets/images/luffi.jpg')}
              style={{width: 60, height: 80, borderRadius: 12}}
            />
            <View style={{flex: 1, marginLeft: 20}}>
              <TextComponent
                text="1ST MAY-SAT -2:00 PM"
                color={appColors.primary}
                size={12}
                font={fontFamilies.medium}
              />
              <TextComponent
                text="A virtual evening of smooth jazz"
                title
                size={19}
              />
            </View>
          </RowComponent>
        </CardComponent>
      </ScrollView>
    </View>
  );
};

export default SearchScreen;
