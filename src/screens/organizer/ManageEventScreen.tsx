import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  FlatList,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';
import { useSelector } from 'react-redux';
import eventAPI from '../../apis/eventApi';
import MemoAdd from '../../assets/svg/Add';
import {
  EventItem,
  HeaderComponent,
  RowComponent,
  SectionComponent,
  ShapeComponent,
  SpaceComponent,
  TextComponent
} from '../../components';
import { authSelector } from '../../redux/reducers/authReducer';
import { globalStyles } from '../../styles/globalStyles';
import { appColors } from '../../utils/constants/appColors';
import { fontFamilies } from '../../utils/constants/fontFamilies';

const ManageEventScreen = ({navigation}: any) => {
  const auth = useSelector(authSelector);
  const [userId, setuserId] = useState(auth.id);
  const [eventData, setEventData] = useState([]);
  useEffect(() => {
    if (userId) {
      getEvent();
    }
  }, []);
  const getEvent = async () => {
    try {
      const res = await eventAPI.HandleEvent(`/byOrganizer?id=${userId}`);
      // console.log(res);
      setEventData(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View
      style={[globalStyles.container, {paddingTop: StatusBar.currentHeight}]}>
      <HeaderComponent title="Manage Event" goBack />
      <SectionComponent>
        <RowComponent styles={{justifyContent: 'space-around'}}>
          <TouchableOpacity
            style={[localStyle.touch, {flex: 1}]}
            onPress={() => {
              navigation.navigate('AddNewEvent');
            }}>
            <ShapeComponent size={60} color={appColors.cam2}>
              <MemoAdd width={30} height={30} />
            </ShapeComponent>
            <SpaceComponent height={10} />
            <TextComponent text="Tạo mới sự kiện" font={fontFamilies.medium} />
          </TouchableOpacity>
          {/* <TouchableOpacity style={localStyle.touch} onPress={() => {navigation.navigate("StatisticsScreen")}}>
            <ShapeComponent size={60} color={appColors.cam2}>
              <MemoStatistics width={40} height={40} />
            </ShapeComponent>
            <SpaceComponent height={10} />
            <TextComponent
              text="Báo cáo, thống kê"
              font={fontFamilies.medium}
            />
          </TouchableOpacity> */}
        </RowComponent>
      </SectionComponent>
      <SectionComponent>
        <FlatList
          data={eventData}
          renderItem={({item, index}) => (
            <EventItem isManage
              item={item}
              type="list"
              styles={{width: Dimensions.get('window').width * 0.86}}
            />
          )}></FlatList>
      </SectionComponent>
    </View>
  );
};

const localStyle = StyleSheet.create({
  button: {width: '100%', paddingVertical: 10, paddingHorizontal: 0},
  touch: {
    backgroundColor: appColors.purple2,
    width: '40%',
    height: 130,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
  },
  shape: {},
});
export default ManageEventScreen;
