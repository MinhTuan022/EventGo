import { Dimensions } from "react-native";

export const appInfo ={
   sizes: {
      WIDTH: Dimensions.get('window').width,
      HEIGHT: Dimensions.get('window').height,
   },
   BASE_URL: 'http://192.168.76.235:3001',
   monthNames: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],


  API_KEY_REVGEOCODE: "z1iOem3CvM7AZ_dXCpGfefoyNKUM_eO0urd3SzlmeiM"

}