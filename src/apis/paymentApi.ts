
import axiosClient from "./axiosClient"

class PaymentApi{
   HandlePayment = async(
      url: string,
      data?: any,
      method?: 'get' | 'post' | 'put' | 'delete',
   ) =>{
      return await axiosClient(`/payment${url}`, {
         method: method ?? 'get',
         data,
      });
   }
}

const paymentApi = new PaymentApi();

export default paymentApi;