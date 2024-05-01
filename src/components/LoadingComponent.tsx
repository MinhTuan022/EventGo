import {ActivityIndicator, Image, StyleProp, StyleSheet, TextStyle, View} from 'react-native';
import TextComponent from './TextComponent';
import {  ReactNode } from 'react';

interface Props {
  isLoading: boolean;
  values: number;
  children?:ReactNode
  mess?: string;
  styles?:StyleProp<TextStyle>
  textStyle?:StyleProp<TextStyle>

}

const LoadingComponent = (props: Props) => {
  const {isLoading, values, mess, children, styles, textStyle} = props;

  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        flex:1
        // padding: 20,
      }}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        values === 0 && (
          <View
            style={[{flex: 1, justifyContent: 'center', alignItems: 'center'}, styles]}>
            {children ?? children}
            <TextComponent text={mess ?? "Không có dữ liệu"} title size={18} styles={textStyle}/>
          </View>
        )
      )}
    </View>
  );
};

export default LoadingComponent;
