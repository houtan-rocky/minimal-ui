/* eslint-disable import/no-extraneous-dependencies */
import { http, HttpResponse } from 'msw';

import { endpoints } from 'src/utils/axios.util';

// ----------------------CONSTANTS------------------------------------------------
const MOCK_NEW_PASSWORD_API_RESPONSE_VALID = {
  message: 'رمز عبور شما بازنشانی شد.',
  status: 'ok',
} as const;
const MOCK_NEW_PASSWORD_API_RESPONSE_INVALID = {
  message: 'رمز عبور وارد شده سختی کافی ندارد.',
  status: 'failed',
} as const;
// ------------------------Types----------------------------------------------
type MockNewPasswordApiStatus = 'ok' | 'failed';
type MockNewPasswordApiParams = {
  national_code: string;
  mobile_number: string;
};

type MockNewPasswordApiRequestBody = {
  password: string;
  confirm_password: string;
};

type MockNewPasswordApiResponseBody = {
  message: string;
  status: MockNewPasswordApiStatus;
};

// ------------------------Handlers----------------------------------------------

export const mockSetNewPasswordApi = http.post<
  MockNewPasswordApiParams,
  MockNewPasswordApiRequestBody,
  MockNewPasswordApiResponseBody
>(endpoints.auth.newPassword, async ({ params, request }) => {
  const pageParams = new URLSearchParams(window.location.search);
  const scenario = pageParams.get('scenario');
  // const { password, confirm_password } = await request.json();

  // const passwordData = passwordStrength(password);
  if (scenario === 'error') {
    return HttpResponse.json(MOCK_NEW_PASSWORD_API_RESPONSE_INVALID, {
      status: 401,
      statusText: 'Unauthorized',
    });
  }

  return HttpResponse.json(MOCK_NEW_PASSWORD_API_RESPONSE_VALID);
});
