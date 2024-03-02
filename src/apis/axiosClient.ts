import axios from 'axios';
import queryString from 'query-string';

const axiosClient = axios.create({
  paramsSerializer: params => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config: any) => {
  config.headers = {
    Authorization: '',
    Accept: 'application/json',
    ...config.headers,
  };

  config.data;

  return config;
});

axiosClient.interceptors.response.use(
  res => {
    if (res.data && res.status === 200) {
      return res.data;
    }
    throw new Error('Error');
    return res;
  },
  error => {
    // console.log(`Error api ${JSON.stringify(error)}`);
    // throw new Error(error.response);
    if (error.response) {
      // Có phản hồi từ server với mã lỗi HTTP
      const {status, data} = error.response;
      return Promise.reject({
        status,
        message: data.message || 'Có lỗi từ server',
      });
    } else if (error.request) {
      // Yêu cầu được gửi nhưng không nhận được phản hồi
      return Promise.reject({
        status: 500,
        message: 'Không nhận được phản hồi từ server',
      });
    } else {
      // Có lỗi xảy ra khi thiết lập yêu cầu
      return Promise.reject({status: 500, message: error.message});
    }
  },
);

export default axiosClient;
