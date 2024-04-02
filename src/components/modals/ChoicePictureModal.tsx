import React from 'react';
import {Modal, TouchableOpacity, View} from 'react-native';
import FontAwesome6Icon from 'react-native-vector-icons/FontAwesome6';
import {ButtonComponent} from '../../components';
import {appColors} from '../../utils/constants/appColors';
import {fontFamilies} from '../../utils/constants/fontFamilies';

interface Props {
  modalVisible: boolean;
  closeModal?: () => void;
  captureFromCamera?: () => void;
  selectFromLibrary?: () => void;
}
const ChoicePictureModal = (props: Props) => {
  const {modalVisible, closeModal, captureFromCamera, selectFromLibrary} =
    props;
  return (
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
            iconLeft={<FontAwesome6Icon name="image" size={20} color="black" />}
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
            iconLeft={<FontAwesome6Icon name="link" size={20} color="black" />}
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
  );
};

export default ChoicePictureModal;
