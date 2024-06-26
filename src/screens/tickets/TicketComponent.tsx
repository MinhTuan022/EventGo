import {View, Text, Image} from 'react-native';
import React from 'react';
import {
  ButtonComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';
import {Location} from 'iconsax-react-native';
import {appColors} from '../../utils/constants/appColors';
import { DateTime } from '../../utils/convertDateTime';

interface Props {
  item: any;
  onPressCancelled?: () => void;
  onPressView?: () => void;
  onPressReview?: () => void;
  onPayment?: () => void
}
const TicketComponent = (props: Props) => {
  const {item, onPressCancelled, onPressReview, onPressView, onPayment} = props;
  return (
    <>
      <View
        style={{
          backgroundColor: appColors.white,
          marginHorizontal: 16,
          marginVertical: 8,
          borderRadius: 20,
          padding: 15,
          borderWidth:2,
          borderColor:appColors.purple2
        }}>
        <RowComponent>
          <View
            style={{
              backgroundColor: 'coral',
              height: 110,
              borderRadius: 12,
              width: '35%',
              // padding: 15,
            }}>
            <Image
              source={{uri: item.eventId.photoEvent}}
              style={{width: '100%', borderRadius: 12, flex: 1}}
              resizeMode="cover"
            />
          </View>
          <View
            style={{
              // backgroundColor: 'coral',
              height: 110,
              borderRadius: 12,
              flex: 1,
              paddingLeft: 15,
              justifyContent: 'space-around',
            }}>
            <TextComponent text={item.eventId.title} title size={18}/>
            <TextComponent text={`${DateTime.GetDate(item.eventId.startTime)}`} />
            <RowComponent>
              <Location size={16} color={appColors.primary} />
              <TextComponent
                text={item.eventId.address}
                styles={{flex: 1, paddingHorizontal: 2}}
              />
              <View
                style={{
                  padding: 4,
                  borderWidth: 1,
                  borderColor:
                    item.status === 'Completed'
                      ? 'green'
                      : item.status === 'Paid' || item.status === 'Pending'
                      ? appColors.primary
                      : 'red',
                  borderRadius: 7,
                  paddingHorizontal:10
                }}>
                <TextComponent
                size={12}
                  text={item.status}
                  color={
                    item.status === 'Completed'
                      ? 'green'
                      : item.status === 'Paid' || item.status === 'Pending'
                      ? appColors.primary
                      : 'red'
                  }
                />
              </View>
            </RowComponent>
          </View>
        </RowComponent>
        {item.status === 'Completed' && (
          <>
            <View
              style={{
                height: 0.8,
                backgroundColor: appColors.gray2,
                marginVertical: 10,
              }}
            />
            <RowComponent styles={{flex: 1}}>
              {/* <ButtonComponent
                styles={{
                  flex: 1,
                  paddingVertical: 8,
                  borderColor: appColors.primary,
                  borderWidth: 1,
                }}
                text="Leave a Review"
                type="primary"
                textColor={appColors.primary}
                color={appColors.white}
                onPress={onPressReview}
              /> */}
              <ButtonComponent
                styles={{flex: 1, paddingVertical: 8}}
                text="View E-Ticket"
                type="primary"
                onPress={onPressView}
              />
            </RowComponent>
          </>
        )}
        {item.status === 'Paid' && (
          <>
            <View
              style={{
                height: 0.8,
                backgroundColor: appColors.gray2,
                marginVertical: 10,
              }}
            />
            <RowComponent styles={{flex: 1}}>
              <ButtonComponent
                styles={{
                  flex: 1,
                  paddingVertical: 8,
                  borderColor: appColors.primary,
                  borderWidth: 1,
                }}
                text="Hủy Vé"
                type="primary"
                textColor={appColors.primary}
                color={appColors.white}
                textStyle={{fontSize: 14}}
                onPress={onPressCancelled}
              />
              <SpaceComponent width={10} />
              <ButtonComponent
                styles={{flex: 1, paddingVertical: 8}}
                text="Xem E-Ticket"
                type="primary"
                textStyle={{fontSize: 14}}
                onPress={onPressView}
              />
            </RowComponent>
          </>
        )}
        {item.status === 'Pending' && (
          <>
            <View
              style={{
                height: 0.8,
                backgroundColor: appColors.gray2,
                marginVertical: 10,
              }}
            />
            <RowComponent styles={{flex: 1}}>
              <ButtonComponent
                styles={{
                  flex: 1,
                  paddingVertical: 8,
                  borderColor: appColors.primary,
                  borderWidth: 1,
                }}
                text="Hủy vé"
                type="primary"
                textColor={appColors.primary}
                color={appColors.white}
                textStyle={{fontSize: 14}}
                onPress={onPressCancelled}
              />
              <SpaceComponent width={10} />
              <ButtonComponent 
                styles={{flex: 1, paddingVertical: 8}}
                text="Thanh toán"
                type="primary"
                textStyle={{fontSize: 14}}
                onPress={onPayment}
              />
            </RowComponent>
          </>
        )}
      </View>
    </>
  );
};

export default TicketComponent;
