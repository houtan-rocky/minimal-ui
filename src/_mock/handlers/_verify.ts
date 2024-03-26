import { http, HttpResponse } from 'msw';

import { endpoints } from 'src/utils/axios.util';

import {
  ErrorScenarioConfig,
  CommonErrorScenarios,
  handleCommonErrorScenarios,
} from './utils/handle-common-errors.util';

/* eslint-disable import/no-extraneous-dependencies */

// ----------------------CONSTANTS------------------------------------------------
// const MOCK_VERIFY_API_REQUEST_VALID = {
//   code: '1376',
// } as const;

const MOCK_VERIFY_API_RESPONSE_VALID = {
  status: 'ok',
} as const;

const MOCK_VERIFY_API_RESPONSE_INVALID = {
  message: 'کد درست نیست!',
  status: 'failed',
} as const;

// ------------------------Types----------------------------------------------
type MockVerifyApiStatus = 'ok' | 'failed';
type VerifyParams = {
  code: string;
};

type MockVerifyApiRequestBody = {
  code: string;
};

type MockVerifyApiResponseBody = {
  status: MockVerifyApiStatus;
};

// ------------------------Handlers----------------------------------------------

export const mockVerifyApi = http.post<
  VerifyParams,
  MockVerifyApiRequestBody,
  MockVerifyApiResponseBody
>(endpoints.auth.verify, async ({ params, request }) => {
  const pageParams = new URLSearchParams(window.location.search);
  const scenario = pageParams.get('scenario') as unknown as CommonErrorScenarios;

  // -------------------- Error scenarios --------------------------------------
  const errorScenarios: ErrorScenarioConfig[] = [
    {
      scenario: 'error',
      response: MOCK_VERIFY_API_RESPONSE_INVALID, // Specific mock response for this error
      responseStatus: { status: 401, statusText: 'Unauthorized' },
    },
  ];

  const commonErrorResponse = handleCommonErrorScenarios(scenario, errorScenarios);

  if (commonErrorResponse !== null) {
    return commonErrorResponse;
  }

  // ----------------------Success scenarios-------------------------------------
  return HttpResponse.json(MOCK_VERIFY_API_RESPONSE_VALID);
});
