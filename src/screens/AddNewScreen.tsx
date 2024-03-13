import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {globalStyles} from '../styles/globalStyles';
import {
  ButtonComponent,
  ContainerComponent,
  DateTimePicker,
  InputComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../components';
import {Status} from 'iconsax-react-native';
import DatePicker from 'react-native-date-picker';

const AddNewScreen = () => {
  

  return (
    <View
      style={[globalStyles.container, {paddingTop: StatusBar.currentHeight}]}>
      <StatusBar barStyle={'dark-content'}></StatusBar>
      <TextComponent
        text="Add new event"
        title
        size={20}
        styles={{paddingHorizontal: 16}}
      />
      <SectionComponent styles={{}}>
        <InputComponent
          onChange={() => {}}
          value=""
          placeHolder="Title"></InputComponent>
        <InputComponent
          onChange={() => {}}
          value=""
          placeHolder="Description"></InputComponent>

        <RowComponent styles={{justifyContent: 'space-between'}}>
          <DateTimePicker label='Start at: ' mode='time'/>
          <SpaceComponent width={16} />
          <DateTimePicker label='End at: '/>
        </RowComponent>
        <InputComponent onChange={() => {}} value="" label="Date" />
        <InputComponent onChange={() => {}} value="" label="Invited users" />

        <InputComponent onChange={() => {}} value="" label="Location" />
        <SectionComponent styles={{alignItems: 'center'}}>
          <ButtonComponent text="Submit" type="primary" />
        </SectionComponent>
      </SectionComponent>
    </View>
  );
};

const localStyle = StyleSheet.create({
  input: {
    backgroundColor: 'red',
  },
});

export default AddNewScreen;
