import {View, Text, StatusBar, ScrollView, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {globalStyles} from '../../styles/globalStyles';
import {Dimensions} from 'react-native';
import {LineChart, ProgressChart} from 'react-native-chart-kit';
import {
  HeaderComponent,
  RowComponent,
  SectionComponent,
  TextComponent,
} from '../../components';
import {fontFamilies} from '../../utils/constants/fontFamilies';
import {appColors} from '../../utils/constants/appColors';
import orderAPI from '../../apis/orderApi';
import {formatCurrency} from '../../utils/util';
const StatisticsScreen = ({route}: any) => {
  const eventData = route.params;
  // console.log(eventData);
  const [hours, setHours] = useState<any>(['Không có dữ liệu']);
  const [counts, setCounts] = useState<number[]>([0]);
  const [hoursCancel, setHoursCancle] = useState<any>(['Không có dữ liệu']);
  const [countsCancel, setCountsCancel] = useState<number[]>([0]);
  const [ticketSolds, setTicketSolds] = useState<any>([]);
  const [revenue, setRevenue] = useState(0);
  const screenWidth = Dimensions.get('window').width;
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
      console.log(res);
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
  return (
    <ScrollView
      style={[globalStyles.container, {paddingTop: StatusBar.currentHeight}]}>
      <HeaderComponent title={eventData.title} goBack />
      <SectionComponent>
        <TextComponent text="Doanh Thu" font={fontFamilies.medium} size={16} />
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
  );
};

export default StatisticsScreen;
