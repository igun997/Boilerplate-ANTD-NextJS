import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, ResponseType } from 'axios';
import { notification } from 'antd';
import { storeConfig } from './store.config';
import { setCookie } from 'cookies-next';
import { clearLoggedUser } from '../redux/persists/auth';
import { error, success } from '../constants/messages.constant';
import moment from 'moment';
import { generateSignature } from '../utils/global.util';
import { CURRENT_ENV } from '../constants/http.constant';

const http = (url: string, headers: object = {}, responseType: ResponseType = 'json') => {
  const httpService = axios.create({
    baseURL: url,
    timeout: 20000, //default timeout 20s
    responseType: responseType,
  });

  httpService.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      const state = storeConfig.getState();
      const token = state.auth.token;
      if (config.headers) {
        if (token && !headers.hasOwnProperty('Authorization')) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
      if (config?.headers && CURRENT_ENV === 'production') {
        config.headers.Timestamp = moment().toISOString();
        config.headers.Signature = generateSignature(
          config.url ?? '',
          (config.method ?? '').toUpperCase(),
          config?.headers?.Authorization ?? '',
          config.data ?? '',
          config.headers.Timestamp,
        );
      }
      config.headers = {
        ...config.headers,
        ...headers,
      };
      return config;
    },
    (error: AxiosError) => Promise.reject(error),
  );

  httpService.interceptors.response.use(
    async (res: AxiosResponse) => res,
    async (error: AxiosError) => {
      if (error.response?.status === 401) {
        setCookie('is_login', '0');
        setCookie('token', '');
        storeConfig.dispatch(clearLoggedUser());
        window.location.href = '/';
      }
      return new Promise((resolve, reject) => reject(error));
    },
  );
  return httpService;
};
export const initializeHttp = (
  baseUrl: string | null = null,
  additionalHeader = {},
  isBlob: boolean = false,
) => {
  return http(
    baseUrl ?? '',
    {
      ...additionalHeader,
    },
    isBlob ? 'blob' : 'json',
  );
};

export const runError = (_error: any, title: string | null = null) => {
  const _messages: string[] = _error.response?.data?.messages ?? [];
  const _build_message = _messages.map((message) => error[message] ?? message).join('\n ');
  notification.error({
    message: title ?? 'Permintaan Ditolak',
    description: _messages.length > 0 ? _build_message : 'Terjadi kesalahan',
  });
};

export const runSuccess = (
  _res: { code: number; messages: string[]; data: any },
  title: any = null,
) => {
  const _messages = _res.messages;
  const build_message = _messages.map((_message) => success[_message] ?? _message).join('\n ');
  notification.success({
    message: title ?? 'Permintaan Berhasil',
    description: build_message,
  });
};

export const parseDataResponse = (res: any) => {
  return res.data;
};
export default http;
