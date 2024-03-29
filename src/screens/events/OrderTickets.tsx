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

const OrderTickets = ({navigation, route}: any) => {
  const item = route.params;

  const [quantity, setQuantity] = useState(1);
  const [selectedType, setSelectedType] = useState(0);
  const [ticketType, setTicketType] = useState(
    item.ticketTypes.length > 0 ? item.ticketTypes[0].typeTicket : 'Free',
  );
  const [ticketPrice, setTicketPrice] = useState(
    item.ticketTypes.length > 0 ? item.ticketTypes[0].price : 0,
  );
  // useEffect(() => {
  //   console.log(ticketType);
  //   console.log(ticketPrice);
  // }, [ticketType, ticketPrice]);
  const newItem = {...item, quantity: quantity, ticketPrice: ticketPrice, totalPrice: ticketPrice * quantity};
  // console.log(newItem.quantity);
  const handleType = (index: any, typeTicket: any, ticketPrice: any) => {
    setSelectedType(index);
    setTicketPrice(ticketPrice);
    setTicketType(typeTicket);
  };
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
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

        {item.ticketTypes.length > 0 && (
          <SectionComponent>
            <RowComponent styles={{justifyContent: 'center'}}>
              {item.ticketTypes.map((type: any, index: any) => (
                <TouchableOpacity
                  onPress={() => handleType(index, type.typeTicket, type.price)}
                  style={[
                    localStyle.touchableOpacity,
                    selectedType === index &&
                      localStyle.selectedTouchableOpacity,
                  ]}
                  key={index}>
                  <TextComponent
                    text={type.typeTicket}
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
              text={String(quantity)}
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
          disable={quantity === 0 ? true : false}
          onPress={() => navigation.navigate('OrderDetail', newItem)}
          styles={{width: '70%', padding: 12}}
          text={`Continue - ${convertToUSD(ticketPrice * quantity)} $`}
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
