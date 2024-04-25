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
  onSelectCategory: (selectedCategories: string[]) => void;
  grid?: boolean;
  allowMultiple?: boolean;
}
const CategoriesList = ({onSelectCategory, grid, allowMultiple}: CategoriesListProps) => {
  // const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const size = 20;
  let categories = [
    // {
    //   key: '',
    //   title: 'Tất cả',
    //   icon: <MemoDone width={size} height={size} />,
    // },
    {
      key: 'Thể Thao',
      title: 'Thể Thao',
      icon: <MemoSports width={size} height={size} />,
    },
    {
      key: 'Âm Nhạc',
      title: 'Âm Nhạc',
      icon: <MemoMusic width={size} height={size} />,
    },
    {
      key: 'Ẩm Thực',
      title: 'Ẩm Thực',
      icon: <MemoFood width={size} height={size} />,
    },
    {
      key: 'Mĩ Thuật',
      title: 'Mĩ Thuật',
      icon: <MemoArt width={size} height={size} />,
    },
    {
      key: 'Công Nghệ',
      title: 'Công Nghệ',
      icon: <MemoArt width={size} height={size} />,
    },
  ];
  if ( !allowMultiple) {
    categories = [{ key: '', title: 'Tất cả', icon: <MemoDone width={size} height={size} /> }, ...categories];
  }
  // const handleCategoryPress = (key: string) => {
  //   setSelectedCategory(key);
  //   onSelectCategory(key); // Call the callback function with the selected key
  // };
  const toggleCategory = (key: string) => {
    if (!allowMultiple) {
      setSelectedCategories([key]);
      onSelectCategory([key]); 
    } else {
      const index = selectedCategories.indexOf(key);
      if (index !== -1) {
        setSelectedCategories(selectedCategories.filter(cat => cat !== key));
      } else {
        setSelectedCategories([...selectedCategories, key]);
      }
      onSelectCategory(selectedCategories);
    }
  };
  return (
    <View style={{}}>
      <FlatList
        horizontal={!grid ? true : false}
        numColumns={grid ? 3 : undefined}
        data={categories}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <RowComponent
            onPress={() => {
              // handleCategoryPress(item.key);
              toggleCategory(item.key);
            }}
            styles={{
              // flex:1,
              paddingHorizontal: grid ? 18 : 20,
              paddingVertical:grid ? 7 : 10,
              backgroundColor: selectedCategories.includes(item.key) ? appColors.primary : appColors.white,
              borderRadius: 100,
              borderWidth: 1,
              borderColor: appColors.primary,
              marginRight: 12,
              marginBottom: grid ? 5 : 0
            }}>
            {item.icon}
            <TextComponent
              styles={{paddingLeft: 8}}
              font={fontFamilies.medium}
              color={selectedCategories.includes(item.key) ? appColors.white :appColors.primary}
              text={item.title}
              size={grid ? 10 : 14}
            />
          </RowComponent>
        )}
      />
    </View>
  );
};

export default CategoriesList;
