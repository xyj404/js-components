import axios from 'axios';
import { message as Message } from 'antd';
import storage from './storage';

export const baseURL = 'https://yapi.parsec.com.cn/mock/338';

const instance = axios.create({
  baseURL,
  timeout: 10000
});

instance.interceptors.response.use(
  response => {
    const {
      data: { code = 0, message = '' }
    } = response;
    if (code !== 0 && code !== 200) {
      Message.error(message + '');
      return Promise.reject(response);
    }
    return response;
  },
  async (error = {}) => {
    if (error.toString().includes('timeout')) {
      Message.error('请求超时');
    }
    const {
      response,
      response: { data: { message = '' } = {}, status = 200 } = {}
    } = error;
    if ([401, 403].includes(status)) {
      storage.clear();
    }
    if (message) {
      Message.error(message + '');
    }
    return Promise.reject(response);
  }
);

const filter = (obj) => {
  if (obj) {
    Object.keys(obj).forEach(key => {
      if (['', undefined, []].includes(obj[key])) {
        delete obj[key];
      }
    });
  }
  return obj;
};

instance.interceptors.request.use(config => {
  config.headers.token = storage.get('token');
  config.params = filter(config.params);
  config.data = filter(config.data);
  return config;
});

export default instance;
