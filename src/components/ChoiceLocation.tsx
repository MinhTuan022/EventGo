import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { RowComponent, SpaceComponent, TextComponent } from '.';
import { ArrowRight2, Location } from 'iconsax-react-native';
import { globalStyles } from '../styles/globalStyles';
import { appColors } from '../utils/constants/appColors';
import LocationModal from './modals/LocationModal';

interface Props {
  onSelect: (val: any) => void;
}

const ChoiceLocation = (props: Props) => {
  const {onSelect} = props;
  const [isVibleModalLocation, setIsVibleModalLocation] = useState(false);
  const [addressSelected, setAddressSelected] = useState<{
    address: string;
    position?: {
      lat: number;
      long: number;
    };
  }>();

  return (
    <>
      <RowComponent
        onPress={() => setIsVibleModalLocation(!isVibleModalLocation)}
        styles={[globalStyles.inputContainer]}>
        <Location variant="Bold" size={22} color={`${appColors.primary}80`} />

        <SpaceComponent width={12} />

        <TextComponent
          // numOfLine={1}
          text={addressSelected ? addressSelected.address : 'Choice'}
          flex={1}
        />
        <ArrowRight2 color={appColors.primary} size={22} />
      </RowComponent>

      <LocationModal
        visible={isVibleModalLocation}
        onClose={() => setIsVibleModalLocation(false)}
        // onSelect={val => {
        //   setAddressSelected(val);
        //   onSelect(val);
        // }}
      />
    </>
  );
};

export default ChoiceLocation