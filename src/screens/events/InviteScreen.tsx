import { View, Text, StatusBar, FlatList } from 'react-native'
import React from 'react'
import { globalStyles } from '../../styles/globalStyles'
import { HeaderComponent, SectionComponent, TextComponent, UserList } from '../../components'
import { appColors } from '../../utils/constants/appColors'

const InviteScreen = ({route, navigation}:any) => {
  const {friend} = route.params
  console.log(friend)
  return (
    <View style={[globalStyles.container, {paddingTop: StatusBar.currentHeight}]}>
      <HeaderComponent title='Mời bạn bè' goBack/>
      {friend.length > 0 ? (
        <SectionComponent>
          <FlatList
            data={friend}
            renderItem={({item, index}) => (
              <UserList invite
                item={item}
                key={index}
                onPressProfile={() => {
                  navigation.navigate('ProfileNavigator', {
                    profiledata: item,
                  });
                }}
              />
            )}></FlatList>
        </SectionComponent>
      ) : (
        <View style={{alignItems: 'center', flex: 1}}>
          <TextComponent
            text="Chưa có ai tham gia sự kiện này"
            color={appColors.gray2}
            title
            size={18}
          />
        </View>
      )}
    </View>
  )
}

export default InviteScreen