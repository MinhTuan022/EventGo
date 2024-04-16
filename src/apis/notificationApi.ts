import { appInfo } from '../utils/constants/appInfos';
import axiosClient from "./axiosClient"

class NotificationAPI{
   HandleNotification = async(
      url: string,
      data?: any,
      method?: 'get' | 'post' | 'put' | 'delete',
   ) =>{
      return await axiosClient(`/notification${url}`, {
         method: method ?? 'get',
         data,
      });
   }
}

const notificationAPI = new NotificationAPI();

export default notificationAPI;