import {Add, ArrowLeft, Minus} from 'iconsax-react-native';
import React, {useEffect, useState} from 'react';
import {StatusBar, StyleSheet, TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';
import orderAPI from '../../apis/orderApi';
import {
  ButtonComponent,
  HeaderComponent,
  RowComponent,
  SectionComponent,
  ShapeComponent,
  TextComponent,
} from '../../components';
import {authSelector} from '../../redux/reducers/authReducer';
import {globalStyles} from '../../styles/globalStyles';
import {appColors} from '../../utils/constants/appColors';
import {fontFamilies} from '../../utils/constants/fontFamilies';
import ticketAPI from '../../apis/ticketApi';
import {formatCurrency} from '../../utils/util';

const OrderTickets = ({route, navigation}: any) => {
  const {item, tickets} = route.params;
  const user = useSelector(authSelector);
  const [quantityBuy, setQuantityBuy] = useState(0);
  // const [ticketData, setTicketData] = useState<any>();
  const [quantityAvailable, setQuantityAvailble] = useState(
    tickets.length > 0 ? tickets[0].quantity : 0,
  );
  const [selectedType, setSelectedType] = useState(0);
  const [ticketType, setTicketType] = useState(
    tickets.length > 0 ?? tickets[0].ticketType,
  );
  const [ticketPrice, setTicketPrice] = useState(
    tickets.length > 0 ? tickets[0].price : 0,
  );
  const [ticketId, setTicketId] = useState(
    tickets.length > 0 ? tickets[0]._id : '',
  );
  const newItem = {
    ...item,
    quantityBuy: quantityBuy,
    ticketPrice: ticketPrice,
    ticketId: ticketId,
  };
  // console.log(newItem);
  const handleType = (
    index: any,
    typeTicket: any,
    ticketPrice: any,
    id: any,
    quantity: any,
  ) => {
    setSelectedType(index);
    setTicketPrice(ticketPrice);
    setTicketType(typeTicket);
    setTicketId(id);
    setQuantityAvailble(quantity);
  };
  const increaseQuantity = () => {
    if (quantityBuy < quantityAvailable) {
      setQuantityBuy(quantityBuy + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantityBuy > 0) {
      setQuantityBuy(quantityBuy - 1);
    }
  };
  useEffect(() => {
    console.log(quantityAvailable);
  }, [quantityAvailable]);

  const handleOrder = async () => {
    try {
      const res = await orderAPI.HandleOrder(
        '/',
        {
          userId: user.id,
          eventId: item._id,
          ticketId: ticketId,
          quantity: quantityBuy,
          totalPrice: ticketPrice * quantityBuy,
        },
        'post',
      );

      navigation.navigate('OrderDetail', {
        dataDetail: res.data
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOrderFree = async () => {
    try {
      const res = await orderAPI.HandleOrder(
        '/',
        {
          userId: user.id,
          eventId: item._id,
          ticketId: ticketId,
          quantity: quantityBuy,
          totalPrice: ticketPrice * quantityBuy,
          status: 'Paid',
        },
        'post',
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={globalStyles.container}>
      <View
        style={[globalStyles.container, {paddingTop: StatusBar.currentHeight}]}>
        <HeaderComponent title="Đặt Vé" goBack />

        {tickets.length > 0 && (
          <SectionComponent>
            <RowComponent styles={{justifyContent: 'center'}}>
              {tickets.map((ticket: any, index: any) => (
                <TouchableOpacity
                  onPress={() =>
                    handleType(
                      index,
                      ticket.ticketType,
                      ticket.price,
                      ticket._id,
                      ticket.quantity,
                    )
                  }
                  style={[
                    localStyle.touchableOpacity,
                    selectedType === index &&
                      localStyle.selectedTouchableOpacity,
                  ]}
                  key={index}>
                  <TextComponent
                    text={ticket.ticketType}
                    color={
                      selectedType === index
                        ? appColors.primary
                        : appColors.gray2
                    }
                    font={fontFamilies.medium}
                    size={20}
                  />
                </TouchableOpacity>
              ))}
            </RowComponent>
          </SectionComponent>
        )}
        <SectionComponent>
          <TextComponent text="Chọn số lượng vé muốn mua" title size={22} />
          <RowComponent
            styles={{
              alignItems: 'center',
              justifyContent: 'center',
              paddingTop: 20,
            }}>
            <ShapeComponent
              onPress={decreaseQuantity}
              radius={12}
              color="white"
              styles={{
                borderColor: appColors.gray2,
                borderWidth: 1,
                marginHorizontal: 30,
              }}
              size={45}>
              <Minus size={22} color="black" />
            </ShapeComponent>

            <TextComponent
              text={String(quantityBuy)}
              size={22}
              font={fontFamilies.medium}
            />

            <ShapeComponent
              onPress={increaseQuantity}
              radius={12}
              color="white"
              styles={{
                borderColor: appColors.gray2,
                borderWidth: 1,
                marginHorizontal: 30,
              }}
              size={45}>
              <Add size={22} color="black" />
            </ShapeComponent>
          </RowComponent>
        </SectionComponent>
      </View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: 20,
        }}>
        {ticketPrice === 0 ? (
          <ButtonComponent
            text="Nhận Vé"
            styles={{width: '70%', padding: 12}}
            type="primary"
            disable={quantityBuy === 0 ? true : false}
          />
        ) : (
          <ButtonComponent
            disable={quantityBuy === 0 ? true : false}
            onPress={handleOrder}
            styles={{width: '70%', padding: 12}}
            text={`Tiếp tục - ${formatCurrency(ticketPrice * quantityBuy)}`}
            type="primary"
            textStyle={{fontFamily: fontFamilies.medium, fontSize: 16}}
          />
        )}
      </View>
    </View>
  );
};
const localStyle = StyleSheet.create({
  touchableOpacity: {
    flex: 1,
    paddingVertical: 4,
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
export default OrderTickets;
