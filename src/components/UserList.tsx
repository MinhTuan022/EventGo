import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {ButtonComponent, RowComponent, TextComponent} from '.';
import {appColors} from '../utils/constants/appColors';
import {fontFamilies} from '../utils/constants/fontFamilies';

interface Props {
  item: any;
  invite?: boolean;
  onPress?: () => void;
}

const FollowList = (props: Props) => {
  const {item, invite, onPress} = props;

  return (
    <View style={{marginBottom: 20}}>
      <RowComponent styles={{justifyContent: 'space-between'}}>
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
            <TextComponent text={`${item.followers.length} Followers`} />
          </View>
        </RowComponent>

        {!invite ? (
          <TouchableOpacity
            onPress={onPress}
            style={{
              borderRadius: 12,
              paddingHorizontal: 20,
              paddingVertical: 8,
              borderWidth: 1,
              borderColor: appColors.primary,
            }}>
            <TextComponent text="Follow" />
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
      </RowComponent>
    </View>
  );
};

export default FollowList;
