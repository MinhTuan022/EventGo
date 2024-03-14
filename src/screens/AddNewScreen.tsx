import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  ProgressBarAndroidBase,
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
import {ArrowLeft, Status} from 'iconsax-react-native';
import DatePicker from 'react-native-date-picker';
import {fontFamilies} from '../utils/constants/fontFamilies';
import {appColors} from '../utils/constants/appColors';

const AddNewScreen = ({navigation}: any) => {
  return (
    <>
      <View
        style={{
          //   height: '10%',
          paddingTop: StatusBar.currentHeight,
          backgroundColor: 'white',
          paddingHorizontal: 16,
          paddingVertical: 20,
        }}>
        <RowComponent styles={{alignItems: 'center', justifyContent: 'center'}}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ArrowLeft size={24} color="black" />
          </TouchableOpacity>

          <View style={{flex: 1, alignItems: 'center'}}>
            <TextComponent
              text="1 of 4 Event Details"
              title
              size={22}
              font={fontFamilies.bold}
              styles={{flex: 1}}
            />
          </View>
        </RowComponent>
      </View>
      <View
        style={{
          height: 1,
          backgroundColor: appColors.purple,
          width: '25%',
        }}></View>
      <View style={[{flex: 1}]}>
        <StatusBar barStyle={'dark-content'}></StatusBar>

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
            <DateTimePicker label="Start at: " mode="time" />
            <SpaceComponent width={16} />
            <DateTimePicker label="End at: " />
          </RowComponent>
          <InputComponent onChange={() => {}} value="" label="Date" />
          <InputComponent onChange={() => {}} value="" label="Invited users" />

          <InputComponent onChange={() => {}} value="" label="Location" />
          <SectionComponent styles={{alignItems: 'center'}}>
            <ButtonComponent text="Submit" type="primary" />
          </SectionComponent>
        </SectionComponent>
      </View>
    </>
  );
};

const localStyle = StyleSheet.create({
  input: {
    backgroundColor: 'red',
  },
});

export default AddNewScreen;
