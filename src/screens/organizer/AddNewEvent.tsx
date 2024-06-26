import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  Modal,
  SafeAreaView,
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
import {
  AddCircle,
  ArrowLeft,
  BagCross,
  DollarCircle,
  DollarSquare,
  Trash,
} from 'iconsax-react-native';
import userAPI from '../../apis/userApi';
import {useSelector} from 'react-redux';
import {authSelector} from '../../redux/reducers/authReducer';
import Mapbox from '@rnmapbox/maps';
import axios from 'axios';
import Entypo from 'react-native-vector-icons/Entypo';
import ImageCropPicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import ChoicePictureModal from '../../components/modals/ChoicePictureModal';
import {DateTime} from '../../utils/convertDateTime';
import categoryAPI from '../../apis/categoryApi';
import {Dropdown} from 'react-native-element-dropdown';
import eventAPI from '../../apis/eventApi';
interface Ticket {
  ticketType: string;
  price: string;
  quantity: string;
}
const AddNewEvent = ({navigation}: any) => {
  const user = useSelector(authSelector);
  const [currentStep, setCurrentStep] = useState(1);
  const [searchResults, setSearchResults] = useState([]);
  const [suggest, setSuggest] = useState(true);
  const [press, setPress] = useState(false);
  const [selectedType, setselectedType] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const [categories, setCategories] = useState([]);
  const [showUrl, setShowUrl] = useState(false);

  const [imageUrl, setImageUrl] = useState<any>(null);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<any>();
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [fullAddress, setFullAddress] = useState('');
  const [address, setAddress] = useState('');
  const [coordinates, setCoordinates] = useState<number[]>([
    105.763791, 21.012379,
  ]);

  const [showModal, setShowModal] = useState(false);
  const [tickets, setTickets] = useState([
    {ticketType: '', price: '0', quantity: ''},
  ]);

  const [eventId, setEventId] = useState('');
  const handleAddTicket = () => {
    setTickets([...tickets, {ticketType: '', price: '', quantity: ''}]);
  };

  const handleRemoveTicket = (index: number) => {
    const updatedTickets = [...tickets];
    updatedTickets.splice(index, 1); // Xóa vé tại chỉ mục đã cho
    setTickets(updatedTickets);
  };

  const handleTicketChange = (
    index: number,
    field: keyof Ticket,
    value: string,
  ) => {
    const updatedTickets = [...tickets];
    updatedTickets[index][field] = value;
    setTickets(updatedTickets);
  };
  const getCategories = async () => {
    try {
      const res = await categoryAPI.HandleCategory('/list');
      setCategories(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleCreateEvent = async () => {
    try {
      const data = {
        category,
        title,
        description,
        address,
        fullAddress,
        geometry: {
          coordinates,
          type: 'Point',
        },
        startTime: DateTime.MergeDate(startDate, startTime),
        endTime: DateTime.MergeDate(endDate, endTime),
        organizer: user.id,
        photoEvent: imageUrl,
        tickets,
      };
      const res = await eventAPI.HandleEvent('/add', data, 'post');
      setEventId(res.data);
      setShowModal(true)
      setCurrentStep(1);
      // navigation.navigate('ManageEventScreen');
    } catch (error) {
      console.log(error);
    }
  };

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
      // console.log(image.path);

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
      // console.log(image.path);
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
  const uploadUrl = () => {
    closeModal();
    setShowUrl(true);
  };
  useEffect(() => {
    if (press) {
      handleReverse(coordinates);
    }
    getCategories();
  }, [user.id, press, coordinates]);
  // const getFriend = async (id: any) => {
  //   try {
  //     const res = await userAPI.HandleUser(`/friend?userId=${id}`);
  //     setFriends(res.data);
  //   } catch (error) {}
  // };

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
    <SafeAreaView style={{flex: 1}}>
      {showModal && (
        <Modal transparent={true}>
          <StatusBar backgroundColor="rgba(0, 0, 0, 0.5)" translucent={true} />
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            }}>
            <View
              style={{
                backgroundColor: appColors.white,
                width: '80%',
                height: '60%',
                borderRadius: 50,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Image
                source={require('../../assets/images/success.png')}
                resizeMode="cover"
                style={{width:200, height:200}}
              />
              <TextComponent
                text="Chúc mừng"
                color={appColors.primary}
                title
                size={20}
              />
              <View
                style={{
                  paddingHorizontal: 30,
                  paddingVertical: 20,
                  alignItems: 'center',
                }}>
                <TextComponent
                  text="Bạn đã tạo sự kiện mới thành công. "
                  size={16}
                />
              </View>
              <ButtonComponent
                text="Trang Chủ"
                type="primary"
                onPress={() => {setShowModal(false),navigation.navigate('HomeOgz')}}
                color={appColors.purple2}
                textColor={appColors.primary}
              />
            </View>
          </View>
        </Modal>
      )}
      <ChoicePictureModal
        modalVisible={modalVisible}
        closeModal={closeModal}
        captureFromCamera={captureFromCamera}
        selectFromLibrary={selectFromLibrary}
        uploadUrl={uploadUrl}
      />
      {showUrl && (
        <Modal transparent>
          <View
            style={{
              backgroundColor: 'rgba(0,0,0,0.2)',
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <SectionComponent
              styles={{
                backgroundColor: appColors.white,
                width: '90%',
                borderRadius: 12,
              }}>
              <InputComponent
                onChange={val => {
                  setImageUrl(val);
                }}
                value={imageUrl}
                label="URL"
              />
              <View style={{}}>
                <ButtonComponent
                  onPress={() => setShowUrl(false)}
                  text="Save"
                  type="link"
                  textStyle={{fontFamily: fontFamilies.medium}}
                  styles={{alignItems: 'flex-end', justifyContent: 'flex-end'}}
                />
              </View>
            </SectionComponent>
          </View>
        </Modal>
      )}
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
                  ? '1 of 3 Chi tiết sự kiện'
                  : currentStep === 2
                  ? '2 of 3 Địa điểm sự kiện'
                  : 'Vé sự kiện'
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
              text="Tiêu đề sự kiện"
              title
              size={16}
              styles={{paddingBottom: 7}}
            />
            <InputComponent
              onChange={val => {
                setTitle(val);
              }}
              value={title}
              placeHolder="Tiêu đề"></InputComponent>
            <TextComponent
              text="Danh mục"
              title
              size={16}
              styles={{paddingBottom: 7}}
            />
            <Dropdown
              style={[
                localStyle.dropdown,
                isFocus && {borderColor: appColors.primary},
              ]}
              data={categories}
              labelField={'categoryName'}
              valueField={'_id'}
              onChange={(item: any) => {
                setCategory(item._id);
              }}
              // value={category?.categoryName}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
            />
            <TextComponent
              text="Mô tả sự kiện"
              title
              size={16}
              styles={{paddingBottom: 7}}
            />
            <InputComponent
              onChange={val => {
                setDescription(val);
              }}
              value={description}
              placeHolder="Nhập mô tả về sự kiện"></InputComponent>
            <TextComponent
              text="Thời gian diễn ra sự kiện"
              title
              size={16}
              styles={{paddingBottom: 7}}
            />
            <RowComponent styles={{justifyContent: 'space-between'}}>
              <DateTimePicker
                label="Ngày bắt đầu: "
                mode="date"
                onSelect={val => {
                  setStartDate(val);
                }}
                selected={startDate}
              />
              <SpaceComponent width={16} />
              <DateTimePicker
                label="Thời gian bắt đầu: "
                mode="time"
                onSelect={val => {
                  setStartTime(val);
                }}
                selected={startTime}
              />
            </RowComponent>
            <RowComponent styles={{justifyContent: 'space-between'}}>
              <DateTimePicker
                label="Ngày kết thúc: "
                mode="date"
                onSelect={val => setEndDate(val)}
                selected={endDate}
              />
              <SpaceComponent width={16} />
              <DateTimePicker
                label="Thời gian kết thúc: "
                mode="time"
                onSelect={val => setEndTime(val)}
                selected={endTime}
              />
            </RowComponent>
          </SectionComponent>
          <SpaceComponent height={80} />
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
                placeholder="Tìm địa điểm"
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
        <ScrollView style={[globalStyles.container, {paddingHorizontal: 16}]}>
          <RowComponent styles={{paddingVertical: 20}}>
            <TouchableOpacity
              style={
                selectedType === 'Paid'
                  ? localStyle.buttonSelected
                  : localStyle.button
              }
              onPress={() => {
                setselectedType('Paid');
              }}>
              <TextComponent text="Trả Phí" size={18} />
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
              }}>
              <TextComponent text="Miễn Phí" size={18} />
            </TouchableOpacity>
          </RowComponent>
          {tickets.map((ticket, index) => (
            <SectionComponent
              key={index}
              styles={{
                borderRadius: 12,
                borderColor: appColors.primary,
                borderWidth: 1,
                marginBottom: 20,
              }}>
              {tickets.length > 1 && index !== 0 && (
                <TouchableOpacity
                  onPress={() => handleRemoveTicket(index)}
                  style={{justifyContent: 'flex-end', flexDirection: 'row'}}>
                  <Trash size={22} color={'red'} />
                </TouchableOpacity>
              )}
              <InputComponent
                value={ticket.ticketType}
                onChange={val => handleTicketChange(index, 'ticketType', val)}
                label="Loại vé"
              />
              <RowComponent>
                <InputComponent
                  flex
                  value={ticket.quantity}
                  onChange={val => handleTicketChange(index, 'quantity', val)}
                  label="Số lượng vé"
                />
                <SpaceComponent width={10} />
                <InputComponent
                  flex
                  affix={<DollarSquare size={20} color="black" />}
                  value={selectedType === 'Free' ? 'Free' : ticket.price}
                  onChange={val => {
                    handleTicketChange(index, 'price', val);
                  }}
                  label="Giá"
                  editable={selectedType === 'Free' ? false : true}
                />
              </RowComponent>
            </SectionComponent>
          ))}
          {selectedType === 'Paid' && (
            <ButtonComponent
              type="link"
              text="Thêm loại vé"
              onPress={handleAddTicket}
              iconLeft={<AddCircle size={22} color={appColors.primary} />}
            />
          )}
          <SpaceComponent height={20} />
        </ScrollView>
      )}
      {currentStep === 1 && (
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
            disable={
              imageUrl &&
              title &&
              category &&
              startTime &&
              endTime &&
              startDate &&
              endDate &&
              description
                ? false
                : true
            }
            onPress={handleNext}
            styles={{width: '70%', padding: 12}}
            text={`Tiếp: Thêm địa điểm`}
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
            position: 'absolute',
            bottom: 0,
            width: '100%',
          }}>
          <ButtonComponent
            disable={fullAddress && address && coordinates ? false : true}
            onPress={handleNext}
            styles={{width: '70%', padding: 12}}
            text={`Tiếp: Thêm vé`}
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
            position: 'absolute',
            bottom: 0,

            width: '100%',
          }}>
          <ButtonComponent
            disable={tickets ? false : true}
            onPress={handleCreateEvent}
            styles={{width: '70%', padding: 12}}
            text={`Tạo sự kiện`}
            type="primary"
            textStyle={{fontFamily: fontFamilies.medium, fontSize: 16}}
          />
        </View>
      )}
    </SafeAreaView>
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
  dropdown: {
    height: 50,
    borderColor: appColors.gray2,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 15,
    // paddingVertical: 12,
    minHeight: 56,
    marginBottom: 19,
  },
});

export default AddNewEvent;
