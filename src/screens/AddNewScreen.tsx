import {View, Text, StatusBar} from 'react-native';
import React from 'react';
import {globalStyles} from '../styles/globalStyles';
import {
  ContainerComponent,
  InputComponent,
  SectionComponent,
  TextComponent,
} from '../components';

const AddNewScreen = () => {
  return (
    <ContainerComponent isScroll>
      <SectionComponent>
        <TextComponent text="hihih" />
      </SectionComponent>
    </ContainerComponent>
  );
};

export default AddNewScreen;
