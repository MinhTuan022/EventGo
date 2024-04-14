import {View, Text, Modal} from 'react-native';
import React from 'react';
import {appColors} from '../../utils/constants/appColors';
import TextComponent from '../TextComponent';
import ButtonComponent from '../ButtonComponent';

const ModalBottom = () => {
  return (
    <Modal transparent>
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          alignItems: 'flex-end',
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
        }}>
        <View
          style={{
            backgroundColor: appColors.white,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 20,
            borderTopRightRadius: 30,
            borderTopLeftRadius: 30,
          }}>
          <TextComponent text="Cancel Booking" title/>
          <ButtonComponent text="No" />
          <ButtonComponent text="No" />
        </View>
      </View>
    </Modal>
  );
};

export default ModalBottom;
