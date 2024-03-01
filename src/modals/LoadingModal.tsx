import {View, Text, Modal, ActivityIndicator} from 'react-native';
import React from 'react';
import {globalStyles} from '../styles/globalStyles';
interface Props {
  visible: boolean;
  mess?: string;
}
const LodingModal = (props: Props) => {
  const {visible, mess} = props;
  return (
    <Modal
      visible={visible}
      style={[globalStyles.container]}
      transparent
      statusBarTranslucent>
      <View
        style={{
         flex:1,
          backgroundColor: 'rgba(0,0,0,0.3)',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <ActivityIndicator size={24}/>
      </View>
    </Modal>
  );
};

export default LodingModal;
