import {ArrowLeft} from 'iconsax-react-native';
import React from 'react';
import {FlatList, StatusBar, TouchableOpacity, View} from 'react-native';
import {
  HeaderComponent,
  RowComponent,
  SectionComponent,
  TextComponent,
  UserList,
} from '../../components';
import {globalStyles} from '../../styles/globalStyles';
import {appColors} from '../../utils/constants/appColors';

const GoingScreen = ({route, navigation}: any) => {
  const {attendees} = route.params;
  console.log(attendees);

  return (
    <View
      style={[globalStyles.container, {paddingTop: StatusBar.currentHeight}]}>
      <HeaderComponent title={`${attendees.length} Đang tham dự`} goBack />

      {attendees.length > 0 ? (
        <SectionComponent>
          <FlatList
            data={attendees}
            renderItem={({item, index}) => (
              <UserList
                item={item}
                key={index}
                onPressProfile={() => {
                  navigation.navigate('ProfileNavigator', {
                    profiledata: item,
                  });
                }}
              />
            )}></FlatList>
        </SectionComponent>
      ) : (
        <View style={{alignItems: 'center', flex: 1}}>
          <TextComponent
            text="Chưa có ai tham gia sự kiện này"
            color={appColors.gray2}
            title
            size={18}
          />
        </View>
      )}
    </View>
  );
};

export default GoingScreen;
