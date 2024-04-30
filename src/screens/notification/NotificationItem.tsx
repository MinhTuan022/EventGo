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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {appColors} from '../../utils/constants/appColors';
import {NotificationModel} from '../../models/NotificationModel';
import {User} from 'iconsax-react-native';
import { DateTime } from '../../utils/convertDateTime';
interface Props {
  item: NotificationModel;
  onPress?: () => void;
}
const NotificationItem = (props: Props) => {
  const {item, onPress} = props;
  const renderIcon = (type: string) => {
    let icon = <></>;
    let size = 25;
    switch (type) {
      case 'payment-success':
        icon = (
          <MaterialIcons name="payment" size={size} color={appColors.primary} />
        );
        break;
      case 'ticket':
        icon = (
          <MaterialCommunityIcons
            name="ticket"
            size={size}
            color={appColors.cam}
          />
        );
        break;
      case 'event':
        icon = <MaterialIcons name="event" size={size} color={'red'} />;
        break;
        case 'create-event':
        icon = <MaterialIcons name="event" size={size} color={appColors.primary} />;
        break;
      case 'follow':
        icon = <User color={'#F0635A'} size={size} />;
        break;
      default:
        icon = <User color={'#F0635A'} size={size} />;
        break;
    }
    return icon;
  };
  return (
    <TouchableOpacity onPress={onPress}>
      <SectionComponent
        styles={{
          backgroundColor: item.isRead ? appColors.whiteBg : appColors.white,
        }}>
        <RowComponent styles={{justifyContent: 'space-between'}}>
          <RowComponent>
            <ShapeComponent size={55} color={appColors.purple2}>
              {renderIcon(item.type)}
            </ShapeComponent>
            <SpaceComponent width={10} />
            <View>
              <TextComponent text={item.title} title size={20} />
              <SpaceComponent height={5} />
              {/* <TextComponent text="20 Dec, 2024 | 20:49 PM" /> */}
              <TextComponent text={`${DateTime.GetDate(item.createdAt)} | ${DateTime.GetTime24h(item.createdAt)}`} />

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
