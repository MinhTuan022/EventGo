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
  SpaceComponent,
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
import paypalApi from '../../apis/paymentApi';
import paymentApi from '../../apis/paymentApi';

const TicketScreen = ({navigation}: any) => {
  // const navigation = useNavigation();
  const refRBSheet = useRef<any>();
  const [selected, setSelected] = useState(0);
  const [ticket, setTicket] = useState([]);
  const [orderIdSelected, setOrderIdSelected] = useState('');
  const user = useSelector(authSelector);
  const data = [
    {name: 'Sắp diễn ra', val: 'Paid'},
    {name: 'Hoàn Thành', val: 'Completed'},
    {name: 'Đã Hủy', val: 'Cancelled'},
  ];
  const [status, setStatus] = useState('Paid');
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
      // console.log(`?userId=${user.id}&status=${status}`);
      setTicket(res.data);
      // console.log(res.data);
      if (res.data && res.data.length > 0) {
        res.data.forEach((ticket:any) => {
          // console.log("dd",ticket)
          updateComplete(ticket._id);
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const updateComplete = async (id:any) => {
    try {
      const res = await orderAPI.HandleOrder("/complete", {orderId: id}, "put")
      // console.log(res)
    } catch (error) {
      console.log("e",error)
    }
  }
  const handleSelected = (index: any, val: any) => {
    setSelected(index);
    setStatus(val);
  };
  // useEffect(() => {
  //   console.log(ticket);
  // }, [ticket]);
  const openModal = (id: any) => {
    refRBSheet.current.open();
    console.log(id);
    setOrderIdSelected(id);
  };
  const closeModal = () => {
    refRBSheet.current.close();
  };
  const handleCancelled = async (orderId: any) => {
    try {
      console.log(orderId);
      await paymentApi.HandlePayment("/payment-refund", {orderId}, "post")

      const res = await orderAPI.HandleOrder('/delete', {orderId}, 'delete');
      refRBSheet.current.close();
      getTicket();
    } catch (error) {
      console.log(error);
    }
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
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        customStyles={{
          container: {
            backgroundColor: 'white',
            borderTopEndRadius: 38,
            borderTopStartRadius: 38,
            height: 'auto',
          },
          wrapper: {
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
          },
          draggableIcon: {
            backgroundColor: appColors.gray2,
          },
        }}>
        <View style={{alignItems: 'center'}}>
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
              paddingHorizontal: 40,
            }}>
            <TextComponent
              styles={{textAlign: 'center'}}
              text="Bạn có chắc chắn muốn hủy vé sự kiện này?"
              font={fontFamilies.medium}
              size={20}
            />
            <SpaceComponent height={10} />
            <TextComponent
              styles={{textAlign: 'center'}}
              text="Số tiền bạn đã thanh toán sẽ được hoàn lại trong thời gian sớm nhất"
              size={18}
            />
          </View>

          <RowComponent
            styles={{
              width: '100%',
              paddingHorizontal: 20,
              marginVertical: 20,
            }}>
            <ButtonComponent
              onPress={closeModal}
              text="Không Hủy"
              type="primary"
              color={appColors.purple2}
              textColor={appColors.primary}
              textStyle={{fontFamily: fontFamilies.medium}}
              styles={{flex: 1, borderRadius: 30}}
            />
            <SpaceComponent width={10} />

            <ButtonComponent
              onPress={() => handleCancelled(orderIdSelected)}
              text="Có Hủy"
              type="primary"
              styles={{flex: 1, borderRadius: 30}}
              textStyle={{fontFamily: fontFamilies.medium}}
            />
          </RowComponent>
        </View>
      </RBSheet>
      <HeaderComponent
        styles={{justifyContent: 'space-between'}}
        title="Vé"
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
            onPressCancelled={() => {
              openModal(item._id);
            }}
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
