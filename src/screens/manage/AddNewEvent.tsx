import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  ScrollView,
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
import {ArrowLeft, DollarCircle, DollarSquare} from 'iconsax-react-native';
import userAPI from '../../apis/userApi';
import {useSelector} from 'react-redux';
import {authSelector} from '../../redux/reducers/authReducer';
import Mapbox from '@rnmapbox/maps';
import axios from 'axios';
import Entypo from 'react-native-vector-icons/Entypo';
import ImageCropPicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import ChoicePictureModal from '../../components/modals/ChoicePictureModal';

const AddNewEvent = () => {
  const user = useSelector(authSelector);
  const [currentStep, setCurrentStep] = useState(1);
  const [friends, setFriends] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [fullAddress, setFullAddress] = useState('');
  const [address, setAddress] = useState('');
  const [coordinates, setCoordinates] = useState<number[]>([
    105.763791, 21.012379,
  ]);
  const [suggest, setSuggest] = useState(true);
  const [press, setPress] = useState(false);
  const [quantity, setQuantity] = useState('');
  const [nameTicket, setNameTicket] = useState('');
  const [priceTicket, setPriceTicket] = useState('');
  const [selectedType, setselectedType] = useState('');
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [imageUrl, setImageUrl] = useState<any>(null);
  const [timeDate, setTimeDate] = useState(new Date());

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };
  const selectFromLibrary = async () => {
    try {
      // closeModal();
      const image = await ImageCropPicker.openPicker({
        width: 300,
        height: 300,
        cropping: true,
      });
      console.log(image.path);

      await uploadImage(image.path);
    } catch (error) {
      console.log(error);
      closeModal();
    }
  };

  const captureFromCamera = async () => {
    try {
      const image = await ImageCropPicker.openCamera({
        width: 300,
        height: 300,
        cropping: true,
      });
      console.log(image.path);
    } catch (error) {
      console.log(error);
      closeModal();
    }
  };

  const uploadImage = async (imagePath: any) => {
    try {
      const reference = storage().ref(`avatars-${Date.now()}.jpg`);
      await reference.putFile(imagePath);
      const imageUrl = await reference.getDownloadURL();
      setImageUrl(imageUrl);
      closeModal();
    } catch (error) {
      console.log(error);
    }
  };
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
      setFullAddress(res.data.features[0].properties.full_address);
      setAddress(res.data.features[0].properties.name);
    } catch (error) {
      console.log(error);
    }
  };
  const handlePlaceSelect = (properties: any) => {
    setFullAddress(properties.full_address);
    setAddress(properties.name);
    setSuggest(false);
    setPress(false);
  };

  return (
    <>
      <ChoicePictureModal
        modalVisible={modalVisible}
        closeModal={closeModal}
        captureFromCamera={captureFromCamera}
        selectFromLibrary={selectFromLibrary}
      />
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
        <ScrollView style={[globalStyles.container]}>
          <SectionComponent styles={{}}>
            <TouchableOpacity onPress={openModal}>
              <Image
                source={{
                  uri: imageUrl
                    ? imageUrl
                    : 'https://th.bing.com/th/id/R.3663a6a0645024b783dfaba0e16eca2f?rik=RmACL83QdOI4tw&riu=http%3a%2f%2fwww.thedalejrfoundation.org%2fwidgets%2fstatic%2fimages%2fdefaultimage.png&ehk=%2fCMinQQyGjCzek1QICfIMogrKSbDKrXuYS5P5agBNFQ%3d&risl=&pid=ImgRaw&r=0',
                }}
                style={{height: 250, borderRadius: 12}}
                resizeMode="cover"
              />
            </TouchableOpacity>
            <SpaceComponent height={15} />
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
              <DateTimePicker label="Start Date: " mode="date" onSelect={val =>setTimeDate(val)} selected={timeDate}/>
              <SpaceComponent width={16} />
              <DateTimePicker label="Start at: " mode="time" onSelect={val => setTimeDate(val)} selected={timeDate}/>
            </RowComponent>
            <RowComponent styles={{justifyContent: 'space-between'}}>
              <DateTimePicker label="End date: " mode="date" onSelect={val => setTimeDate(val)} selected={timeDate}/>
              <SpaceComponent width={16} />
              <DateTimePicker label="End at: " mode="time" onSelect={val => setTimeDate(val)} selected={timeDate}/>
            </RowComponent>
          </SectionComponent>
        </ScrollView>
      )}
      {currentStep === 2 && (
        <View style={globalStyles.container}>
          <View style={{paddingHorizontal: 20, paddingVertical: 20}}>
            <RowComponent
              styles={{
                borderWidth: 1,
                borderRadius: 100,
                paddingHorizontal: 10,
                borderColor: appColors.gray2,
              }}>
              <TextInput
                value={fullAddress}
                placeholder="Search Location"
                style={{flex: 1, marginRight: 10}}
                onChangeText={val => {
                  setFullAddress(val);
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
                          handlePlaceSelect(item.properties),
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
        <View style={globalStyles.container}>
          <SectionComponent>
            <RowComponent>
              <TouchableOpacity
                style={
                  selectedType === 'Paid'
                    ? localStyle.buttonSelected
                    : localStyle.button
                }
                onPress={() => {
                  setselectedType('Paid');
                }}>
                <TextComponent text="Paid" size={18} />
              </TouchableOpacity>
              <SpaceComponent width={20} />
              <TouchableOpacity
                style={
                  selectedType === 'Free'
                    ? localStyle.buttonSelected
                    : localStyle.button
                }
                onPress={() => {
                  setselectedType('Free');
                  setPriceTicket('0');
                }}>
                <TextComponent text="Free" size={18} />
              </TouchableOpacity>
            </RowComponent>
          </SectionComponent>
          <SectionComponent>
            <InputComponent
              value={nameTicket}
              onChange={val => setNameTicket(val)}
              label="Name"
            />
            <InputComponent
              value={quantity}
              onChange={val => setQuantity(val)}
              label="Available quantity"
            />
            <InputComponent
              affix={<DollarSquare size={20} color="black" />}
              value={selectedType === 'Free' ? 'Free' : priceTicket}
              onChange={val => {
                setPriceTicket(val);
              }}
              label="Price"
              editable={selectedType === 'Free' ? false : true}
            />
          </SectionComponent>
        </View>
      )}
      {currentStep === 1 && (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 10,
            // position: 'absolute',
            // bottom: 0,
            width: '100%',
          }}>
          <ButtonComponent
            onPress={handleNext}
            styles={{width: '70%', padding: 12}}
            text={`Next: Add Location`}
            type="primary"
            textStyle={{fontFamily: fontFamilies.medium, fontSize: 16}}
          />
        </View>
      )}
      {currentStep === 2 && (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 10,
            // position: 'absolute',
            // bottom: 0,
            width: '100%',
          }}>
          <ButtonComponent
            disable={fullAddress && address && coordinates ? false : true}
            onPress={handleNext}
            styles={{width: '70%', padding: 12}}
            text={`Next: Add Ticket`}
            type="primary"
            textStyle={{fontFamily: fontFamilies.medium, fontSize: 16}}
          />
        </View>
      )}
      {currentStep === 3 && (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 10,
            // position: 'absolute',
            // bottom: 0,
            width: '100%',
          }}>
          <ButtonComponent
            disable={
              quantity && nameTicket && selectedType && priceTicket
                ? false
                : true
            }
            onPress={handleNext}
            styles={{width: '70%', padding: 12}}
            text={`Save`}
            type="primary"
            textStyle={{fontFamily: fontFamilies.medium, fontSize: 16}}
          />
        </View>
      )}
    </>
  );
};

const localStyle = StyleSheet.create({
  input: {
    backgroundColor: 'red',
  },
  button: {
    borderRadius: 5,
    justifyContent: 'center',
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: appColors.gray2,
    flex: 1,
    alignItems: 'center',
  },
  buttonSelected: {
    borderRadius: 5,
    justifyContent: 'center',
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: appColors.primary,
    flex: 1,
    alignItems: 'center',
  },
});

export default AddNewEvent;
