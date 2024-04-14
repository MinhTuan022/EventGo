import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {globalStyles} from '../../styles/globalStyles';
import {
  ButtonComponent,
  HeaderComponent,
  ModalBottom,
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
import RBSheet from 'react-native-raw-bottom-sheet';

const TicketScreen = ({navigation}: any) => {
  // const navigation = useNavigation();
  const refRBSheet = useRef<any>();
  const [selected, setSelected] = useState(0);
  const [ticket, setTicket] = useState([]);
  const user = useSelector(authSelector);
  const data = [
    {name: 'Sắp diễn ra', val: 'Paid'},
    {name: 'Hoàn Thành', val: 'Completed'},
    {name: 'Đã Hủy', val: 'Cancelled'},
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
      // console.log(res.data);
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
  const handleCancelled = async (id: any) => {
    refRBSheet.current.open();
    console.log(id);
  };
  const handleReview = async () => {
    console.log('first');
  };

  return (
    <View
      style={[
        globalStyles.container,
        {
          paddingTop: StatusBar.currentHeight,
          backgroundColor: appColors.whiteBg,
        },
      ]}>
      {/* <ModalBottom/> */}
      <RBSheet
        animationType="slide"
        // openDuration={2000}
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        customStyles={{
          container: {
            backgroundColor: 'white',
            // height: '90%',
            borderTopEndRadius: 38,
            borderTopStartRadius: 38,
            // paddingVertical:20,
            flex: 1,
          },
          wrapper: {
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
          },
          draggableIcon: {
            backgroundColor: appColors.gray2,
          },
        }}>
        <View style={{flex: 1, alignItems: 'center'}}>
          <TextComponent text="Hủy Vé" title />
          <View
            style={{
              height: 1,
              backgroundColor: appColors.gray2,
              width: '90%',
              marginVertical: 20,
            }}></View>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal: 20,
              paddingVertical: 20,
            }}>
            <TextComponent
              text="Bạn có chắc chắn muốn hủy vé sự kiện này?"
              font={fontFamilies.medium}
              size={18}
            />
            <TextComponent
              text="Số tiền bạn đã thanh toán sẽ được hoàn lại trong thời gian sớm nhất"
              size={18}
            />
          </View>
          <RowComponent>
            <ButtonComponent
              text="Không, Không Hủy"
              type="primary"
              styles={{flex: 1}}
            />
            <ButtonComponent text="Có, Hủy" type="primary" styles={{flex: 1}} />
          </RowComponent>
        </View>
      </RBSheet>
      <HeaderComponent
        styles={{justifyContent: 'space-between'}}
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
            onPressCancelled={() => handleCancelled(item._id)}
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
