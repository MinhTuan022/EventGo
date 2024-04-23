import { Dimensions } from "react-native";

export const appInfo ={
   sizes: {
      WIDTH: Dimensions.get('window').width,
      HEIGHT: Dimensions.get('window').height,
   },
   BASE_URL: 'http://192.168.1.102:3001',
   monthNames: [
    'Tháng 1',
    'Tháng 2',
    'Tháng 3',
    'Tháng 4',
    'Tháng 5',
    'Tháng 6',
    'Tháng 7',
    'Tháng 8',
    'Tháng 9',
    'Tháng 10',
    'Tháng 11',
    'Tháng 12',
  ],


  API_KEY_REVGEOCODE: "z1iOem3CvM7AZ_dXCpGfefoyNKUM_eO0urd3SzlmeiM"

}