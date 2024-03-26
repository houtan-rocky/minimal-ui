import { http, HttpResponse } from 'msw';

import { endpoints } from 'src/utils/axios.util';

/* eslint-disable import/no-extraneous-dependencies */

// ----------------------CONSTANTS------------------------------------------------
const MOCK_VERIFY_API_REQUEST_VALID = {
  code: '1376',
} as const;

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
  const { code } = await request.json();

  if (code !== MOCK_VERIFY_API_REQUEST_VALID.code) {
    return HttpResponse.json(MOCK_VERIFY_API_RESPONSE_INVALID, {
      status: 401,
      statusText: 'Unauthorized',
    });
  }

  return HttpResponse.json(MOCK_VERIFY_API_RESPONSE_VALID);
});
