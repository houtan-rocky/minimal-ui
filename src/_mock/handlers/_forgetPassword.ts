/* eslint-disable import/no-extraneous-dependencies */
import { http, HttpResponse } from 'msw';

import { endpoints } from 'src/utils/axios.util';

// ----------------------CONSTANTS------------------------------------------------
const MOCK_FORGET_PASSWORD_API_REQUEST_VALID = {
  national_code: '1234567890',
  mobile_number: '09123456789',
} as const;

const MOCK_FORGET_PASSWORD_API_RESPONSE_VALID = {
  message: 'کد بازیابی به شماره موبایل شما ارسال شد',
  status: 'ok',
} as const;
const MOCK_FORGET_PASSWORD_API_RESPONSE_INVALID = {
  message: 'کد ملی با شماره موبایل مطابقت ندارد',
  status: 'failed',
} as const;
// ------------------------Types----------------------------------------------
type MockForgetPasswordApiStatus = 'ok' | 'failed';
type MockForgetPasswordApiParams = {
  national_code: string;
  mobile_number: string;
};

type ForgetPasswordRequestApiBody = {
  national_code: string;
  mobile_number: string;
};

type ForgetPasswordResponseApiBody = {
  message: string;
  status: MockForgetPasswordApiStatus;
};

// ------------------------Handlers----------------------------------------------

export const mockForgetPasswordApi = http.post<
  MockForgetPasswordApiParams,
  ForgetPasswordRequestApiBody,
  ForgetPasswordResponseApiBody
>(endpoints.auth.forgetPassword, async ({ params, request }) => {
  const { national_code, mobile_number } = await request.json();

  if (
    national_code !== MOCK_FORGET_PASSWORD_API_REQUEST_VALID.national_code ||
    mobile_number !== MOCK_FORGET_PASSWORD_API_REQUEST_VALID.mobile_number
  ) {
    return HttpResponse.json(MOCK_FORGET_PASSWORD_API_RESPONSE_INVALID, {
      status: 401,
      statusText: 'Unauthorized',
    });
  }

  return HttpResponse.json(MOCK_FORGET_PASSWORD_API_RESPONSE_VALID);
});
