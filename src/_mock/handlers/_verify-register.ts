import { http, HttpResponse } from 'msw';

import { endpoints } from 'src/utils/axios.util';

import {
  ErrorScenarioConfig,
  CommonErrorScenarios,
  handleCommonErrorScenarios,
} from './utils/handle-common-errors.util';

/* eslint-disable import/no-extraneous-dependencies */

// ----------------------CONSTANTS------------------------------------------------
const MOCK_VERIFY_REGISTER_API_ACCESS_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE4OTM0NTYwMDAsInVzZXIiOiJleGFtcGxlX3VzZXIifQ.UywE7SiVKaTs93c1-yF1zPA8TjznF-l0VJoQ8IqU_hY';

// const MOCK_VERIFY_REGISTER_API_REQUEST_VALID = {
//   code: '1376',
// } as const;

const MOCK_VERIFY_REGISTER_API_RESPONSE_VALID = {
  status: 'ok',
  access_token: MOCK_VERIFY_REGISTER_API_ACCESS_TOKEN,
  message: 'Logged In',
  user: {
    email: 'demo@minimals.cc',
    display_name: 'Demo User',
    photo_url: '/static/mock-images/avatars/avatar_default.jpg',
    role: 'admin',
  },
} as const;

const MOCK_VERIFY_REGISTER_API_RESPONSE_INVALID = {
  message: 'کد درست نیست!',
  status: 'failed',
} as const;

// ------------------------Types----------------------------------------------
type MockVerifyRegisterApiStatus = 'ok' | 'failed';
type MockVerifyRegisterApiParams = {
  code: string;
};

type MockVerifyRegisterApiRequestBody = {
  code: string;
};

type MockVerifyRegisterApiResponseBody = {
  status: MockVerifyRegisterApiStatus;
};

// ------------------------Handlers----------------------------------------------

export const mockVerifyRegisterApi = http.post<
  MockVerifyRegisterApiParams,
  MockVerifyRegisterApiRequestBody,
  MockVerifyRegisterApiResponseBody
>(endpoints.auth.verifyRegister, async ({ params, request }) => {
  const pageParams = new URLSearchParams(window.location.search);
  const scenario = pageParams.get('scenario') as unknown as CommonErrorScenarios;

  // -------------------- Error scenarios --------------------------------------
  const errorScenarios: ErrorScenarioConfig[] = [
    {
      scenario: 'error',
      response: MOCK_VERIFY_REGISTER_API_RESPONSE_INVALID,
      responseStatus: { status: 401, statusText: 'Unauthorized' },
    },
  ];

  const commonErrorResponse = handleCommonErrorScenarios(scenario, errorScenarios);

  if (commonErrorResponse !== null) {
    return commonErrorResponse;
  }

  // ----------------------Success scenarios-------------------------------------
  return HttpResponse.json(MOCK_VERIFY_REGISTER_API_RESPONSE_VALID);
});
