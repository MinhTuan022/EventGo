import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Modal,
  Linking,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  ButtonComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';
import {ArrowLeft} from 'iconsax-react-native';
import {globalStyles} from '../../styles/globalStyles';
import {appColors} from '../../utils/constants/appColors';
import {fontFamilies} from '../../utils/constants/fontFamilies';
import WebView from 'react-native-webview';
import paypalApi from '../../apis/paypalApi';

const OrderTickets = () => {
  const [showModal, setShowModal] = useState(false);
  const [paypalUrl, setPaypalUrl] = useState('');
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [ticketInfo, setTicketInfo] = useState<any>({});
  const handlePaypal = async () => {
    try {
      const res = await paypalApi.HandlePaypal('/', {ff: 'd'}, 'post');
      console.log(res);
      if (res.data) {
        setPaypalUrl(res.data);
        setShowModal(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleResponse = (navState:any) =>{
    const {url} = navState
      if(url.includes("http://192.168.1.106:3001/paypal/success")){
          setShowModal(false)
          setPaymentSuccess(true)
          setTicketInfo({
            
            ticketType: "VIP",
            numberOfTickets: 2,
            totalPrice: 100 // or any other relevant info
          });
          // console.log(data)
      }
  }
  useEffect(() =>{
    console.log(showModal)
  },[showModal])
  return (
    <>
     {paymentSuccess && ticketInfo ? (
        // Hiển thị thông tin vé nếu thanh toán thành công và có thông tin vé
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Ticket Type: {ticketInfo.ticketType}</Text>
          <Text>Number of Tickets: {ticketInfo.numberOfTickets}</Text>
          <Text>Total Price: ${ticketInfo.totalPrice}</Text>
        </View>
      ) : (
    <View style={globalStyles.container}>
      <Modal visible={showModal}>
        <WebView source={{uri: paypalUrl}}  onNavigationStateChange={handleResponse}/>
      </Modal>
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

        <SectionComponent>
          <TextComponent text="Choice number of tickets" title size={22} />
          <RowComponent
            styles={{alignItems: 'center', justifyContent: 'center'}}>
            <TouchableOpacity
              style={{
                paddingHorizontal: 15,
                paddingVertical: 3,
                borderWidth: 1,
                borderColor: appColors.gray2,
                borderRadius: 12,
              }}>
              <TextComponent text="-" size={30} />
            </TouchableOpacity>
            <SpaceComponent width={15} />
            <TextComponent text="1" size={22} font={fontFamilies.medium} />
            <SpaceComponent width={15} />

            <TouchableOpacity
              style={{
                paddingHorizontal: 15,
                paddingVertical: 3,
                borderWidth: 1,
                borderColor: appColors.gray2,
                borderRadius: 12,
              }}>
              <TextComponent text="+" size={30} />
            </TouchableOpacity>
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
          onPress={handlePaypal}
          styles={{width: '70%', padding: 12}}
          text="Check Out"
          type="primary"
          textStyle={{fontFamily: fontFamilies.medium, fontSize: 16}}
        />
      </View>
    </View>)}
    </>
    
  );
};

export default OrderTickets;
