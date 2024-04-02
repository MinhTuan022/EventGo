import storage from '@react-native-firebase/storage';
import {ArrowLeft, Edit} from 'iconsax-react-native';
import React, {useEffect, useState} from 'react';
import {
  Image,
  Modal,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  View,
} from 'react-native';
import ImageCropPicker from 'react-native-image-crop-picker';
import FontAwesome6Icon from 'react-native-vector-icons/FontAwesome6';
import {
  ButtonComponent,
  InputComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';
import {globalStyles} from '../../styles/globalStyles';
import {appColors} from '../../utils/constants/appColors';
import {fontFamilies} from '../../utils/constants/fontFamilies';
import ChoicePictureModal from '../../components/modals/ChoicePictureModal';
import userAPI from '../../apis/userApi';
import LoadingModal from '../../components/modals/LoadingModal';
import {useNavigation} from '@react-navigation/native';
import {UserModel} from '../../models/UserModel';

const EditProfileScreen = ({route}: any) => {
  const userData: UserModel = route.params;
  console.log(userData);
  const [imageUrl, setImageUrl] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [firstName, setFirstName] = useState(userData.firstname);
  const [lastName, setLastName] = useState(userData.lastname);
  const [about, setAbout] = useState(userData.about);
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();
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

  const updateProfile = async () => {
    setIsLoading(true);
    try {
      const res = await userAPI.HandleUser(
        '/profile',
        {
          userId: userData._id,
          firstName: firstName,
          lastName: lastName,
          about: about,
          photo: imageUrl,
        },
        'put',
      );
      setIsLoading(false);
      navigation.goBack();
      console.log(res);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log(imageUrl);
  }, [imageUrl]);
  return (
    <View
      style={[globalStyles.container, {paddingTop: StatusBar.currentHeight}]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <RowComponent styles={{alignItems: 'center', paddingHorizontal: 16}}>
          <TouchableOpacity onPress={updateProfile}>
            <ArrowLeft size={22} color="black" fontFamily={fontFamilies.bold} />
          </TouchableOpacity>
          <SpaceComponent width={20} />
          <TextComponent
            text="Edit Profile"
            title
            size={20}
            font={fontFamilies.bold}
          />
        </RowComponent>
        <SpaceComponent height={40} />
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <TouchableOpacity
            style={{borderRadius: 100, width: 96, height: 96}}
            onPress={openModal}
            activeOpacity={1}>
            <Image
              source={{
                uri: imageUrl
                  ? imageUrl
                  : userData
                  ? userData.photo
                  : 'https://www.pexels.com/photo/shallow-focus-photography-of-gray-cat-in-box-3389528/',
              }}
              style={{flex: 1, resizeMode: 'cover', borderRadius: 100}}
            />
            <View
              style={{
                width: 30,
                height: 30,
                backgroundColor: appColors.primary,
                position: 'absolute',
                bottom: 0,
                right: 0,
                borderRadius: 12,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Edit size={20} color="white" />
            </View>
          </TouchableOpacity>

          <SpaceComponent height={20} />
          <TextComponent text={String(userData?.name)} title />
        </View>
        <ChoicePictureModal
          modalVisible={modalVisible}
          closeModal={closeModal}
          captureFromCamera={captureFromCamera}
          selectFromLibrary={selectFromLibrary}
        />
        {/* <Modal visible={modalVisible} transparent animationType="slide">
          <TouchableOpacity
            onPress={closeModal}
            activeOpacity={1}
            style={{
              flex: 1,
              backgroundColor: 'rgba(0,0,0,0.2)',
              justifyContent: 'flex-end',
            }}>
            <View
              style={[
                {
                  paddingVertical: 10,
                  // paddingHorizontal:16,
                  backgroundColor: appColors.white,
                  borderTopRightRadius: 12,
                  borderTopLeftRadius: 12,
                },
              ]}>
              <ButtonComponent
                onPress={captureFromCamera}
                text="Capture from Camera"
                type="primary"
                styles={{width: '100%'}}
                iconLeft={
                  <FontAwesome6Icon name="camera" size={20} color="black" />
                }
                textStyle={{
                  fontFamily: fontFamilies.medium,
                  textAlign: 'left',
                }}
                textColor="black"
                color="white"
              />
              <ButtonComponent
                onPress={selectFromLibrary}
                text="Select from Library"
                type="primary"
                styles={{width: '100%'}}
                iconLeft={
                  <FontAwesome6Icon name="image" size={20} color="black" />
                }
                textStyle={{
                  fontFamily: fontFamilies.medium,
                  textAlign: 'left',
                }}
                textColor="black"
                color="white"
              />
              <ButtonComponent
                text="Upload from URL"
                type="primary"
                styles={{width: '100%'}}
                iconLeft={
                  <FontAwesome6Icon name="link" size={20} color="black" />
                }
                textStyle={{
                  fontFamily: fontFamilies.medium,
                  textAlign: 'left',
                }}
                textColor="black"
                color="white"
              />
            </View>
          </TouchableOpacity>
        </Modal> */}
        <SectionComponent>
          <InputComponent
            label='First Name'
            placeHolder="First Name"
            value={firstName}
            onChange={val => setFirstName(val)}
          />
          <InputComponent
            label='First Name'

            placeHolder="Last Name"
            value={lastName}
            onChange={val => setLastName(val)}
          />
          <InputComponent
            label='First Name'

            editable={false}
            placeHolder="Email"
            value={userData.email}
            onChange={() => {}}
          />
          <InputComponent
            label='First Name'

            placeHolder="About me"
            value={about}
            onChange={val => setAbout(val)}
          />
        </SectionComponent>
      </ScrollView>
      <LoadingModal visible={isLoading} />
    </View>
  );
};

export default EditProfileScreen;
