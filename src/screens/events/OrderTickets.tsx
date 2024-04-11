import {Add, ArrowLeft, Key, Minus} from 'iconsax-react-native';
import React, {useEffect, useState} from 'react';
import {StatusBar, StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  ButtonComponent,
  RowComponent,
  SectionComponent,
  ShapeComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';
import {globalStyles} from '../../styles/globalStyles';
import {appColors} from '../../utils/constants/appColors';
import {fontFamilies} from '../../utils/constants/fontFamilies';
import App from '../../../App';
import {convertToUSD} from '../../utils/convertToUSD';
import {useNavigation} from '@react-navigation/native';
import orderAPI from '../../apis/orderApi';
import {useSelector} from 'react-redux';
import {authSelector} from '../../redux/reducers/authReducer';

const OrderTickets = ({route, navigation}: any) => {
  const item = route.params;
  const user = useSelector(authSelector);

  const [quantityBuy, setQuantityBuy] = useState(1);
  const [selectedType, setSelectedType] = useState(0);
  const [ticketType, setTicketType] = useState(
    item.tickets.length > 0 ?? item.tickets[0].ticketType,
  );
  const [ticketPrice, setTicketPrice] = useState(
    item.tickets.length > 0 ? item.tickets[0].price : 0,
  );
  const [ticketId, setTicketId] = useState(item.tickets.length > 0 ? item.tickets[0]._id : "");
  const newItem = {
    ...item,
    quantityBuy: quantityBuy,
    ticketPrice: ticketPrice,
    ticketId: ticketId,
  };
  console.log(newItem);
  const handleType = (
    index: any,
    typeTicket: any,
    ticketPrice: any,
    id: any,
  ) => {
    setSelectedType(index);
    setTicketPrice(ticketPrice);
    setTicketType(typeTicket);
    setTicketId(id);
  };
  const increaseQuantity = () => {
    setQuantityBuy(quantityBuy + 1);
  };

  const decreaseQuantity = () => {
    if (quantityBuy > 0) {
      setQuantityBuy(quantityBuy - 1);
    }
  };
useEffect(() => {
console.log(ticketId)
},[ticketId])
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

      navigation.navigate('OrderDetail', {eventData: newItem, orderId: res.data._id});
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={globalStyles.container}>
      <View
        style={[globalStyles.container, {paddingTop: StatusBar.currentHeight}]}>
        <SectionComponent>
          <RowComponent>
            <TouchableOpacity>
              <ArrowLeft size={20} color="black" />
            </TouchableOpacity>
            <TextComponent
              text="Book Event"
              size={22}
              font={fontFamilies.medium}
            />
          </RowComponent>
        </SectionComponent>

        {item.tickets.length > 0 && (
          <SectionComponent>
            <RowComponent styles={{justifyContent: 'center'}}>
              {item.tickets.map((ticket: any, index: any) => (
                <TouchableOpacity
                  onPress={() =>
                    handleType(
                      index,
                      ticket.ticketType,
                      ticket.price,
                      ticket._id,
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
                  />
                </TouchableOpacity>
              ))}
            </RowComponent>
          </SectionComponent>
        )}
        <SectionComponent>
          <TextComponent text="Choice number of tickets" title size={22} />
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
        <ButtonComponent
          disable={quantityBuy === 0 ? true : false}
          onPress={
            handleOrder
            
          }
          styles={{width: '70%', padding: 12}}
          text={`Continue - ${ticketPrice * quantityBuy} VNĐ`}
          type="primary"
          textStyle={{fontFamily: fontFamilies.medium, fontSize: 16}}
        />
      </View>
    </View>
  );
};
const localStyle = StyleSheet.create({
  touchableOpacity: {
    flex: 1,
    paddingVertical: 7,
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
