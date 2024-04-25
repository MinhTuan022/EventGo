import {View, Text, StatusBar, Image, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {globalStyles} from '../../styles/globalStyles';
import {
  HeaderComponent,
  RowComponent,
  SectionComponent,
  TextComponent,
} from '../../components';
import userAPI from '../../apis/userApi';
import {AuthState, authSelector} from '../../redux/reducers/authReducer';
import {useSelector} from 'react-redux';

const FollowingScreen = ({route, navigation}: any) => {
  const {ids} = route.params;
  const [followings, setFollowings] = useState();

  useEffect(() => {
    if (ids) {
      getFollowing();
    }
  }, [ids]);
  const getFollowing = async () => {
    try {
      const res = await userAPI.HandleUser(`/following?ids=${ids}`);
      setFollowings(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View
      style={[globalStyles.container, {paddingTop: StatusBar.currentHeight}]}>
      <HeaderComponent title="Đang theo dõi" goBack />
      <FlatList
        data={followings}
        renderItem={({item, index}) => (
          <SectionComponent>
            <View style={{marginBottom: 20}}>
              <RowComponent
                styles={{justifyContent: 'space-between'}}
                onPress={() => {}}>
                <RowComponent
                  onPress={() => {
                    navigation.navigate('ProfileOganizer', {
                      profiledata: item._id,
                    });
                  }}>
                  <Image
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 100,
                      marginRight: 10,
                    }}
                    source={{uri: item.photo}}
                  />
                  <View>
                    <TextComponent text={item.name} title size={18} />
                    <TextComponent
                      text={`${item.followers.length} Người theo dõi`}
                    />
                  </View>
                </RowComponent>
              </RowComponent>
            </View>
          </SectionComponent>
        )}></FlatList>
    </View>
  );
};

export default FollowingScreen;
