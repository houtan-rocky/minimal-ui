/* eslint-disable import/no-extraneous-dependencies */
import { http, HttpResponse } from 'msw';

import { endpoints } from 'src/utils/axios.util';

import {
  ErrorScenarioConfig,
  handleCommonErrorScenarios,
} from '../../utils/handle-common-errors.util';

// ---------------------- CONSTANTS ------------------------------------------------
const MOCK_LOGIN_API_ACCESS_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE4OTM0NTYwMDAsInVzZXIiOiJleGFtcGxlX3VzZXIifQ.UywE7SiVKaTs93c1-yF1zPA8TjznF-l0VJoQ8IqU_hY';
export const MOCK_LOGIN_API_REQUEST_VALID = {
  email: 'demo@minimals.cc',
  password: 'demo1234',
};
export const MOCK_LOGIN_API_REQUEST_INVALID = {
  email: '',
  password: '',
};
const MOCK_LOGIN_API_RESPONSE_HAS_2FA = {
  message: 'کد بازیابی به شماره موبایل شما ارسال شد',
  status: 'ok',
  user: {
    email: MOCK_LOGIN_API_REQUEST_VALID.email,
    display_name: 'Demo User',
    time: 30,
    mobile_number: '09123456789',
    photo_url: '/static/mock-images/avatars/avatar_default.jpg',
    role: 'admin',
  },
  has2fa: true,
} as const;
export const MOCK_LOGIN_API_RESPONSE_VALID = {
  access_token: MOCK_LOGIN_API_ACCESS_TOKEN,
  message: 'Logged In',
  status: 'ok',
  user: {
    email: MOCK_LOGIN_API_REQUEST_VALID.email,
    display_name: 'Demo User',
    mobile_number: '09123456789',
    time: 30,
    photo_url: '/static/mock-images/avatars/avatar_default.jpg',
    role: 'admin',
  },
};
export const MOCK_LOGIN_API_RESPONSE_INVALID = {
  message: 'نام کاربری یا رمز عبور اشتباه است',
};
// ------------------------ Types ----------------------------------------------

type MockLoginApiParams = {};

type MockLoginApiRequestBody = {
  email: string;
  password: string;
};

type MockLoginApiResponseBody = {
  access_token?: MockLoginApiAccessToken;
  message: string;
  has2fA?: boolean;
  phone_number: string;
  status: string;
  time: number;
  user?: {
    email: string;
    display_name: string;
    photo_url: string;
    role: string;
  };
};
type MockLoginApiAccessToken = string;

// ------------------------ Handlers ----------------------------------------------

export const mockLoginApi = http.post<
  MockLoginApiParams,
  MockLoginApiRequestBody,
  MockLoginApiResponseBody
>(endpoints.auth.login, async ({ params, request }) => {
  const pageParams = new URLSearchParams(window.location.search);
  const scenario = pageParams.get('scenario') as any;

  // -------------------- Error scenarios --------------------------------------
  const errorScenarios: ErrorScenarioConfig[] = [
    {
      scenario: 'error',
      response: MOCK_LOGIN_API_RESPONSE_INVALID,
      responseStatus: { status: 401, statusText: 'Unauthorized' },
    },
    {
      scenario: 'has2fa',
      response: MOCK_LOGIN_API_RESPONSE_HAS_2FA,
      responseStatus: { status: 200, statusText: 'OK' },
    },
  ];

  const commonErrorResponse = handleCommonErrorScenarios(scenario, errorScenarios);

  if (commonErrorResponse !== null) {
    return commonErrorResponse;
  }

  // ----------------------Success scenarios-------------------------------------
  if (scenario === 'has2fa') {
    return HttpResponse.json(MOCK_LOGIN_API_RESPONSE_HAS_2FA);
  }
  return HttpResponse.json(MOCK_LOGIN_API_RESPONSE_VALID);
});
