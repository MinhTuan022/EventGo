import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {globalStyles} from '../../styles/globalStyles';
import {RowComponent, SectionComponent, TextComponent} from '../../components';
import {SearchNormal} from 'iconsax-react-native';
import {appColors} from '../../utils/constants/appColors';
import {fontFamilies} from '../../utils/constants/fontFamilies';
import TicketComponent from './TicketComponent';
import ticketAPI from '../../apis/ticketApi';
import {useSelector} from 'react-redux';
import {authSelector} from '../../redux/reducers/authReducer';
import {useFocusEffect} from '@react-navigation/native';

const TicketScreen = () => {
  const [selected, setSelected] = useState(0);
  const [ticket, setTicket] = useState([]);
  const user = useSelector(authSelector);
  const data = [
    {name: 'Upcoming', val: 'Paid'},
    {name: 'Completed', val: 'Completed'},
    {name: 'Cancelled', val: 'Cancelled'},
  ];
  const [status, setStatus] = useState('Paid');
  // useEffect(() => {
  //   getTicket();
  // }, []);
  useFocusEffect(
    React.useCallback(() => {
      if (status) {
        getTicket();
      }
    }, [status]),
  );
  const getTicket = async () => {
    try {
      const res = await ticketAPI.HandleTicket(
        `?userId=${user.id}&status=${status}`,
      );
      console.log(`?userId=${user.id}&status=${status}`);
      setTicket(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleSelected = (index: any, val: any) => {
    setSelected(index);
    setStatus(val);
  };
  useEffect(() => {
    console.log(status);
  }, [status]);
  return (
    <View
      style={[globalStyles.container, {paddingTop: StatusBar.currentHeight}]}>
      <SectionComponent>
        <RowComponent styles={{justifyContent: 'space-between'}}>
          <TextComponent text="Tickets" title size={20} />
          <TouchableOpacity>
            <SearchNormal size={20} color="black" />
          </TouchableOpacity>
        </RowComponent>
      </SectionComponent>
      <SectionComponent>
        <RowComponent styles={{justifyContent: 'center'}}>
          {data.map((item: any, index: any) => (
            <TouchableOpacity
              onPress={() => handleSelected(index, item.val)}
              key={index}
              style={[
                localStyle.touchableOpacity,
                selected === index && localStyle.selectedTouchableOpacity,
              ]}>
              <TextComponent
                size={16}
                text={item.name}
                color={selected === index ? appColors.primary : appColors.gray2}
                font={fontFamilies.medium}
              />
            </TouchableOpacity>
          ))}
        </RowComponent>
      </SectionComponent>
      <FlatList
        data={ticket}
        renderItem={({item, index}) => (
          <TicketComponent key={index} item={item} />
        )}></FlatList>
    </View>
  );
};
const localStyle = StyleSheet.create({
  touchableOpacity: {
    flex: 1,
    paddingBottom: 7,
    paddingHorizontal: 10,
    alignItems: 'center',
    borderBottomColor: appColors.gray2,
    borderBottomWidth: 1,
  },
  selectedTouchableOpacity: {
    color: 'blue',
    borderBottomColor: 'blue', // Màu của border khi được chọn
    borderBottomWidth: 2, // Độ dày của border khi được chọn
  },
});
export default TicketScreen;
