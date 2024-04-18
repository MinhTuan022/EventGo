import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {
  RowComponent,
  SectionComponent,
  ShapeComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {appColors} from '../../utils/constants/appColors';
import {NotificationModel} from '../../models/NotificationModel';
interface Props {
  item: NotificationModel;
  onPress?: () => void
}
const NotificationItem = (props: Props) => {
  const {item, onPress} = props;
  return (
    <TouchableOpacity onPress={onPress}>
      <SectionComponent
        styles={{
          backgroundColor: item.isRead ? appColors.whiteBg : appColors.white,
        }}>
        <RowComponent styles={{justifyContent: 'space-between'}}>
          <RowComponent>
            <ShapeComponent size={55} color={appColors.purple2}>
              <MaterialIcons
                name="payment"
                size={25}
                color={appColors.primary}
              />
            </ShapeComponent>
            <SpaceComponent width={10} />
            <View>
              <TextComponent text={item.title} title size={20} />
              <SpaceComponent height={5} />
              <TextComponent text="20 Dec, 2024 | 20:49 PM" />
            </View>
          </RowComponent>
          {item.isRead ? (
            <></>
          ) : (
            <View
              style={{
                width: 7,
                height: 7,
                backgroundColor: appColors.primary,
                borderRadius: 100,
              }}
            />
          )}
        </RowComponent>
        <SpaceComponent height={15} />
        <TextComponent text={item.body} />
      </SectionComponent>
    </TouchableOpacity>
  );
};

export default NotificationItem;
