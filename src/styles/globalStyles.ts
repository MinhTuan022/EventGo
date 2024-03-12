import {StyleSheet} from 'react-native';
import {appColors} from '../constants/appColors';
import {fontFamilies} from '../constants/fontFamilies';
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
    borderRadius: 12,
    flexDirection: 'row',
    borderColor: appColors.gray2,
    borderWidth: 1,
    minHeight: 56,
    justifyContent: 'center',
    paddingHorizontal: 15,
    alignItems: 'center',
    // width: '100%',
    marginTop: 19,

  },

  input: {
    margin: 0,
    padding: 0,
    flex: 1,
    paddingHorizontal: 14,

    
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
