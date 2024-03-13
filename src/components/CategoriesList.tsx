import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {appColors} from '../utils/constants/appColors';
import {RowComponent, SpaceComponent, TextComponent} from '.';
import {fontFamilies} from '../utils/constants/fontFamilies';

const CategoriesList = () => {
  const size = 20;
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
  ];
  return (
    <View style={{position:'absolute',  bottom:-15}}>

      <FlatList
        style={{paddingHorizontal: 16}}
        horizontal
        data={categories}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <RowComponent
            onPress={() => {}}
            styles={{
              paddingHorizontal: 20,
              paddingVertical: 10,
              backgroundColor: item.iconColor,
              borderRadius: 100,
              marginRight: 12,
            }}>
            {item.icon}
            <TextComponent
              styles={{paddingLeft: 8}}
              font={fontFamilies.medium}
              color="white"
              text={item.title}
            />
          </RowComponent>
        )}
      />
    </View>
  );
};

export default CategoriesList;
