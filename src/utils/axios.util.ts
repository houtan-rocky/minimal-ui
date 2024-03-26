import axios, { AxiosRequestConfig } from 'axios';

import i18n from 'src/locales/i18n';
import { HOST_API } from 'src/config-global';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: HOST_API });

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => {
    throw new Error(error.response.data.message || i18n.t('something_went_wrong'));
  }
  // Promise.reject((error.response && error.response.data) || i18n.t('something_went_wrong'))
);

export default axiosInstance;

// ----------------------------------------------------------------------

export const fetcher = async (args: string | [string, AxiosRequestConfig]) => {
  const [url, config] = Array.isArray(args) ? args : [args];

  const res = await axiosInstance.get(url, { ...config });

  return res.data;
};

// ----------------------------------------------------------------------

export const endpoints = {
  chat: '/api/chat',
  kanban: '/api/kanban',
  calendar: '/api/calendar',
  auth: {
    me: '/api/auth/me',
    login: '/api/auth/login',
    register: '/api/auth/register',
    verifyRegister: '/api/auth/register-verify',
    forgetPassword: '/api/auth/forget-password',
    verify: '/api/auth/verify',
    verifyLogin: '/api/auth/verify-login',
    newPassword: '/api/auth/new-password',
    registerSetUsernamePassword: '/api/auth/register-set-username-password',
  },
  users: {
    getActiveBrokers: (userId?: string) => {
      if (userId) return `/api/users/${userId}/brokers/active`;
      return `/api/users/*/brokers/active`;
    },
    getAvailableBrokers: (userId?: string) => {
      if (userId) return `/api/users/${userId}/brokers/available`;
      return `/api/users/*/brokers/available`;
    },
  },
  mail: {
    list: '/api/mail/list',
    details: '/api/mail/details',
    labels: '/api/mail/labels',
  },
  post: {
    list: '/api/post/list',
    details: '/api/post/details',
    latest: '/api/post/latest',
    search: '/api/post/search',
  },
  product: {
    list: '/api/product/list',
    details: '/api/product/details',
    search: '/api/product/search',
  },
};
