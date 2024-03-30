
import axiosClient from "./axiosClient"

class TicketAPI{
   HandleTicket = async(
      url: string,
      data?: any,
      method?: 'get' | 'post' | 'put' | 'delete',
   ) =>{
      return await axiosClient(`/ticket${url}`, {
         method: method ?? 'get',
         data,
      });
   }
}

const ticketAPI = new TicketAPI();

export default ticketAPI;