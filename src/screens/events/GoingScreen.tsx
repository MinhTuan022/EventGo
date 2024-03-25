import { ArrowLeft } from 'iconsax-react-native';
import React from 'react';
import { FlatList, StatusBar, TouchableOpacity, View } from 'react-native';
import {
  FollowList,
  RowComponent,
  SectionComponent,
  TextComponent,
} from '../../components';
import { globalStyles } from '../../styles/globalStyles';
import { appColors } from '../../utils/constants/appColors';

const GoingScreen = ({route, navigation}: any) => {

  const {attendees} = route.params;
  // console.log(attendees);


  return (
    <View
      style={[globalStyles.container, {paddingTop: StatusBar.currentHeight}]}>
      <SectionComponent>
        <RowComponent>
          <TouchableOpacity
            style={{marginRight: 20}}
            onPress={() => navigation.goBack()}>
            <ArrowLeft size={22} color="black" />
          </TouchableOpacity>
          <TextComponent text={`${attendees.length} Going`} size={18} title />
        </RowComponent>
      </SectionComponent>

      {attendees.length > 0 ? (
        <SectionComponent>
          <FlatList
            data={attendees}
            renderItem={({item, index}) => (
              <FollowList item={item} key={index} />
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
