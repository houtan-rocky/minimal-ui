/* eslint-disable import/no-extraneous-dependencies */
import { http, HttpResponse } from 'msw';

import { endpoints } from 'src/utils/axios.util';

import {
  ErrorScenarioConfig,
  CommonErrorScenarios,
  handleCommonErrorScenarios,
} from '../../utils/handle-common-errors.util';

// ----------------------CONSTANTS------------------------------------------------
const MOCK_LOGIN_API_ACCESS_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE4OTM0NTYwMDAsInVzZXIiOiJleGFtcGxlX3VzZXIifQ.UywE7SiVKaTs93c1-yF1zPA8TjznF-l0VJoQ8IqU_hY';

export const MOCK_LOGIN_DISABLE_VERIFY_API_REQUEST_VALID = {
  email: 'demo@minimals.cc',
  password: 'demo1234',
};
const MOCK_LOGIN_DISABLE_VERIFY_API_RESPONSE_VALID = {
  access_token: MOCK_LOGIN_API_ACCESS_TOKEN,
  message: 'Logged In',
  status: 'ok',
  user: {
    email: MOCK_LOGIN_DISABLE_VERIFY_API_REQUEST_VALID.email,
    display_name: 'Demo User',
    phone_number: '09123456789',
    photo_url: '/static/mock-images/avatars/avatar_default.jpg',
    role: 'admin',
  },
} as const;

const MOCK_LOGIN_DISABLE_VERIFY_API_RESPONSE_INVALID = {
  message: 'رمز عبور وارد شده سختی کافی ندارد.',
  status: 'failed',
} as const;
// ------------------------Types----------------------------------------------
type MockNewPasswordApiStatus = 'ok' | 'failed';
type MockNewPasswordApiParams = {};

type MockNewPasswordApiRequestBody = {
  username: string;
  password: string;
  captcha: string;
};

type MockLoginVerifyDisableApiResponseBody = {
  access_token?: AccessToken;
  message: string;
  has2fA?: boolean;
  status: MockNewPasswordApiStatus;
  user?: {
    email: string;
    display_name: string;
    photo_url: string;
    role: string;
  };
};
type AccessToken = string;
// ------------------------Handlers----------------------------------------------

export const mockLoginVerifyDisable = http.post<
  MockNewPasswordApiParams,
  MockNewPasswordApiRequestBody,
  MockLoginVerifyDisableApiResponseBody
>(endpoints.auth.loginVerifyDisable, async ({ params, request }) => {
  const pageParams = new URLSearchParams(window.location.search);
  const scenario = pageParams.get('scenario') as unknown as CommonErrorScenarios;

  // -------------------- Error scenarios --------------------------------------
  const errorScenarios: ErrorScenarioConfig[] = [
    {
      scenario: 'error',
      response: MOCK_LOGIN_DISABLE_VERIFY_API_RESPONSE_INVALID,
      responseStatus: { status: 401, statusText: 'Unauthorized' },
    },
  ];

  const commonErrorResponse = handleCommonErrorScenarios(scenario, errorScenarios);

  if (commonErrorResponse !== null) {
    return commonErrorResponse;
  }

  // ----------------------Success scenarios-------------------------------------
  return HttpResponse.json(MOCK_LOGIN_DISABLE_VERIFY_API_RESPONSE_VALID);
});
