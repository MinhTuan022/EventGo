import Mapbox from '@rnmapbox/maps';
import { Location } from 'iconsax-react-native';
import React from 'react';
import { StatusBar, View } from 'react-native';
import {
  RowComponent,
  SectionComponent,
  ShapeComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';
import { globalStyles } from '../../styles/globalStyles';
import { appColors } from '../../utils/constants/appColors';

const MapScreen = ({navigation}: any) => {
  const userLocation = [105.76552, 21.0109]; // Giả sử đây là vị trí người dùng
  const radius = 500;

  return (
    <View style={[globalStyles.container, {}]}>
      <StatusBar barStyle={'dark-content'} />
      <Mapbox.MapView style={{flex: 1}} logoEnabled={false}>
        <Mapbox.Camera
          zoomLevel={15}
          followUserLocation
          animationMode="flyTo"
          minZoomLevel={10}
        />
        <Mapbox.UserLocation visible={true} />
        <Mapbox.MarkerView coordinate={[105.7655, 21.0109]}>
          <View
            style={{
              backgroundColor: appColors.purple2,
              padding: 5,
              borderRadius: 5,
            }}>
            {/* <TextComponent text="hihih" /> */}
          </View>
        </Mapbox.MarkerView>
      </Mapbox.MapView>
      <View
        style={{
          position: 'absolute',
          width: '100%',
          marginTop: Number(StatusBar.currentHeight) + 20,
        }}>
        <SectionComponent
          styles={{
            borderRadius: 30,
            marginHorizontal: 20,
            backgroundColor: 'white',
          }}>
          <RowComponent styles={{}}>
            <View style={{flex: 1}}>
              <TextComponent text="Location" />
            </View>
            <SpaceComponent width={20} />
            <ShapeComponent radius={12} size={50} color={appColors.purple2}>
              <Location size={25} color="black" />
            </ShapeComponent>
          </RowComponent>
        </SectionComponent>
        {/* <SectionComponent>
          <CategoriesList />
        </SectionComponent> */}
      </View>
    </View>
  );
};

export default MapScreen;
