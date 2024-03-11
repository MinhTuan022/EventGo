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
  CardComponent,
  InputComponent,
  RowComponent,
  ShapeComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';
import {ArrowLeft, ArrowLeft2, SearchNormal, Sort} from 'iconsax-react-native';
import {appColors} from '../../constants/appColors';
import { fontFamilies } from '../../constants/fontFamilies';

const SearchScreen = ({navigation}: any) => {
  const inputRef = useRef<any>();
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  return (
    <View
      style={[
        globalStyles.container,
        {paddingTop: StatusBar.currentHeight, paddingHorizontal: 16},
      ]}>
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
          onPress={() => {}}
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
