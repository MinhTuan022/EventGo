import {View, Text, Modal} from 'react-native';
import React, { useState } from 'react';
import {ButtonComponent, TextComponent} from '..';
import {fontFamilies} from '../../utils/constants/fontFamilies';
import {appColors} from '../../utils/constants/appColors';
import Mapbox from '@rnmapbox/maps';
import { Location } from 'iconsax-react-native';
import Entypo from 'react-native-vector-icons/Entypo';
interface Props {
  visible?: boolean;
  onClose: () => void;
}
const LocationModal = (props: Props) => {
  const {visible, onClose} = props;
  const handleClose = () => {
    onClose();
  };

  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleMapPress = (event:any) => {
    const { geometry } = event;
    setSelectedLocation(geometry.coordinates);
    console.log(selectedLocation)
  };
  return (
    <Modal visible={visible} animationType="slide">
      <View style={{flex:1}}>
        <ButtonComponent
          text="Cancel"
          textStyle={{fontFamily: fontFamilies.medium, color: appColors.gray2}}
          onPress={handleClose}
        />

        <Mapbox.MapView style={{flex: 1}} scaleBarEnabled={false} onPress={handleMapPress}>
          <Mapbox.Camera zoomLevel={16} followUserLocation minZoomLevel={10}/>
          <Mapbox.UserLocation visible={true}/>
          {selectedLocation && (
          <Mapbox.PointAnnotation
            children={<Entypo name='location-pin' size={30} color="red"  />}
            id="selectedLocation"
            coordinate={selectedLocation}
          />
        )}
        </Mapbox.MapView>
      </View>
    </Modal>
  );
};

export default LocationModal;
