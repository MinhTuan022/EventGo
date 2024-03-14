import {View, Text, StatusBar} from 'react-native';
import React from 'react';
import {globalStyles} from '../../styles/globalStyles';
import {
  InputComponent,
  RowComponent,
  SectionComponent,
  ShapeComponent,
  SpaceComponent,
} from '../../components';
import {ArrowCircleLeft, Location} from 'iconsax-react-native';
import {appColors} from '../../utils/constants/appColors';
import CategoriesList from '../../components/CategoriesList';
import MapView from 'react-native-maps';

const MapScreen = ({navigation}: any) => {
  return (
    <View
      style={[globalStyles.container, {paddingTop: StatusBar.currentHeight}]}>
      <SectionComponent styles={{}}>
        <RowComponent styles={{}}>
          <View style={{flex: 1}}>
            <InputComponent
              styles={{marginBottom: 0}}
              placeHolder="Find for food or resturent ..."
              onChange={() => {}}
              value=""
              affix={<ArrowCircleLeft onPress={() => navigation.goBack()} size={20} color="black" />}
            />
          </View>
          <SpaceComponent width={20} />
          <ShapeComponent radius={12} size={60} color={appColors.gray2}>
            <Location size={25} color="black" />
          </ShapeComponent>
        </RowComponent>
      </SectionComponent>
      <SectionComponent>
        <CategoriesList />
      </SectionComponent>
      {/* <MapView
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}></MapView> */}
    </View>
  );
};

export default MapScreen;
