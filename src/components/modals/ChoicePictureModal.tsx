import {View, Text, Modal} from 'react-native';
import React, {useEffect, useState} from 'react';
import {appColors} from '../../utils/constants/appColors';
import {ButtonComponent, TextComponent} from '..';
import {globalStyles} from '../../styles/globalStyles';
import {Camera, DocumentUpload, Image} from 'iconsax-react-native';
import {fontFamilies} from '../../utils/constants/fontFamilies';
import ImageCropPicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';

interface Props {
  visible: boolean;
}
const ChoicePictureModal = (props: Props) => {
  const {visible} = props;
  const [avatar, setAvatar] = useState<any>(null);

  const selectFromLibrary = async () => {
    try {
      const image = await ImageCropPicker.openPicker({
        width: 300,
        height: 300,
        cropping: true,
      });
      console.log(image.path)
      await uploadImage(image.path)
    } catch (error) {
      console.log(error)
    }
  };

  const captureFromCamera = async () => {
    try {
      const image = await ImageCropPicker.openCamera({
        width: 300,
        height: 300,
        cropping: true,
      });
      console.log(image.path)
    } catch (error) {
      console.log(error)
    }
  };

  const uploadImage = async (imagePath: any) => {
      try {
        const reference = storage().ref(`avatars-${Date.now()}.jpg`)
        await reference.putFile(imagePath)
        const imageUrl = await reference.getDownloadURL();
        setAvatar(imageUrl)
      } catch (error) {
        console.log(error)
      }
  }
  useEffect(() => {
    console.log(avatar)

  }, [avatar])
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View
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
          <ButtonComponent onPress={captureFromCamera}
            text="Capture from Camera"
            type="primary"
            styles={{width: '100%'}}
            iconLeft={<Camera size={20} color="black" />}
            textStyle={{
              fontFamily: fontFamilies.medium,
              textAlign: 'left',
            }}
            textColor="black"
            color="white"
          />
          <ButtonComponent onPress={selectFromLibrary}
            text="Select from Library"
            type="primary"
            styles={{width: '100%'}}
            iconLeft={<Image size={20} color="black" />}
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
            iconLeft={<DocumentUpload size={20} color="black" />}
            textStyle={{
              fontFamily: fontFamilies.medium,
              textAlign: 'left',
            }}
            textColor="black"
            color="white"
          />
        </View>
      </View>
    </Modal>
  );
};

export default ChoicePictureModal;
