import { StyleSheet } from "react-native";
import { appColors } from "../constants/appColors";
import { fontFamilies } from "../constants/fontFamilies";

export const globalStyles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: appColors.white,
   },

   text:{
      fontFamily: fontFamilies.regular,
      fontSize: 14,
      color: appColors.text,
   },

   button: {
      borderRadius: 12,
      justifyContent: 'center',
      alignContent: 'center',
      backgroundColor: appColors.white,
      paddingHorizontal: 16,
      paddingVertical: 16,
      minHeight: 56,
      flexDirection: 'row'
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
      width: '100%',
      marginBottom: 19,
   },

   input: {
      margin: 0,
      padding: 0,
      flex: 1,
      paddingHorizontal: 14,
   }
})