import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {
  ButtonComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';
import {ArrowLeft} from 'iconsax-react-native';
import {fontFamilies} from '../../utils/constants/fontFamilies';
import {appColors} from '../../utils/constants/appColors';
import QRCode from 'react-native-qrcode-svg';
import ViewShot from 'react-native-view-shot';
import RNFS from 'react-native-fs';
import {formatCurrency} from '../../utils/util';
import {useSelector} from 'react-redux';
import {authSelector} from '../../redux/reducers/authReducer';
import userAPI from '../../apis/userApi';
import {UserModel} from '../../models/UserModel';
import paypalApi from '../../apis/paymentApi';

const TicketDetailScreen = ({route, navigation}: any) => {
  const ticketInfo = route.params;
  console.log(ticketInfo);
  const auth = useSelector(authSelector);
  const [organizer, setOrganizer] = useState<UserModel>();
  const [payment, setPayment] = useState<any>();
  const viewShotRef = useRef<any>(null);
  useEffect(() => {
    getOrganizer();
    getPayment();
  }, []);
  const getOrganizer = async () => {
    try {
      const res = await userAPI.HandleUser(
        `/userId?userId=${ticketInfo.eventId.organizer}`,
      );
      setOrganizer(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getPayment = async () => {
    try {
      const res = await paypalApi.HandlePaypal(
        `/order?orderId=${ticketInfo._id}`,
      );
      setPayment(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const captureTicket = async () => {
    try {
      // Chụp nội dung của viewShotRef thành hình ảnh
      const uri = await viewShotRef.current.capture();
      console.log(uri);
      // Lưu hình ảnh xuống thiết bị
      const filePath = RNFS.DocumentDirectoryPath + `/ticket_${Date.now()}.jpg`;
      await RNFS.copyFile(uri, filePath);

      // Thêm ảnh vào thư viện ảnh của thiết bị
      await RNFS.scanFile(filePath);

      // Hiển thị thông báo khi tải xuống hoàn tất
      Alert.alert('Downloaded', `Ticket saved at: ${filePath}`);
      console.log(filePath);
    } catch (error) {
      console.error('Error saving ticket:', error);
    }
  };
  return (
    <View
      style={{
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        backgroundColor: appColors.whiteBg,
      }}>
      <StatusBar barStyle={'dark-content'} />
      <SectionComponent>
        <RowComponent>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Menu');
            }}>
            <ArrowLeft size={22} color="black" />
          </TouchableOpacity>
          <SpaceComponent width={10} />
          <TextComponent text="E-Ticket" size={20} font={fontFamilies.medium} />
        </RowComponent>
      </SectionComponent>
      <ScrollView>
        <ViewShot ref={viewShotRef} options={{format: 'jpg', quality: 1}}>
          <SectionComponent
            styles={{justifyContent: 'center', alignItems: 'center'}}>
            <QRCode
              value={`Sự kiện : ${ticketInfo.eventId.title}, Số lượng vé: ${ticketInfo.quantity}, Người tham dự: ${auth.name}`}
              size={320}
            />
          </SectionComponent>
          <SectionComponent styles={localStyle.section}>
            <TextComponent text="Sự Kiện" />
            <TextComponent
              text={`${ticketInfo.eventId.title}`}
              title
              size={18}
              styles={{paddingVertical: 10}}
            />
            <TextComponent text="Thời Gian " />
            <TextComponent
              text={`${ticketInfo.eventId.startTime}`}
              title
              size={18}
              styles={{paddingVertical: 10}}
            />
            <TextComponent text="Địa Điểm Sự Kiện" />
            <TextComponent
              text={`${ticketInfo.eventId.address}`}
              title
              size={18}
              styles={{paddingVertical: 10}}
            />
            <TextComponent text="Tổ Chức Sự Kiện" />
            <TextComponent
              text={`${organizer?.name}`}
              title
              size={18}
              styles={{paddingTop: 10}}
            />
          </SectionComponent>
          <SectionComponent styles={localStyle.section}>
            <RowComponent styles={{justifyContent: 'space-between'}}>
              <TextComponent text="Tên Đầy Đủ" />
              <TextComponent text={auth.name} title size={16} />
            </RowComponent>
            <RowComponent
              styles={{justifyContent: 'space-between', paddingVertical: 10}}>
              <TextComponent text="Country" />
              <TextComponent text="Việt Nam" title size={16} />
            </RowComponent>
            <RowComponent styles={{justifyContent: 'space-between'}}>
              <TextComponent text="Email" />
              <TextComponent text={auth.email} title size={16} />
            </RowComponent>
          </SectionComponent>
          <SectionComponent styles={localStyle.section}>
            <RowComponent styles={{justifyContent: 'space-between'}}>
              <TextComponent text={`${ticketInfo.quantity} Ghế`} />
              <TextComponent
                text={formatCurrency(ticketInfo.totalPrice)}
                title
                size={16}
              />
            </RowComponent>
            <RowComponent styles={{justifyContent: 'space-between'}}>
              <TextComponent text="Tổng tiền" />
              <TextComponent
                text={`${formatCurrency(ticketInfo.totalPrice)}`}
                title
                size={16}
              />
            </RowComponent>
          </SectionComponent>
          <SectionComponent styles={localStyle.section}>
            <RowComponent styles={{justifyContent: 'space-between'}}>
              <TextComponent text="Phương thức thanh toán" />
              <TextComponent text={`${payment?.paymentMethod}`} title size={16} />
            </RowComponent>
            <RowComponent
              styles={{justifyContent: 'space-between', paddingVertical: 10}}>
              <TextComponent text="Mã đơn hàng" />
              <TextComponent
                text={`${payment?.transactionId}`}
                title
                size={16}
              />
            </RowComponent>
            <RowComponent styles={{justifyContent: 'space-between'}}>
              <TextComponent text="Trạng thái" />
              <TextComponent text={`${ticketInfo.status}`} title size={16} />
            </RowComponent>
          </SectionComponent>
          <SectionComponent>
            <ButtonComponent
              onPress={captureTicket}
              text="Download Ticket"
              type="primary"
              styles={{width: '100%', borderRadius: 100}}
            />
          </SectionComponent>
        </ViewShot>
      </ScrollView>
    </View>
  );
};
const localStyle = StyleSheet.create({
  section: {
    backgroundColor: appColors.white,
    marginHorizontal: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
});
export default TicketDetailScreen;
