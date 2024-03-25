import {View, Text, Image} from 'react-native';
import React from 'react';
import {ButtonComponent, RowComponent, TextComponent} from '.';
import { appColors } from '../utils/constants/appColors';

interface Props {
  item: any;
}

const FollowList = (props: Props) => {
  const {item} = props;

  return (
    <View style={{marginBottom:20}}>
      <RowComponent styles={{justifyContent:'space-between'}}>
        <RowComponent>
          <Image style={{
              width: 50,
              height: 50,
              borderRadius: 100,
              marginRight:10
            }} source={{uri: item.photo}} />
            <View>
            <TextComponent text={item.name} title size={18}/>
              <TextComponent text={`${item.followers.length} Followers`}/>
            </View>
        </RowComponent>
        <ButtonComponent text='Follow' color={appColors.primary}/>
      </RowComponent>
    </View>
  );
};

export default FollowList;
