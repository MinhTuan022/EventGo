import {Notification, SearchNormal, Sort} from 'iconsax-react-native';
import React, {useState} from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  View,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useDispatch} from 'react-redux';
import {
  ButtonComponent,
  EventItem,
  RowComponent,
  ShapeComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';
import CategoriesList from '../../components/CategoriesList';
import {appColors} from '../../constants/appColors';
import {fontFamilies} from '../../constants/fontFamilies';
import {removeAuth} from '../../redux/reducers/authReducer';
import {globalStyles} from '../../styles/globalStyles';

const HomeScreen = ({navigation}: any) => {
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();
  return (
    <View style={[globalStyles.container, {backgroundColor: appColors.white2}]}>
      <StatusBar barStyle={'light-content'} />

      {/* HeaderComponent */}
      <View
        style={{
          backgroundColor: appColors.purple,
          height: '23%',
          borderBottomLeftRadius: 40,
          borderBottomRightRadius: 40,
          paddingTop: StatusBar.currentHeight,
          //  paddingHorizontal: 20,
        }}>
        <View style={{paddingHorizontal: 20, flex: 1}}>
          <RowComponent>
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <AntDesign name="menuunfold" size={25} color={appColors.white} />
            </TouchableOpacity>
            <View style={{flex: 1, alignItems: 'center'}}>
              <RowComponent>
                <TextComponent
                  text="Current Location"
                  color={appColors.gray2}
                />
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
          <TouchableOpacity onPress={() => navigation.navigate('SearchScreen')}>
            <RowComponent styles={{marginTop: '4%'}}>
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
                onPress={() => {}}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: appColors.gray3,
                  borderRadius: 100,
                  paddingHorizontal: 12,
                  paddingVertical: 8,
                }}>
                <ShapeComponent
                  styles={{width: 22, height: 22}}
                  color="#A29EF0">
                  <Sort size={17} color={appColors.primary} />
                </ShapeComponent>
                <SpaceComponent width={5} />
                <TextComponent text="Filters" color="white" />
              </TouchableOpacity>
            </RowComponent>
          </TouchableOpacity>
        </View>

        <CategoriesList />
      </View>

      {/* Body */}
      <ScrollView
        style={{flex: 1, marginTop: 40}}
        showsVerticalScrollIndicator={false}>
        <RowComponent
          styles={{
            // marginTop: 40,
            justifyContent: 'space-between',
            paddingHorizontal: 16,
          }}>
          <TextComponent text="Upcomming Events" title />
          <TextComponent text="See All" />
        </RowComponent>
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal
          data={Array.from({length: 5})}
          renderItem={({item, index}) => (
            <EventItem key={index} item={item} type="cardhome" />
          )}
        />
        <View style={{paddingHorizontal: 16, paddingVertical: 20}}>
          <View
            style={{
              paddingHorizontal: 16,
              backgroundColor: '#D3FBFD',
              borderRadius: 12,
            }}>
            <TextComponent text="Invite your friends" />
            <TextComponent text="Invite your friends" />
            <ButtonComponent text="Invite" type="primary" color="#00F8FF" />
          </View>
        </View>

        <RowComponent
          styles={{
            // marginTop: 40,
            justifyContent: 'space-between',
            paddingHorizontal: 16,
          }}>
          <TextComponent text="NearBy" title />
          <TextComponent text="See All" />
        </RowComponent>
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal
          data={Array.from({length: 5})}
          renderItem={({item, index}) => (
            <EventItem key={index} item={item} type="cardhome" />
          )}
        />
      </ScrollView>
    </View>
  );
};
export default HomeScreen;
