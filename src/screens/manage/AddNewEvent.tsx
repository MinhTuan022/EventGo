import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  ButtonComponent,
  DateTimePicker,
  InputComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
  UserList,
} from '../../components';
import ChoiceLocation from '../../components/ChoiceLocation';
import {globalStyles} from '../../styles/globalStyles';
import {appColors} from '../../utils/constants/appColors';
import {fontFamilies} from '../../utils/constants/fontFamilies';
import {useNavigation} from '@react-navigation/native';
import {ArrowLeft} from 'iconsax-react-native';
import userAPI from '../../apis/userApi';
import {useSelector} from 'react-redux';
import {authSelector} from '../../redux/reducers/authReducer';

const AddNewEvent = () => {
  const user = useSelector(authSelector);
  const [showModal, setShowModal] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [friends, setFriends] = useState([]);
  const navigation = useNavigation();
  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };
  const handlePrevious = () => {
    if (currentStep === 1) {
      navigation.goBack();
    } else {
      setCurrentStep(currentStep - 1);
    }
  };
  useEffect(() => {
    getFriend(user.id);
  }, [user.id]);
  const getFriend = async (id: any) => {
    try {
      const res = await userAPI.HandleUser(`/friend?userId=${id}`);
      setFriends(res.data);
    } catch (error) {}
  };
  return (
    <>
      <View
        style={{
          paddingTop: Number(StatusBar.currentHeight) + 10,
          backgroundColor: 'white',
          paddingHorizontal: 16,
          paddingVertical: 20,
        }}>
        <StatusBar barStyle={'dark-content'}></StatusBar>
        <RowComponent styles={{alignItems: 'center', justifyContent: 'center'}}>
          <TouchableOpacity onPress={handlePrevious}>
            <ArrowLeft size={22} color="black" />
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
          {/* <View/> */}
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

          {/* <SectionComponent> */}
          {/* <RowComponent>
              <Image
                source={require('../../assets/images/cat.jpg')}
                style={{width: 50, height: 50, borderRadius: 100}}
              />
              <View style={{paddingLeft: 10}}>
                <TextComponent text="Minh Tuấn" font={fontFamilies.medium} />
                <TextComponent text="2,5k Followers" size={13} />
              </View>
            </RowComponent> */}
          <FlatList
            data={friends}
            renderItem={({item, index}: any) => (
              <UserList item={item} invite key={index}/>
            )}
          />

          {/* </SectionComponent> */}
        </View>
      )}
      {currentStep === 3 && (
        <View>
          <TextComponent text="Preview" />
        </View>
      )}
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: 10,
        }}>
        <ButtonComponent
          onPress={handleNext}
          styles={{width: '70%', padding: 12}}
          text={currentStep === 1 ? `Next: Invite Friend` : 'Preview'}
          type="primary"
          textStyle={{fontFamily: fontFamilies.medium, fontSize: 16}}
        />
      </View>
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

export default AddNewEvent;
