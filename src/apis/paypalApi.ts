
import axiosClient from "./axiosClient"

class PaypalApi{
   HandlePaypal = async(
      url: string,
      data?: any,
      method?: 'get' | 'post' | 'put' | 'delete',
   ) =>{
      return await axiosClient(`/paypal${url}`, {
         method: method ?? 'get',
         data,
      });
   }
}

const paypalApi = new PaypalApi();

export default paypalApi;