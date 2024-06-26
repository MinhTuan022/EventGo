import {StyleSheet} from 'react-native';
import {appColors} from '../utils/constants/appColors';
import {fontFamilies} from '../utils/constants/fontFamilies';
import { rgbaColor } from 'react-native-reanimated/lib/typescript/reanimated2/Colors';

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.white,
  },
  section: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },

  text: {
    fontFamily: fontFamilies.regular,
    fontSize: 14,
    color: appColors.text,
  },

  button: {
    borderRadius: 12,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },

  shadow: {
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.25,
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowRadius: 8,
    elevation: 6,
  },

  inputContainer: {
    // backgroundColor:'red',
    borderRadius: 12,
    flexDirection: 'row',
    borderColor: appColors.gray2,
    borderWidth: 1,
    minHeight: 56,
    // paddingVertical:14,
    justifyContent: 'center',
    paddingHorizontal: 15,
    alignItems: 'center',
    // width: '100%',
    // marginBottom: 19,
    // flex:1
// height:100
  },

  input: {
    // margin: 0,
    // padding: 0,
    flex: 1,
    // paddingHorizontal: 14,

    // backgroundColor:'red',
    // backgroundColor:"coral",
    // height:100
  },

  row: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
  },
  card: {
   padding: 12,
   borderRadius: 12,
   backgroundColor: appColors.white,
   margin: 12,
 },
});
