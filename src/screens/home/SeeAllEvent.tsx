import { View, Text, StatusBar, TouchableOpacity } from 'react-native'
import React from 'react'
import { globalStyles } from '../../styles/globalStyles'
import { HeaderComponent, RowComponent, SectionComponent, SpaceComponent, TextComponent } from '../../components'
import { ArrowLeft } from 'iconsax-react-native'
import { fontFamilies } from '../../utils/constants/fontFamilies'

const SeeAllEvent = ({navigation}:any) => {
  return (
    <View style={[globalStyles.container, {paddingTop:StatusBar.currentHeight}]}>
      <HeaderComponent goBack title='Upcomming'/>
    </View>
  )
}

export default SeeAllEvent