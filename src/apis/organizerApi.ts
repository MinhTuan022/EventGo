import { appInfo } from '../utils/constants/appInfos';
import axiosClient from "./axiosClient"

class OrganizerAPI{
   HandleOrganizer = async(
      url: string,
      data?: any,
      method?: 'get' | 'post' | 'put' | 'delete',
   ) =>{
      return await axiosClient(`/organizer${url}`, {
         method: method ?? 'get',
         data,
      });
   }
}

const organizerAPI = new OrganizerAPI();

export default organizerAPI;