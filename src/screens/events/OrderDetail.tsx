import React, {useState} from 'react';
import {Image, Modal, StatusBar, StyleSheet, View} from 'react-native';
import WebView from 'react-native-webview';
import orderAPI from '../../apis/orderApi';
import paymentApi from '../../apis/paymentApi';
import {
  ButtonComponent,
  EventItem,
  HeaderComponent,
  RowComponent,
  SectionComponent,
  ShapeComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';
import {globalStyles} from '../../styles/globalStyles';
import {appColors} from '../../utils/constants/appColors';
import {fontFamilies} from '../../utils/constants/fontFamilies';
import {convertToUSD, formatCurrency} from '../../utils/util';

const OrderDetail = ({route, navigation}: any) => {
  const {dataDetail} = route.params;
  console.log(dataDetail);
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
      const res = await paymentApi.HandlePayment(
        '/paypal',
        {
          orderId: dataDetail._id,
          name: dataDetail.eventId.title,
          price: convertToUSD(dataDetail.ticketId.price),
          quantity: dataDetail.quantity,
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
  const handleVnPay = async () => {
    try {
      const res = await paymentApi.HandlePayment(
        '/vnpay',
        {
          orderId: dataDetail._id,
          price: dataDetail.ticketId.price,
          quantity: dataDetail.quantity,
        },
        'post',
      );
      setPaypalUrl(res.data);
      setShowModal(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleResponse = (navState: any) => {
    const {url} = navState;
    if (url.includes('http://172.20.10.2:3001/payment/paypal-success')) {
      setShowModal(false);
      setPaymentSuccess(true);
    } else if (
      url.includes('http://172.20.10.2:3001/payment/vnpay-success')
    ) {
      setShowModal(false);
      setPaymentSuccess(true);
    } else if (url.includes('http://172.20.10.2:3001/payment/cancel')) {
      setShowModal(false);
      setPaymentFail(true);
    }
  };

  const handleGoBack = async () => {
    try {
      const res = await orderAPI.HandleOrder(
        '/delete',
        {orderId: dataDetail._id},
        'delete',
      );
      console.log(res);
      navigation.goBack();
    } catch (error) {
      console.log(error);
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
              <Image
                source={require('../../assets/images/success.png')}
                resizeMode="cover"
                style={{width:200, height:200}}
              />
              <TextComponent
                text="Chúc mừng"
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
                
                  text="Ban đã đặt vé sự kiện thành công"
                  size={16}
                />
                <TextComponent text="Hãy tận hưởng sự kiện" size={16} />
              </View>
              {/* <ButtonComponent
                onPress={() => {
                  navigation.navigate('TicketDetail', orderInfo);
                }}
                text="Xem E-Ticket"
                type="primary"
                styles={{marginVertical: 10}}
              /> */}
              <ButtonComponent
                text="Trang chủ"
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
          <HeaderComponent
            goBack
            onPress={handleGoBack}
            title="Chi tiết đơn hàng"
          />
          <EventItem item={dataDetail.eventId} type="list" disible={true} />
          <SectionComponent>
            <TextComponent title text="Thông tin đơn hàng" size={20} />
            <SpaceComponent height={10} />
            <RowComponent
              styles={{justifyContent: 'space-between', paddingBottom: 10}}>
              <TextComponent text="Tiền loại vé" size={16} />
              <TextComponent
                text={`${formatCurrency(dataDetail.ticketId.price)}`}
                size={16}
              />
            </RowComponent>
            <RowComponent
              styles={{justifyContent: 'space-between', paddingBottom: 10}}>
              <TextComponent text="Số lượng" size={16} />
              <TextComponent text={dataDetail.quantity} size={16} />
            </RowComponent>
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
                text="Tổng tiền"
                size={18}
                font={fontFamilies.medium}
              />
              <TextComponent
                text={`${formatCurrency(dataDetail.totalPrice)}`}
                size={18}
                font={fontFamilies.medium}
              />
            </RowComponent>
          </SectionComponent>

          <SectionComponent>
            <TextComponent text="Phương thức thanh toán" title size={20} />
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
              onPress={() => handlePaymentMethodChange('vnpay')}>
              <RowComponent styles={{flex: 1}}>
                <ShapeComponent radius={12} color={appColors.white4} size={36}>
                  <Image
                    source={require('../../assets/images/vnpay.png')}
                    style={{width: 24, height: 24}}
                  />
                </ShapeComponent>
                <SpaceComponent width={15} />
                <TextComponent text="VnPay" size={16} />
              </RowComponent>
              <Radio selected={paymentMethod === 'vnpay'} />
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
            onPress={paymentMethod === 'paypal' ? handlePaypal : handleVnPay}
            styles={{width: '70%', padding: 12}}
            text="Thanh toán"
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
