import {View, Text, StatusBar, Image} from 'react-native';
import React from 'react';
import {globalStyles} from '../../styles/globalStyles';
import {appColors} from '../../utils/constants/appColors';
import { ButtonComponent, RowComponent, SectionComponent, ShapeComponent, TextComponent } from '../../components';
import { fontFamilies } from '../../utils/constants/fontFamilies';
import { Filter, Notification, SearchNormal } from 'iconsax-react-native';

const HomeOrganizer = ({navigation}:any) => {
  return (
    <View
      style={[
        globalStyles.container,
        {
          backgroundColor: appColors.white2,
          paddingTop: StatusBar.currentHeight,
        },
      ]}>
      <SectionComponent>
        <RowComponent styles={{justifyContent: 'space-between'}}>
          <RowComponent onPress={() => navigation.openDrawer()}>
            <Image
              source={{uri:
 'https://th.bing.com/th/id/OIP.DxdqBFLVLPcWsjkds8636QHaHf?rs=1&pid=ImgDetMain',
              }}
              style={{
                width: 40,
                height: 40,
                borderRadius: 100,
                marginRight: 8,
              }}
            />
            <View>
              <TextComponent text={"greeting"} />
              <TextComponent
                text={"String(user?.name)"}
                font={fontFamilies.medium}
                size={16}
              />
            </View>
          </RowComponent>
          <ShapeComponent
            styles={{
              backgroundColor: 'white',
              borderColor: appColors.gray2,
              borderWidth: 1,
            }}
            onPress={() => navigation.navigate('NotificationScreen')}>
            <View>
              <Notification size={18} color="black" />
              {/* {isRead && ( */}
                <View
                  style={{
                    backgroundColor: '#02E9FE',
                    width: 6,
                    height: 6,
                    borderRadius: 100,
                    position: 'absolute',
                    top: 1,
                    right: 1,
                  }}></View>
              {/* )} */}
            </View>
          </ShapeComponent>
        </RowComponent>

        {/* <ButtonComponent
          onPress={() => {
            navigation.navigate('SearchScreen');
          }}
          text="Sự kiện nào bạn đang tìm kiếm"
          iconLeft={<SearchNormal size={22} color={appColors.gray2} />}
          iconRight={<Filter size={22} color={appColors.primary} />}
          type="primary"
          styles={{width: '100%', marginTop: 20}}
          color={'#F5F5F5'}
          textColor={appColors.gray2}
        /> */}
      </SectionComponent>
      <SectionComponent>
          <RowComponent
            styles={{
              // marginTop: 40,
              justifyContent: 'space-between',
              // paddingHorizontal: 16,
            }}>
            <TextComponent text="Sự kiện sắp diễn ra" title size={20} />
            <ButtonComponent
              onPress={() =>
                navigation.navigate('SeeAll', {
                  dataType: 'upcomming',
                })
              }
              type="link"
              text="Xem tất cả"
              textColor={appColors.primary}
              textStyle={{fontFamily: fontFamilies.medium}}
            />
          </RowComponent>
        </SectionComponent>
    </View>
  );
};

export default HomeOrganizer;
