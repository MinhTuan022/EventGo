import {View, Text, Image} from 'react-native';
import React from 'react';
import {
  ButtonComponent,
  RowComponent,
  SectionComponent,
  TextComponent,
} from '../../components';
import {Location} from 'iconsax-react-native';
import {appColors} from '../../utils/constants/appColors';

interface Props {
  item: any;
}
const TicketComponent = (props: Props) => {
  const {item} = props;
  return (
    <>
      <View
        style={{
          backgroundColor: '#F6F6F6',
          marginHorizontal: 16,
          marginVertical: 8,
          borderRadius: 12,
          padding: 15,
        }}>
        <RowComponent>
          <View
            style={{
              backgroundColor: 'coral',
              height: 110,
              borderRadius: 12,
              width: '30%',
              // padding: 15,
            }}>
            <Image
              source={require('../../assets/images/luffi.jpg')}
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
            <TextComponent text={item.eventId.title} />
            <TextComponent text={item.eventId.startTime} />
            <RowComponent>
              <Location size={16} color={appColors.primary} />
              <TextComponent
                text={item.eventId.location}
                styles={{flex: 1, paddingHorizontal: 2}}
              />
              <View
                style={{
                  padding: 4,
                  borderWidth: 1,
                  borderColor: item.status === 'Completed' ? 'green' : 'red',
                  borderRadius: 5,
                }}>
                <TextComponent text={item.status} color={item.status === 'Completed' ? 'green' : 'red'} />
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
              <ButtonComponent
                styles={{
                  flex: 1,
                  paddingVertical: 8,
                  borderColor: appColors.primary,
                  borderWidth: 1,
                }}
                text="Hihi"
                type="primary"
                textColor={appColors.primary}
                color={appColors.white}
              />
              <ButtonComponent
                styles={{flex: 1, paddingVertical: 8}}
                text="View E-Ticket"
                type="primary"
              />
            </RowComponent>
          </>
        )}
      </View>
    </>
  );
};

export default TicketComponent;
