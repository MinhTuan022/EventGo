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
import {
  HeaderComponent,
  RowComponent,
  SectionComponent,
  TextComponent,
} from '../../components';
import {SearchNormal} from 'iconsax-react-native';
import {appColors} from '../../utils/constants/appColors';
import {fontFamilies} from '../../utils/constants/fontFamilies';
import TicketComponent from './TicketComponent';
import ticketAPI from '../../apis/ticketApi';
import {useSelector} from 'react-redux';
import {authSelector} from '../../redux/reducers/authReducer';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import orderAPI from '../../apis/orderApi';

const TicketScreen = ({navigation}: any) => {
  // const navigation = useNavigation();
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
      const res = await orderAPI.HandleOrder(
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
  const handleCancelled = async (timeEvent: any) => {
    console.log(timeEvent);
    const currentTime = new Date();
    const targetTime = new Date(timeEvent);

    if (currentTime == targetTime) {
      console.log('Thời gian hiện tại bằng thời gian mục tiêu.');
    }
  };
  const handleReview = async () => {
    console.log('first');
  };
  const handleView = () => {
    // navigation.navigate("Screen")
  };
  return (
    <View
      style={[globalStyles.container, {paddingTop: StatusBar.currentHeight}]}>
      {/* <SectionComponent>
        <RowComponent styles={{justifyContent: 'space-between'}}>
          <TextComponent text="Tickets" title size={20} />
          <TouchableOpacity>
            <SearchNormal size={20} color="black" />
          </TouchableOpacity>
        </RowComponent>
      </SectionComponent> */}
      <HeaderComponent styles={{justifyContent: 'space-between'}}
        title="Tickets"
        children={
          <TouchableOpacity>
            <SearchNormal size={20} color="black" />
          </TouchableOpacity>
        }
      />
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
        renderItem={({item, index}: any) => (
          <TicketComponent
            key={index}
            item={item}
            onPressCancelled={() => handleCancelled(item.eventId.startTime)}
            onPressReview={handleReview}
            onPressView={() => {
              navigation.navigate('TicketDetail', item);
            }}
          />
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
