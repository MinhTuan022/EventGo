import React from 'react';
import {FlatList, Image, View} from 'react-native';
import {
  CardComponent,
  RowComponent,
  SectionComponent,
  TextComponent,
} from '../../components';
import {globalStyles} from '../../styles/globalStyles';
import {appColors} from '../../utils/constants/appColors';
import {fontFamilies} from '../../utils/constants/fontFamilies';

const EventComponrnt = ({navigation, route}: any) => {
  const events = route.params;
  const dataArray: any = Object.values(events);
  console.log(dataArray);
  // const user = useSelector(authSelector);
  // const [eventUser, setEventUser] = useState<any>();
  // // console.log(user)
  // const userId = user.id;
  // useEffect(() => {
  //   // console.log(user.id);
  //   const hanndleUserEvent = async () => {
  //     try {
  //       const res = await userAPI.HandleUser(`/${userId}`);
  //       setEventUser(res.data.events);
  //       // console.log(eventUser.length);
  //       console.log(eventUser);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   hanndleUserEvent();
  // }, [userId]);

  return (
    <View style={globalStyles.container}>
      <SectionComponent styles={{flex:1}}>
        {dataArray.length !== 0 ? (
          <FlatList
            data={dataArray}
            renderItem={({item, index}) => (
              <CardComponent
                key={index}
                onPress={() => navigation.navigate('EventDetail', {item})}>
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
                    <TextComponent text={item.title} title size={19} />
                  </View>
                </RowComponent>
              </CardComponent>
            )}
          />
        ) : (
          <View style={{alignItems:'center', justifyContent:'center', flex:1}}>
            <TextComponent text="Người dùng chưa tạo sự kiện nào" size={18} color={appColors.gray2}/>
          </View>
        )}
      </SectionComponent>
    </View>
  );
};

export default EventComponrnt;
