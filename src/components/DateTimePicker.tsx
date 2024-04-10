import {Calendar, Clock} from 'iconsax-react-native';
import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {RowComponent, TextComponent} from '.';
import {globalStyles} from '../styles/globalStyles';
import DatePicker from 'react-native-date-picker';
import { DateTime } from '../utils/convertDateTime';
import { fontFamilies } from '../utils/constants/fontFamilies';
import { appColors } from '../utils/constants/appColors';

interface Props {
  selected?: Date;
  mode?: 'time' | 'date';
  label?: string;
  onSelect: (val: Date) => void;
}

const DateTimePicker = (props: Props) => {
  const [date, setDate] = useState(new Date());
  const [isShowModal, setIsShowModal] = useState(false);
  const {label, mode, onSelect, selected} = props;
  return (
    <View style={globalStyles.container}>
      {label && <TextComponent text={label} styles={{paddingBottom: 7}} />}
      <RowComponent
        styles={[globalStyles.inputContainer]}
        onPress={() => setIsShowModal(true)}>
        <TextComponent
          text={` ${
            selected
              ? mode === 'time'
                ? DateTime.GetTime(selected)
                : DateTime.GetDate(selected)
              : 'Choice'
          }`}
          flex={1}
          font={fontFamilies.medium}
          styles={{textAlign: 'center'}}
        />
        {mode === 'time' ? (
          <Clock size={22} color={appColors.gray} />
        ) : (
          <Calendar size={22} color={appColors.gray} />
        )}
      </RowComponent>
      <DatePicker
        modal
        onCancel={() => setIsShowModal(false)}
        open={isShowModal}
        mode={mode}
        date={date}
        
        onConfirm={val => {
          setIsShowModal(false);
          onSelect(val)
          // console.log(date)
        }}
      />
    </View>
  );
};

export default DateTimePicker;
