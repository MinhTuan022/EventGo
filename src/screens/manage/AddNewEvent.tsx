import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
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
import Mapbox from '@rnmapbox/maps';
import axios from 'axios';
import Entypo from 'react-native-vector-icons/Entypo';

const AddNewEvent = () => {
  const user = useSelector(authSelector);
  const [currentStep, setCurrentStep] = useState(1);
  const [friends, setFriends] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState('');
  const [coordinates, setCoordinates] = useState<number[]>([
    105.763791, 21.012379,
  ]);
  const [suggest, setSuggest] = useState(true);
  const [press, setPress] = useState(false);
  // const [selectedLocation, setSelectedLocation] = useState(null);
  const navigation = useNavigation();
  const handleMapPress = (event: any) => {
    setPress(true);
    const {geometry} = event;
    setCoordinates(geometry.coordinates);
    // console.log(selectedLocation);
  };
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
    // console.log(coordinates);
    if (press) {
      handleReverse(coordinates);
    }
  }, [user.id, press, coordinates]);
  const getFriend = async (id: any) => {
    try {
      const res = await userAPI.HandleUser(`/friend?userId=${id}`);
      setFriends(res.data);
    } catch (error) {}
  };

  const handleSearch = async (query: any) => {
    try {
      const response = await axios.get(
        `https://api.mapbox.com/search/geocode/v6/forward`,
        {
          params: {
            q: query,
            access_token:
              'pk.eyJ1IjoidHVhbmh5MjAyNCIsImEiOiJjbHR6enJrMnMwNWgyMmttcXV1bmllZWx1In0._QHVjgvwYlqrW5rW2b9JDw',
            language: 'vi',
            proximity: '105.82523983746239, 21.010798918141646',
          },
        },
      );
      // console.log(response)
      setSearchResults(response.data.features);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  const handleReverse = async (coord: number[]) => {
    try {
      const res = await axios.get(
        `https://api.mapbox.com/search/geocode/v6/reverse`,
        {
          params: {
            longitude: coord[0],
            latitude: coord[1],
            access_token:
              'pk.eyJ1IjoidHVhbmh5MjAyNCIsImEiOiJjbHR6enJrMnMwNWgyMmttcXV1bmllZWx1In0._QHVjgvwYlqrW5rW2b9JDw',
          },
        },
      );
      setSelectedPlace(res.data.features[0].properties.full_address);
    } catch (error) {
      console.log(error);
    }
  };
  const handlePlaceSelect = (placeName: any) => {
    setSelectedPlace(placeName);
    setSuggest(false);
    setPress(false);
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
                  ? '2 of 3 Add Location'
                  : 'Add Ticket'
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
            <ChoiceLocation onSelect={() => {}} />
          </SectionComponent>
        </View>
      )}
      {currentStep === 2 && (
        <View style={{backgroundColor: appColors.whiteBg, flex: 1}}>
          <View style={{paddingHorizontal: 20, paddingVertical: 20}}>
            <RowComponent
              styles={{
                borderWidth: 1,
                borderRadius: 100,
                paddingHorizontal: 10,
                borderColor: appColors.gray2,
              }}>
              <TextInput
                value={selectedPlace}
                placeholder="Search Location"
                style={{flex: 1, marginRight: 10}}
                onChangeText={val => {
                  setSelectedPlace(val);
                  handleSearch(val);
                  setSuggest(true);
                }}
              />
              <AntDesign name="search1" size={22} color={appColors.primary} />
            </RowComponent>

            <View style={{width: '100%'}}>
              <View
                style={{
                  position: 'absolute',
                  zIndex: 1,
                  backgroundColor: appColors.white,
                  width: '100%',
                  paddingHorizontal: 10,
                }}>
                {suggest && (
                  <FlatList
                    data={searchResults}
                    renderItem={({item, index}: any) => (
                      <TouchableOpacity
                        onPress={() => {
                          handlePlaceSelect(item.properties.full_address),
                            setCoordinates([
                              item.properties.coordinates.longitude,
                              item.properties.coordinates.latitude,
                            ]);
                        }}
                        style={{paddingVertical: 10}}>
                        <TextComponent
                          text={item.properties.full_address}
                          font={fontFamilies.medium}
                        />
                      </TouchableOpacity>
                    )}
                  />
                )}
              </View>
            </View>
          </View>

          <Mapbox.MapView style={{flex: 1}} onPress={handleMapPress}>
            {/* <Mapbox.Camera followUserLocation minZoomLevel={15} /> */}
            {/* <Mapbox.UserLocation /> */}
            {press ? (
              <Mapbox.PointAnnotation
                children={<Entypo name="location-pin" size={30} color="red" />}
                id="selectedLocation"
                coordinate={coordinates}
              />
            ) : (
              <>
                <Mapbox.MarkerView
                  coordinate={coordinates}
                  children={
                    <Entypo name="location-pin" size={30} color="red" />
                  }
                />
                <Mapbox.Camera
                  centerCoordinate={coordinates}
                  minZoomLevel={15}
                />
              </>
            )}
          </Mapbox.MapView>
        </View>
      )}
      {currentStep === 3 && (
        // <View
        //   style={[
        //     globalStyles.container,
        //     {paddingVertical: 20, paddingHorizontal: 20},
        //   ]}>
        //   {/* <SectionComponent styles={{backgroundColor:"red"}}> */}
        //   <InputComponent
        //     placeHolder="Search Friends"
        //     onChange={() => {}}
        //     value=""
        //     suffix={
        //       <AntDesign name="search1" size={22} color={appColors.primary} />
        //     }
        //     styles={{borderRadius: 100}}
        //   />
        //   <FlatList
        //     data={friends}
        //     renderItem={({item, index}: any) => (
        //       <UserList item={item} invite key={index} />
        //     )}
        //   />
        // </View>
        <View></View>
      )}

      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: 10,
          position: 'absolute',
          bottom: 0,
          width: '100%',
        }}>
        <ButtonComponent
          onPress={handleNext}
          styles={{width: '70%', padding: 12}}
          text={
            currentStep === 1 ? `Next: Add Location` : 'Next: Invite Friend'
          }
          type="primary"
          textStyle={{fontFamily: fontFamilies.medium, fontSize: 16}}
        />
      </View>
    </>
  );
};

const localStyle = StyleSheet.create({
  input: {
    backgroundColor: 'red',
  },
});

export default AddNewEvent;
