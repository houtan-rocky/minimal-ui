import axios, { AxiosError, AxiosRequestConfig } from 'axios';

import i18n from 'src/locales/i18n';
import { HOST_API } from 'src/config-global';

// ------------------------ Types and Classes -----------------------------------
interface ApiErrorResponse {
  message?: string;
}

class ApiError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
  }
}
// ----------------------- Utilities --------------------------------------------
// Type guard to check if the error response matches the `ApiErrorResponse` structure
function isErrorWithMessage(error: unknown): error is ApiErrorResponse {
  return (error as ApiErrorResponse).message !== undefined;
}

// ----------------------- Axios Config -----------------------------------------
const axiosInstance = axios.create({ baseURL: HOST_API });

// Setup interceptors to handle responses and errors
axiosInstance.interceptors.response.use(
  (res) => res,
  (error: AxiosError<ApiErrorResponse>) => {
    if (!error.response) {
      // Handle network errors or other errors without a response
      throw new ApiError(i18n.t('errors.network_error'), 0);
    }

    const { status, data } = error.response;
    let message = i18n.t('something_went_wrong'); // Default error message

    // Use the type guard to check for the error message
    if (isErrorWithMessage(data)) {
      message = data.message || i18n.t('something_went_wrong');
    }

    // Map status codes to i18n keys
    const statusMessageKeyMap: Record<number, string> = {
      400: 'errors.bad_request',
      401: 'errors.unauthorized',
      403: 'errors.forbidden',
      404: 'errors.not_found',
      500: 'errors.internal_server_error',
      502: 'errors.bad_gateway',
      503: 'errors.service_unavailable',
      504: 'errors.gateway_timeout',
      429: 'errors.too_many_requests',
      422: 'errors.unprocessable_entity',
      409: 'errors.conflict',
      408: 'errors.request_timeout',
      405: 'errors.method_not_allowed',
    };

    // Use the above defined errors only if there is already no message in the http error
    if (statusMessageKeyMap[status] && !isErrorWithMessage(data)) {
      message = i18n.t(statusMessageKeyMap[status]);
    }

    throw new ApiError(message, status);
  }
);

export default axiosInstance;

// --------------------------- Fetcher -------------------------------------------

export const fetcher = async (args: string | [string, AxiosRequestConfig]) => {
  const [url, config] = Array.isArray(args) ? args : [args, {}];
  const res = await axiosInstance.get(url, { ...config });
  return res.data;
};

// -------------------------- Endpoints --------------------------------------------

export const endpoints = {
  chat: '/api/chat',
  kanban: '/api/kanban',
  calendar: '/api/calendar',
  auth: {
    me: '/api/auth/me',
    login: '/api/auth/login',
    loginVerifyDisable: '/api/auth/login-verify-disable',
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
