import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useRef} from 'react';
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

const TicketDetailScreen = ({route, navigation}: any) => {
  const ticketInfo = route.params;
  console.log(ticketInfo);
  const viewShotRef = useRef<any>(null);

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
            <QRCode value="hihi" size={320} />
          </SectionComponent>
          <SectionComponent styles={localStyle.section}>
            <TextComponent text="Event" />
            <TextComponent
              text={`${ticketInfo.eventId.title}`}
              title
              size={20}
              styles={{paddingVertical: 10}}
            />
            <TextComponent text="Date and Hour" />
            <TextComponent
              text={`${ticketInfo.eventId.startTime}`}
              title
              size={20}
              styles={{paddingVertical: 10}}
            />
            <TextComponent text="Event Location" />
            <TextComponent
              text={`${ticketInfo.eventId.address}`}
              title
              size={20}
              styles={{paddingVertical: 10}}
            />
            <TextComponent text="Event Organizer" />
            <TextComponent
              text="Minh Tuấn"
              title
              size={20}
              styles={{paddingTop: 10}}
            />
          </SectionComponent>
          <SectionComponent styles={localStyle.section}>
            <RowComponent styles={{justifyContent: 'space-between'}}>
              <TextComponent text="Full Name" />
              <TextComponent text="Event" title size={16} />
            </RowComponent>
            <RowComponent
              styles={{justifyContent: 'space-between', paddingVertical: 10}}>
              <TextComponent text="Country" />
              <TextComponent text="Việt Nam" title size={16} />
            </RowComponent>
            <RowComponent styles={{justifyContent: 'space-between'}}>
              <TextComponent text="Email" />
              <TextComponent text="Event" title size={16} />
            </RowComponent>
          </SectionComponent>
          <SectionComponent styles={localStyle.section}>
            <RowComponent styles={{justifyContent: 'space-between'}}>
              <TextComponent text={`${ticketInfo.quantity} Seat`} />
              <TextComponent text="$4.00" title size={16} />
            </RowComponent>
            <RowComponent styles={{justifyContent: 'space-between'}}>
              <TextComponent text="Total" />
              <TextComponent
                text={`${ticketInfo.totalPrice}`}
                title
                size={16}
              />
            </RowComponent>
          </SectionComponent>
          <SectionComponent styles={localStyle.section}>
            <RowComponent styles={{justifyContent: 'space-between'}}>
              <TextComponent text="Payment Method" />
              <TextComponent text="Paypal" title size={16} />
            </RowComponent>
            <RowComponent
              styles={{justifyContent: 'space-between', paddingVertical: 10}}>
              <TextComponent text="Order ID" />
              <TextComponent text="111111111" title size={16} />
            </RowComponent>
            <RowComponent styles={{justifyContent: 'space-between'}}>
              <TextComponent text="Status" />
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
