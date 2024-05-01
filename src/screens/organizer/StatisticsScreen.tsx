import {
  View,
  Text,
  StatusBar,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {globalStyles} from '../../styles/globalStyles';
import {Dimensions} from 'react-native';
import {LineChart, ProgressChart} from 'react-native-chart-kit';
import {
  ButtonComponent,
  HeaderComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';
import {fontFamilies} from '../../utils/constants/fontFamilies';
import {appColors} from '../../utils/constants/appColors';
import orderAPI from '../../apis/orderApi';
import {formatCurrency} from '../../utils/util';
import {Edit, Trash} from 'iconsax-react-native';
import eventAPI from '../../apis/eventApi';
import RBSheet from 'react-native-raw-bottom-sheet';
const StatisticsScreen = ({navigation, route}: any) => {
  const eventData = route.params;
  // console.log(eventData);
  const [hours, setHours] = useState<any>(['Không có dữ liệu']);
  const [counts, setCounts] = useState<number[]>([0]);
  const [hoursCancel, setHoursCancle] = useState<any>(['Không có dữ liệu']);
  const [countsCancel, setCountsCancel] = useState<number[]>([0]);
  const [ticketSolds, setTicketSolds] = useState<any>([]);
  const [revenue, setRevenue] = useState(0);
  const screenWidth = Dimensions.get('window').width;
  const refRBSheet = useRef<any>();

  useEffect(() => {
    if (eventData) {
      getStatis();
      getTicketSold();
      getRevenue();
      getCancelled();
    }
  }, [eventData]);
  useEffect(() => {
    console.log(counts);
    console.log(hours);
  }, [counts, hours]);
  const chartConfig = {
    backgroundGradientFrom: '#FFFFFF',
    backgroundGradientTo: '#FFFFFF',
    fillShadowGradientFrom: '#FFFFFF',
    fillShadowGradientTo: '#FFFFFF',

    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
  };
  const data = {
    labels: hours.length > 0 ? hours : ['Không có dữ liệu'],
    datasets: [
      {
        data: counts.length > 0 ? counts : [0],
        color: (opacity = 1) => `rgba(88, 76, 244, ${opacity})`,
        strokeWidth: 5,
      },
    ],
  };
  const dataCancel = {
    labels: hoursCancel.length > 0 ? hoursCancel : ['Không có dữ liệu'],
    datasets: [
      {
        data: countsCancel.length > 0 ? countsCancel : [0],
        color: (opacity = 1) => `rgba(210, 1, 3, ${opacity})`,
        strokeWidth: 5,
      },
    ],
  };
  const dataProgress = {
    labels: ['Swim'],
    data: [0.4],
    colors: [appColors.primary],
  };
  const openModal = () => {
    refRBSheet.current.open();
  };
  const getStatis = async () => {
    try {
      const res = await orderAPI.HandleOrder(
        `/statis?eventId=${eventData._id}`,
      );
      // console.log(res);
      setHours(res.data.hours);
      setCounts(res.data.counts);
    } catch (error) {
      console.log(error);
    }
  };
  const getCancelled = async () => {
    try {
      const res = await orderAPI.HandleOrder(
        `/cancelled?eventId=${eventData._id}`,
      );
      setHoursCancle(res.data.hours);
      setCountsCancel(res.data.counts);
    } catch (error) {
      console.log(error);
    }
  };

  const getTicketSold = async () => {
    try {
      const res = await orderAPI.HandleOrder(`/sold?eventId=${eventData._id}`);
      console.log('fghfghfg', res);
      setTicketSolds(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getRevenue = async () => {
    try {
      const res = await orderAPI.HandleOrder(
        `/revenue?eventId=${eventData._id}`,
      );
      console.log('dđ', res);
      setRevenue(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteEvent = async () => {
    try {
      const res = await eventAPI.HandleEvent(
        '/delete',
        {eventId: eventData._id},
        'delete',
      );
      Alert.alert(
        'Thành công',
        'Sự kiện của bạn đã được xóa.',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('HomeOgz'),
          },
        ],
        {cancelable: false},
      );
      refRBSheet.current.close();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View
      style={[globalStyles.container, {paddingTop: StatusBar.currentHeight}]}>
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
          <TextComponent text="Hủy Sự Kiện" title />
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
              text="Bạn có chắc chắn muốn hủy bỏ sự kiện này?"
              font={fontFamilies.medium}
              size={20}
            />
            <SpaceComponent height={10} />
            <TextComponent
              styles={{textAlign: 'center'}}
              text="Mọi thông tin sự kiện, doanh thu sẽ bị hủy bỏ, những người dùng đã mua vé sự kiện này sẽ được hoàn tiền"
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
              onPress={() => {
                refRBSheet.current.close();
              }}
              text="Không Hủy"
              type="primary"
              color={appColors.purple2}
              textColor={appColors.primary}
              textStyle={{fontFamily: fontFamilies.medium}}
              styles={{flex: 1, borderRadius: 30}}
            />
            <SpaceComponent width={10} />

            <ButtonComponent
              onPress={deleteEvent}
              text="Có Hủy"
              type="primary"
              styles={{flex: 1, borderRadius: 30}}
              textStyle={{fontFamily: fontFamilies.medium}}
            />
          </RowComponent>
        </View>
      </RBSheet>
      <HeaderComponent
        title={eventData.title}
        goBack
        children={
          <RowComponent>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('EditEventScreen', {
                  id: eventData._id,
                  isManage: true,
                });
              }}>
              <Edit size={25} color="black" />
            </TouchableOpacity>
            <SpaceComponent width={20} />
            <TouchableOpacity onPress={openModal}>
              <Trash size={25} color="red" />
            </TouchableOpacity>
          </RowComponent>
        }
        styles={{justifyContent: 'space-between'}}
      />
      <ScrollView>
        <SectionComponent>
          <TextComponent
            text="Doanh Thu"
            font={fontFamilies.medium}
            size={16}
          />
          <TextComponent
            text={`${formatCurrency(revenue)} `}
            font={fontFamilies.bold}
            size={25}
          />
        </SectionComponent>
        <SectionComponent>
          <TextComponent
            text="Lượng người mua vé theo thời gian"
            font={fontFamilies.medium}
            size={16}
          />
        </SectionComponent>
        <LineChart
          data={data}
          width={screenWidth}
          height={220}
          chartConfig={chartConfig}
        />
        <SectionComponent>
          <TextComponent
            text="Lượng người hủy vé theo thời gian"
            font={fontFamilies.medium}
            size={16}
          />
        </SectionComponent>
        <LineChart
          data={dataCancel}
          width={screenWidth}
          height={220}
          chartConfig={chartConfig}
        />
        <SectionComponent>
          <TextComponent
            text="Số lượng vé đã bán / Tổng số vé"
            font={fontFamilies.medium}
            size={16}
          />
          {ticketSolds.length > 0 && (
            <FlatList
              scrollEnabled={false}
              data={ticketSolds}
              renderItem={({item, index}) => (
                <RowComponent key={index}>
                  <TextComponent
                    text={`${item.percentageSold * 100} %`}
                    font={fontFamilies.medium}
                    styles={{position: 'absolute', left: 35, zIndex: 1}}
                  />
                  <ProgressChart
                    data={{
                      labels: [`${item?.tiketType}`],
                      data: [item.percentageSold],
                      colors: [appColors.primary],
                    }}
                    width={100}
                    height={100}
                    strokeWidth={8}
                    radius={30}
                    chartConfig={chartConfig}
                    hideLegend
                    withCustomBarColorFromData
                  />
                  <View>
                    <TextComponent
                      text={`Vé ${item.ticketType}`}
                      font={fontFamilies.medium}
                    />
                    <TextComponent
                      text={`${item.totalSold}/${item.ticketQuantity}`}
                    />
                  </View>
                </RowComponent>
              )}
            />
          )}
        </SectionComponent>
      </ScrollView>
    </View>
  );
};

export default StatisticsScreen;
