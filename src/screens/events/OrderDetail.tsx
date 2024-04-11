import {ArrowLeft} from 'iconsax-react-native';
import React, {useState} from 'react';
import {
  Image,
  Modal,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import WebView from 'react-native-webview';
import {useSelector} from 'react-redux';
import paypalApi from '../../apis/paypalApi';
import ticketAPI from '../../apis/ticketApi';
import {
  ButtonComponent,
  EventItem,
  RowComponent,
  SectionComponent,
  ShapeComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';
import {authSelector} from '../../redux/reducers/authReducer';
import {globalStyles} from '../../styles/globalStyles';
import {appColors} from '../../utils/constants/appColors';
import {fontFamilies} from '../../utils/constants/fontFamilies';
import {convertToUSD} from '../../utils/convertToUSD';
import orderAPI from '../../apis/orderApi';

const OrderDetail = ({route, navigation}: any) => {
  const {eventData, orderId} = route.params;
  // console.log(eventData)
  const [showModal, setShowModal] = useState(false);
  const [paypalUrl, setPaypalUrl] = useState('');
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentFail, setPaymentFail] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [orderInfo, setOrderInfo] = useState();
  const handlePaymentMethodChange = (method: any) => {
    setPaymentMethod(method);
  };
  const handlePaypal = async () => {
    try {
      const res = await paypalApi.HandlePaypal(
        '/',
        {
          orderId,
          name: eventData.title,
          price: convertToUSD(eventData.ticketPrice),
          quantity: eventData.quantityBuy,
        },
        'post',
      );
      // console.log(res);
      if (res.data) {
        setPaypalUrl(res.data);
        setShowModal(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleResponse = (navState: any) => {
    const {url} = navState;
    if (url.includes('http://192.168.76.235:3001/paypal/success')) {
      setShowModal(false);
      setPaymentSuccess(true);
    } else if (url.includes('http://192.168.76.235:3001/paypal/cancel')) {
      setShowModal(false);
      setPaymentFail(true);
    }
  };

  return (
    <>
      {paymentSuccess && (
        <Modal transparent={true}>
          <StatusBar backgroundColor="rgba(0, 0, 0, 0.5)" translucent={true} />
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            }}>
            <View
              style={{
                backgroundColor: appColors.white,
                width: '80%',
                height: '60%',
                borderRadius: 50,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <TextComponent
                text="Congratulations"
                color={appColors.primary}
                title
                size={20}
              />
              <View
                style={{
                  paddingHorizontal: 30,
                  paddingVertical: 20,
                  alignItems: 'center',
                }}>
                <TextComponent
                  text="You have successfully placed an order for National Music Festival. "
                  size={16}
                />
                <TextComponent text="Enjoy the event!" size={16} />
              </View>
              <ButtonComponent
                onPress={() => {
                  navigation.navigate('TicketDetail', orderInfo);
                }}
                text="View E-Ticket"
                type="primary"
                styles={{marginVertical: 10}}
              />
              <ButtonComponent
                text="Go Home"
                type="primary"
                onPress={() => navigation.navigate('Menu')}
                color={appColors.purple2}
                textColor={appColors.primary}
              />
            </View>
          </View>
        </Modal>
      )}
      {paymentFail && (
        <Modal transparent={true}>
          <StatusBar backgroundColor="rgba(0, 0, 0, 0.5)" translucent={true} />
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            }}>
            <View
              style={{
                backgroundColor: appColors.white,
                width: '80%',
                height: '60%',
                borderRadius: 50,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <TextComponent
                text="Oops, Failed"
                color={'red'}
                title
                size={20}
              />
              <View
                style={{
                  paddingHorizontal: 30,
                  paddingVertical: 20,
                  alignItems: 'center',
                }}>
                <TextComponent text="Your payment failed. " size={16} />
                <TextComponent
                  text="Please check your internet connection then try again"
                  size={16}
                />
              </View>
              <ButtonComponent
                onPress={
                  paymentMethod === 'paypal'
                    ? handlePaypal
                    : () => {
                        console.log('first');
                      }
                }
                text="Try Again"
                type="primary"
                styles={{marginVertical: 10}}
              />
              <ButtonComponent
                text="Go Home"
                type="primary"
                onPress={() => navigation.navigate('Menu')}
                color={appColors.purple2}
                textColor={appColors.primary}
              />
            </View>
          </View>
        </Modal>
      )}
      <View
        style={[globalStyles.container, {paddingTop: StatusBar.currentHeight}]}>
        <Modal visible={showModal}>
          <WebView
            source={{uri: paypalUrl}}
            onNavigationStateChange={handleResponse}
          />
        </Modal>
        <View style={globalStyles.container}>
          <SectionComponent>
            <RowComponent>
              <TouchableOpacity>
                <ArrowLeft size={20} color="black" />
              </TouchableOpacity>
              <TextComponent
                text="Order Detail"
                size={22}
                font={fontFamilies.medium}
              />
            </RowComponent>
          </SectionComponent>
          <EventItem item={eventData} type="list" disible={true} />
          <SectionComponent>
            <TextComponent title text="Order Summary" size={20} />
            <SpaceComponent height={10} />
            <RowComponent
              styles={{justifyContent: 'space-between', paddingBottom: 10}}>
              <TextComponent text="Ticket Price" size={16} />
              <TextComponent text={`${eventData.ticketPrice}đ`} size={16} />
            </RowComponent>
            <RowComponent
              styles={{justifyContent: 'space-between', paddingBottom: 10}}>
              <TextComponent text="Quantity" size={16} />
              <TextComponent text={eventData.quantityBuy} size={16} />
            </RowComponent>
            {/* <RowComponent styles={{justifyContent: 'space-between'}}> */}
            {/* <TextComponent text="Fees" size={16} /> */}
            {/* <TextComponent text="0đ" size={16} /> */}
            {/* </RowComponent> */}
          </SectionComponent>
          <View
            style={{
              height: 1,
              backgroundColor: appColors.gray2,
              marginHorizontal: 16,
            }}
          />
          <SectionComponent>
            <RowComponent styles={{justifyContent: 'space-between'}}>
              <TextComponent
                text="Total"
                size={18}
                font={fontFamilies.medium}
              />
              <TextComponent
                text={`${eventData.ticketPrice * eventData.quantityBuy}đ`}
                size={18}
                font={fontFamilies.medium}
              />
            </RowComponent>
          </SectionComponent>

          <SectionComponent>
            <TextComponent text="Payment Method" title size={20} />
            <RowComponent
              styles={{paddingTop: 15}}
              onPress={() => handlePaymentMethodChange('paypal')}>
              <RowComponent styles={{flex: 1}}>
                <ShapeComponent radius={12} color={appColors.white4} size={36}>
                  <Image source={require('../../assets/images/paypal.png')} />
                </ShapeComponent>
                <SpaceComponent width={15} />
                <TextComponent text="Paypal" size={16} />
              </RowComponent>
              <Radio selected={paymentMethod === 'paypal'} />
            </RowComponent>
            <RowComponent
              styles={{paddingTop: 15}}
              onPress={() => handlePaymentMethodChange('momo')}>
              <RowComponent styles={{flex: 1}}>
                <ShapeComponent radius={12} color={appColors.white4} size={36}>
                  <Image
                    source={require('../../assets/images/momo.png')}
                    style={{width: 24, height: 24}}
                  />
                </ShapeComponent>
                <SpaceComponent width={15} />
                <TextComponent text="Momo" size={16} />
              </RowComponent>
              <Radio selected={paymentMethod === 'momo'} />
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
            onPress={
              paymentMethod === 'paypal'
                ? handlePaypal
                : () => {
                    console.log('first');
                  }
            }
            styles={{width: '70%', padding: 12}}
            text="Checkout"
            type="primary"
            textStyle={{fontFamily: fontFamilies.medium, fontSize: 16}}
          />
        </View>
      </View>
      {/* )} */}
    </>
  );
};
const Radio = ({selected}: any) => (
  <View style={[styles.radio, selected && styles.selected]}>
    <View style={[selected && styles.radioChildren]} />
  </View>
);
const styles = StyleSheet.create({
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'gray',
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioChildren: {
    width: 14,
    height: 14,
    borderRadius: 10,
    backgroundColor: appColors.primary,
  },
  selected: {
    borderColor: 'blue',
  },
});
export default OrderDetail;
