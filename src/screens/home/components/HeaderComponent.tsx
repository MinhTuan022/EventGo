import {View, Text, StatusBar, TouchableOpacity} from 'react-native';
import React from 'react';
import {appColors} from '../../../utils/constants/appColors';
import {
  RowComponent,
  ShapeComponent,
  SpaceComponent,
  TextComponent,
} from '../../../components';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {fontFamilies} from '../../../utils/constants/fontFamilies';
import {Notification, SearchNormal, Sort} from 'iconsax-react-native';
import CategoriesList from '../../../components/CategoriesList';
import {useDispatch} from 'react-redux';
import { removeAuth } from '../../../redux/reducers/authReducer';

const HeaderComponent = ({navigation}: any) => {
  const dispatch = useDispatch();
  return (
    <View
      style={{
        backgroundColor: appColors.purple,
        height: 179,
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
        paddingTop: StatusBar.currentHeight,
        //  paddingHorizontal: 20,
      }}>
      <View style={{paddingHorizontal: 20}}>
        <RowComponent>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <AntDesign name="menuunfold" size={25} color={appColors.white} />
          </TouchableOpacity>
          <View style={{flex: 1, alignItems: 'center'}}>
            <RowComponent>
              <TextComponent text="Current Location" color={appColors.gray2} />
              <MaterialIcons
                name="arrow-drop-down"
                size={17}
                color={appColors.white}
              />
            </RowComponent>
            <TextComponent
              text="New York, USA"
              color="white"
              font={fontFamilies.medium}
            />
          </View>

          <ShapeComponent
            onPress={() => navigation.navigate('NotificationScreen')}>
            <View>
              <Notification size={18} color="white" />
              <View
                style={{
                  backgroundColor: '#02E9FE',
                  width: 6,
                  height: 6,
                  borderRadius: 100,
                  position: 'absolute',
                  top: 1,
                  right: 1,
                }}></View>
            </View>
          </ShapeComponent>
        </RowComponent>
        <SpaceComponent height={20} />
        <RowComponent>
          <RowComponent styles={{flex: 1}}>
            <SearchNormal size={22} color="white" variant="TwoTone" />
            <View
              style={{
                width: 1,
                height: 18,
                marginHorizontal: 12,
                backgroundColor: '#A29EF0',
              }}
            />
            <TextComponent
              flex={1}
              text="Search..."
              color={appColors.gray2}
              size={20}
            />
          </RowComponent>
          <TouchableOpacity
            onPress={() => dispatch(removeAuth())}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: appColors.gray3,
              borderRadius: 100,
              paddingHorizontal: 12,
              paddingVertical: 8,
            }}>
            <ShapeComponent styles={{width: 22, height: 22}} color="#A29EF0">
              <Sort size={17} color={appColors.primary} />
            </ShapeComponent>
            <SpaceComponent width={5} />
            <TextComponent text="Filters" color="white" />
          </TouchableOpacity>
        </RowComponent>
        <SpaceComponent height={35} />
      </View>
      <CategoriesList />
    </View>
  );
};

export default HeaderComponent;
