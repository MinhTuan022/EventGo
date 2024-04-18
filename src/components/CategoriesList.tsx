import React, {useState} from 'react';
import {FlatList, View} from 'react-native';
import {RowComponent, TextComponent} from '.';
import MemoArt from '../assets/svg/Art';
import MemoFood from '../assets/svg/Food';
import MemoMusic from '../assets/svg/Music';
import MemoSports from '../assets/svg/Sports';
import {appColors} from '../utils/constants/appColors';
import {fontFamilies} from '../utils/constants/fontFamilies';
import MemoDone from '../assets/svg/Done';

interface CategoriesListProps {
  onSelectCategory: (key: string) => void;
}
const CategoriesList = ({onSelectCategory}: CategoriesListProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const size = 20;
  const categories = [
    {
      key: '',
      title: 'Tất cả',
      icon: <MemoDone width={size} height={size} />,
    },
    {
      key: 'Sports',
      title: 'Thể Thao',
      icon: <MemoSports width={size} height={size} />,
    },
    {
      key: 'Music',
      title: 'Âm Nhạc',
      icon: <MemoMusic width={size} height={size} />,
    },
    {
      key: 'Food',
      title: 'Ẩm Thực',
      icon: <MemoFood width={size} height={size} />,
    },
    {
      key: 'Art',
      title: 'Mĩ Thuật',
      icon: <MemoArt width={size} height={size} />,
    },
  ];
  const handleCategoryPress = (key: string) => {
    setSelectedCategory(key);
    onSelectCategory(key); // Call the callback function with the selected key
  };
  return (
    <View style={{}}>
      <FlatList
        horizontal
        data={categories}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <RowComponent
            onPress={() => {
              handleCategoryPress(item.key);
            }}
            styles={{
              paddingHorizontal: 20,
              paddingVertical: 10,
              backgroundColor: item.key === selectedCategory ? appColors.primary : appColors.white,
              borderRadius: 100,
              borderWidth: 1,
              borderColor: appColors.primary,
              marginRight: 12,
            }}>
            {item.icon}
            <TextComponent
              styles={{paddingLeft: 8}}
              font={fontFamilies.medium}
              color={item.key === selectedCategory ? appColors.white :appColors.primary}
              text={item.title}
            />
          </RowComponent>
        )}
      />
    </View>
  );
};

export default CategoriesList;
