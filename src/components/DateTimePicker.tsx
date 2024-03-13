import {Clock} from 'iconsax-react-native';
import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {RowComponent, TextComponent} from '.';
import {globalStyles} from '../styles/globalStyles';
import DatePicker from 'react-native-date-picker';

interface Props {
  mode?: 'time' | 'date';
  label?: string;
}

const DateTimePicker = (props: Props) => {
  const [date, setDate] = useState(new Date());
  const [isShowModal, setIsShowModal] = useState(false);
  const {label, mode} = props;
  return (
    <View style={globalStyles.container}>
      {label && <TextComponent text={label} styles={{paddingBottom: 7}} />}
      <RowComponent
        styles={globalStyles.inputContainer}
        onPress={() => setIsShowModal(true)}>
        <TextComponent text={`9:00`} flex={1} styles={{textAlign: 'center'}} />
        <Clock size={18} color="black" />
      </RowComponent>
      <DatePicker
        modal
        onCancel={() => setIsShowModal(false)}
        open={isShowModal}
        mode={mode}
        date={date}
        
        onConfirm={val => {
          setIsShowModal(false);
          console.log(date)
        }}
      />
    </View>
  );
};

export default DateTimePicker;
