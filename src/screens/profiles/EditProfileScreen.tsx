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

const EditProfileScreen = ({route}: any) => {
  const userData = route.params;
  const [imageUrl, setImageUrl] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false); // Trạng thái hiển thị modal

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };
  const selectFromLibrary = async () => {
    try {
      const image = await ImageCropPicker.openPicker({
        width: 300,
        height: 300,
        cropping: true,
      });
      console.log(image.path);
      await uploadImage(image.path);
    } catch (error) {
      console.log(error);
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
  useEffect(() => {
    console.log(imageUrl);
  }, [imageUrl]);
  return (
    <View
      style={[globalStyles.container, {paddingTop: StatusBar.currentHeight}]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <RowComponent styles={{alignItems: 'center', paddingHorizontal: 16}}>
          <TouchableOpacity>
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
                uri: userData
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
        {/* <ChoicePictureModal visible={true}/> */}
        <Modal visible={modalVisible} transparent animationType="slide">
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
        </Modal>
        <SectionComponent>
          <InputComponent placeHolder="Hihi" value="" onChange={() => {}} />
          <InputComponent placeHolder="Hihi" value="" onChange={() => {}} />

          <InputComponent placeHolder="Hihi" value="" onChange={() => {}} />

          <InputComponent placeHolder="Hihi" value="" onChange={() => {}} />
        </SectionComponent>
      </ScrollView>
    </View>
  );
};

export default EditProfileScreen;
