import React, { useState } from 'react';
import {
  Image,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  DateTimePicker,
  InputComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent
} from '../components';
import ChoiceLocation from '../components/ChoiceLocation';
import { globalStyles } from '../styles/globalStyles';
import { appColors } from '../utils/constants/appColors';
import { fontFamilies } from '../utils/constants/fontFamilies';

const AddNewScreen = ({navigation}: any) => {
  const [showModal, setShowModal] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };
  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
  };
  console.log(currentStep);
  // useEffect(() => {
  //   const unsubscribe = navigation.addListener('Add', (e:any) => {
  //     // Kiểm tra tab đang được kích hoạt là tab này
  //     if (navigation.isFocused()) {
  //       setShowModal(true); // Hiển thị modal
  //       e.preventDefault(); // Ngăn chặn chuyển tab mặc định
  //     }
  //   });

  //   return unsubscribe;
  // }, [navigation]);
  const handleClose = () => {
    setShowModal(false);
  };
  return (
    <>
      <View
        style={{
          //   height: '10%',
          paddingTop: Number(StatusBar.currentHeight) +10,
          backgroundColor: 'white',
          paddingHorizontal: 16,
          paddingVertical: 20,
        }}>
        <StatusBar barStyle={'dark-content'}></StatusBar>
        <RowComponent styles={{alignItems: 'center', justifyContent: 'center'}}>
          <TouchableOpacity
            onPress={handlePrevious}
            style={{
              backgroundColor: appColors.gray2,
              paddingHorizontal: 15,
              paddingVertical: 6,
              borderRadius: 12,
            }}>
            <TextComponent text="Prev" font={fontFamilies.bold} />
          </TouchableOpacity>

          <View style={{flex: 1, alignItems: 'center'}}>
            <TextComponent
              text={
                currentStep === 1
                  ? '1 of 3 Event Details'
                  : currentStep === 2
                  ? '2 of 3 Invite Friends'
                  : 'Preview'
              }
              title
              size={18}
              font={fontFamilies.bold}
              styles={{flex: 1}}
            />
          </View>

          <TouchableOpacity
            onPress={handleNext}
            style={{
              backgroundColor: appColors.gray2,
              paddingHorizontal: 15,
              paddingVertical: 6,
              borderRadius: 12,
            }}>
            <TextComponent text="Next" font={fontFamilies.bold} />
          </TouchableOpacity>
        </RowComponent>
      </View>
      <View
        style={{
          height: 2,
          backgroundColor: appColors.purple,
          width: currentStep === 1 ? '33%' : currentStep === 2 ? '66%' : '100%',
        }}
      />
      {currentStep === 1 && (
        <View style={[{flex: 1, backgroundColor: 'white'}]}>
          <SectionComponent styles={{}}>
            <TextComponent
              text="Title"
              title
              size={16}
              styles={{paddingBottom: 7}}
            />
            <InputComponent
              onChange={() => {}}
              value=""
              placeHolder="Title"></InputComponent>
            <TextComponent
              text="Event Type"
              title
              size={16}
              styles={{paddingBottom: 7}}
            />
            <InputComponent
              onChange={() => {}}
              value=""
              placeHolder="Title"></InputComponent>
            <TextComponent
              text="Event Description"
              title
              size={16}
              styles={{paddingBottom: 7}}
            />
            <InputComponent
              onChange={() => {}}
              value=""
              placeHolder="Write your event description"></InputComponent>
            <TextComponent
              text="Event Timing"
              title
              size={16}
              styles={{paddingBottom: 7}}
            />
            <RowComponent styles={{justifyContent: 'space-between'}}>
              <DateTimePicker label="Start at: " mode="time" />
              <SpaceComponent width={16} />
              <DateTimePicker label="End at: " />
            </RowComponent>
            <RowComponent styles={{justifyContent: 'space-between'}}>
              <DateTimePicker label="Start at: " mode="time" />
              <SpaceComponent width={16} />
              <DateTimePicker label="End at: " />
            </RowComponent>
            {/* <InputComponent onChange={() => {}} value="" label="Date" />
          <InputComponent onChange={() => {}} value="" label="Invited users" /> */}

            <ChoiceLocation onSelect={() => {}} />
            {/* <SectionComponent styles={{alignItems: 'center'}}>
            <ButtonComponent text="Submit" type="primary" />
          </SectionComponent> */}
          </SectionComponent>
        </View>
      )}
      {currentStep === 2 && (
        <View
          style={[
            globalStyles.container,
            {paddingVertical: 20, paddingHorizontal: 20},
          ]}>
          {/* <SectionComponent styles={{backgroundColor:"red"}}> */}
            <InputComponent
              placeHolder="Search Friends"
              onChange={() => {}}
              value=""
              suffix={
                <AntDesign name="search1" size={22} color={appColors.primary} />
              }
              styles={{borderRadius: 100}}
            />
          {/* </SectionComponent> */}
          <SectionComponent>
            <RowComponent>
              <Image source={require('../assets/images/cat.jpg')} style={{width:50, height:50, borderRadius:100}}/>
              <View style={{paddingLeft:10}}>
                <TextComponent text='Minh Tuấn' font={fontFamilies.medium}/>
                <TextComponent text='2,5k Followers' size={13}/>
              </View>
            </RowComponent>
          </SectionComponent>
        </View>
      )}
      {currentStep === 3 && (
        <View>
          <TextComponent text="Preview" />
        </View>
      )}
    </>
    // <View style={{flex:1}}>
    //   <AddEventModal visible={showModal} onClose={handleClose}/>
    // </View>
  );
};

const localStyle = StyleSheet.create({
  input: {
    backgroundColor: 'red',
  },
});

export default AddNewScreen;
