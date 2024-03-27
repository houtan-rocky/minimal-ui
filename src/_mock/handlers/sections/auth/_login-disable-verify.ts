/* eslint-disable import/no-extraneous-dependencies */
import { http, HttpResponse } from 'msw';

import { endpoints } from 'src/utils/axios.util';

import {
  ErrorScenarioConfig,
  CommonErrorScenarios,
  handleCommonErrorScenarios,
} from '../../utils/handle-common-errors.util';

// ----------------------CONSTANTS------------------------------------------------
const MOCK_LOGIN_DISABLE_VERIFY_API_RESPONSE_VALID = {
  message: 'رمز عبور شما بازنشانی شد.',
  status: 'ok',
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

type MockNewPasswordApiResponseBody = {
  message: string;
  status: MockNewPasswordApiStatus;
};

// ------------------------Handlers----------------------------------------------

export const mockLoginDisableVerify = http.post<
  MockNewPasswordApiParams,
  MockNewPasswordApiRequestBody,
  MockNewPasswordApiResponseBody
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
