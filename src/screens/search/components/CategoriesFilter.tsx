import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {appColors} from '../../../utils/constants/appColors';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {RowComponent, TextComponent} from '../../../components';

const CategoriesFilter = () => {
  const size = 28;
  const categories = [
    {
      key: '1',
      title: 'Sports',
      icon: (
        <MaterialIcons
          name="sports-basketball"
          size={size}
          color={appColors.white}
        />
      ),
      iconColor: '#EE544A',
    },
    {
      key: '2',
      title: 'Music',
      icon: <FontAwesome6 name="music" size={size} color={appColors.white} />,
      iconColor: '#F59762',
    },
    {
      key: '3',
      title: 'Food',
      icon: (
        <MaterialIcons name="fastfood" size={size} color={appColors.white} />
      ),
      iconColor: '#29D697',
    },
    {
      key: '4',
      title: 'Art',
      icon: (
        <MaterialIcons name="fastfood" size={size} color={appColors.white} />
      ),
      iconColor: '#46CDFB',
    },
    {
        key: '5',
        title: 'Art',
        icon: (
          <MaterialIcons name="fastfood" size={size} color={appColors.white} />
        ),
        iconColor: '#46CDFB',
      },
      {
        key: '6',
        title: 'Art',
        icon: (
          <MaterialIcons name="fastfood" size={size} color={appColors.white} />
        ),
        iconColor: '#46CDFB',
      },
      {
        key: '7',
        title: 'Art',
        icon: (
          <MaterialIcons name="fastfood" size={size} color={appColors.white} />
        ),
        iconColor: '#46CDFB',
      },
      {
        key: '8',
        title: 'Art',
        icon: (
          <MaterialIcons name="fastfood" size={size} color={appColors.white} />
        ),
        iconColor: '#46CDFB',
      },
  ];
  return (
    <FlatList
      horizontal
      data={categories}
      showsHorizontalScrollIndicator={false}
      renderItem={({item}) => (
        <View style={{alignItems:'center', justifyContent:'center', marginRight:12}}>
          <TouchableOpacity
            style={{
              paddingHorizontal: 15,
              paddingVertical: 15,
              backgroundColor: item.iconColor,
              borderRadius: 100,
              marginBottom:10
            }}>
            {item.icon}
          </TouchableOpacity>
          <TextComponent text={item.title} />
        </View>
      )}
    />
  );
};

export default CategoriesFilter;
