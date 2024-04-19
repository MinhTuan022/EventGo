import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {ButtonComponent, RowComponent, TextComponent} from '.';
import {appColors} from '../utils/constants/appColors';
import {fontFamilies} from '../utils/constants/fontFamilies';
import {useFocusEffect} from '@react-navigation/native';
import userAPI from '../apis/userApi';
import {useSelector} from 'react-redux';
import {AuthState, authSelector} from '../redux/reducers/authReducer';

interface Props {
  item: any;
  invite?: boolean;
  onPress?: () => void;
  onPressProfile?: () => void;
}

const FollowList = (props: Props) => {
  const {item, invite, onPress, onPressProfile} = props;
  const auth: AuthState = useSelector(authSelector);
  const [userId, setUserId] = useState(auth.id);
  const [relationship, setRelationship] = useState('');
  useFocusEffect(
    React.useCallback(() => {
      if (item) {
        checkRelationship(item.organizer);
      }
    }, [item]),
  );
  const checkRelationship = async (targetId: any) => {
    try {
      const res = await userAPI.HandleUser(
        `/check-relationship?userId=${userId}&targetUserId=${item._id}`,
      );
      setRelationship(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleFollow = async () => {
    try {
      const targetUserId = item._id;
      // const userId = auth.id;
      const res = await userAPI.HandleUser(
        '/follow',
        {userId, targetUserId},
        'post',
      );
      // console.log(res);
      if (relationship === 'following') {
        setRelationship('none');
      } else if (relationship === 'friend') {
        setRelationship('follower');
      } else if (relationship === 'follower') {
        setRelationship('friend');
      } else if (relationship === 'none') {
        setRelationship('following');
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={{marginBottom: 20}}>
      <RowComponent
        styles={{justifyContent: 'space-between'}}
        onPress={userId !== item._id ? onPressProfile: undefined}>
        <RowComponent>
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
            <TextComponent text={`${item.followers.length} Người theo dõi`} />
          </View>
        </RowComponent>

        {userId !== item._id ? (
          <>
            {!invite ? (
              <TouchableOpacity
                onPress={handleFollow}
                style={{
                  borderRadius: 12,
                  paddingHorizontal: 20,
                  paddingVertical: 8,
                  borderWidth: 1,
                  borderColor: appColors.primary,
                  backgroundColor:
                    relationship === 'following'
                      ? appColors.purple2
                      : relationship === 'friend'
                      ? appColors.purple2
                      : appColors.primary,
                }}>
                {relationship && relationship === 'friend' ? (
                  <TextComponent text="Bạn bè" color={appColors.primary} />
                ) : relationship === 'following' ? (
                  <TextComponent text="Đang theo dõi" color={appColors.primary} />
                ) : relationship === 'follower' ? (
                  <TextComponent text="Theo dõi Lại" color={appColors.white} />
                ) : (
                  <TextComponent text="Theo dõi" color={appColors.white} />
                )}
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={onPress}
                style={{
                  borderRadius: 12,
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  backgroundColor: appColors.primary,
                }}>
                <TextComponent
                  text="Invite"
                  color={appColors.white}
                  font={fontFamilies.medium}
                />
              </TouchableOpacity>
            )}
          </>
        ) : (
          <TextComponent text="Bạn" />
        )}
      </RowComponent>
    </View>
  );
};

export default FollowList;
