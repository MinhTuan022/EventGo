import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleProp,
  ViewStyle,
} from 'react-native';
import React, {ReactNode} from 'react';
import SectionComponent from './SectionComponent';
import RowComponent from './RowComponent';
import {ArrowLeft} from 'iconsax-react-native';
import SpaceComponent from './SpaceComponent';
import TextComponent from './TextComponent';
import {fontFamilies} from '../utils/constants/fontFamilies';
import { useNavigation } from '@react-navigation/native';

interface Props {
  onPress?: () => void;
  goBack?: boolean;
  title: string;
  children?: ReactNode;
  styles?: StyleProp<ViewStyle>;
}
const HeaderComponent = (props: Props) => {
  const {onPress, goBack, title, children, styles} = props;
  const navigation: any = useNavigation();
  return (
    <View>
      <SectionComponent>
        <RowComponent styles={styles}>
          <RowComponent>
            {goBack ? (
              <TouchableOpacity onPress={onPress ? onPress : () => navigation.goBack()}>
                <ArrowLeft size={22} color="black" />
              </TouchableOpacity>
            ) : (
              // <View>
              <Image
                source={require('../assets/logo/Logo.png')}
                style={{
                  width: 27,
                  height: 28,
                }}
                resizeMode="cover"
              />
              // </View>
            )}
            <SpaceComponent width={10} />
            <TextComponent text={title} size={20} font={fontFamilies.medium} />
          </RowComponent>

          {children ?? children}
        </RowComponent>
      </SectionComponent>
    </View>
  );
};

export default HeaderComponent;
