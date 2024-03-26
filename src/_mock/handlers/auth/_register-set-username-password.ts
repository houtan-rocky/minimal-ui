/* eslint-disable import/no-extraneous-dependencies */
import { http, HttpResponse } from 'msw';

import { endpoints } from 'src/utils/axios.util';

import {
  ErrorScenarioConfig,
  CommonErrorScenarios,
  handleCommonErrorScenarios,
} from '../utils/handle-common-errors.util';

// ----------------------CONSTANTS------------------------------------------------
const MOCK_SET_USERNAME_PASSWORD_API_RESPONSE_VALID = {
  message: 'رمز عبور شما بازنشانی شد.',
  status: 'ok',
} as const;
const MOCK_SET_USERNAME_PASSWORD_API_RESPONSE_INVALID = {
  message: 'رمز عبور وارد شده سختی کافی ندارد.',
  status: 'failed',
} as const;
// ------------------------Types----------------------------------------------
type MockSetUsernamePasswordApiStatus = 'ok' | 'failed';
type MockSetUsernamePasswordApiParams = {
  national_code: string;
  mobile_number: string;
};

type MockSetUsernamePasswordApiRequestBody = {
  password: string;
  confirm_password: string;
};

type MockSetUsernamePasswordApiResponseBody = {
  message: string;
  status: MockSetUsernamePasswordApiStatus;
};

// ------------------------Handlers----------------------------------------------

export const mockRegisterSetUsernamePasswordApi = http.post<
  MockSetUsernamePasswordApiParams,
  MockSetUsernamePasswordApiRequestBody,
  MockSetUsernamePasswordApiResponseBody
>(endpoints.auth.registerSetUsernamePassword, async ({ params, request }) => {
  const pageParams = new URLSearchParams(window.location.search);
  const scenario = pageParams.get('scenario') as unknown as CommonErrorScenarios;

  // -------------------- Error scenarios --------------------------------------
  const errorScenarios: ErrorScenarioConfig[] = [
    {
      scenario: 'error',
      response: MOCK_SET_USERNAME_PASSWORD_API_RESPONSE_INVALID,
      responseStatus: { status: 401, statusText: 'Unauthorized' },
    },
  ];

  const commonErrorResponse = handleCommonErrorScenarios(scenario, errorScenarios);

  if (commonErrorResponse !== null) {
    return commonErrorResponse;
  }

  // ----------------------Success scenarios-------------------------------------
  return HttpResponse.json(MOCK_SET_USERNAME_PASSWORD_API_RESPONSE_VALID);
});
