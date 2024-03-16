import {View, Text, Image, ScrollView, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {globalStyles} from '../../styles/globalStyles';
import {
  CardComponent,
  RowComponent,
  SectionComponent,
  TextComponent,
} from '../../components';
import {appColors} from '../../utils/constants/appColors';
import {fontFamilies} from '../../utils/constants/fontFamilies';
import {useSelector} from 'react-redux';
import {authSelector} from '../../redux/reducers/authReducer';
import userAPI from '../../apis/userApi';

const EventComponrnt = () => {
  const user = useSelector(authSelector);
  const [eventUser, setEventUser] = useState<any>();
  // console.log(user)
  const userId = user.id;
  useEffect(() => {
    console.log(user.id);
    const hanndleUserEvent = async () => {
      try {
        const res = await userAPI.HandleUser(`/${userId}`);
        setEventUser(res.data.events);
        // console.log(eventUser.length);
        // console.log(eventDetail);
      } catch (error) {
        console.log(error);
      }
    };
    hanndleUserEvent();
  }, [userId]);

  return (
    <View style={globalStyles.container}>
      <SectionComponent>
        
          {/* <CardComponent>
            <RowComponent>
              <Image
                source={require('../../assets/images/luffi.jpg')}
                style={{width: 60, height: 80, borderRadius: 12}}
              />
              <View style={{flex: 1, marginLeft: 20}}>
                <TextComponent
                  text="1ST MAY-SAT -2:00 PM"
                  color={appColors.primary}
                  size={12}
                  font={fontFamilies.medium}
                />
                <TextComponent
                  text="A virtual evening of smooth jazz"
                  title
                  size={19}
                />
              </View>
            </RowComponent>
          </CardComponent> */}


          <FlatList
            data={eventUser}
            renderItem={({item, index}) => (
              <CardComponent key={index}>
                <RowComponent>
                  <Image
                    source={{uri: item.photoUrl}}
                    style={{width: 80, height: 80, borderRadius: 12}}
                  />
                  <View style={{flex: 1, marginLeft: 20}}>
                    <TextComponent
                      text="1ST MAY-SAT -2:00 PM"
                      color={appColors.primary}
                      size={12}
                      font={fontFamilies.medium}
                    />
                    <TextComponent
                      text={item.title}
                      title
                      size={19}
                    />
                  </View>
                </RowComponent>
              </CardComponent>
            )}
          />
        
      </SectionComponent>
    </View>
  );
};

export default EventComponrnt;
