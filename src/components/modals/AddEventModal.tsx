import {View, Text, Modal} from 'react-native';
import React from 'react';
import { ButtonComponent } from '..';

interface Props {
  visible?: boolean;
  onClose?: () => void;
}

const AddEventModal = (props: Props) => {
  const {visible, onClose} = props;

  return (
    <Modal style={{ backgroundColor:'red'}} animationType="slide" visible={false} transparent>
      <View>
        <ButtonComponent text='Close' onPress={onClose} />
      </View>
    </Modal>
  );
};

export default AddEventModal;
