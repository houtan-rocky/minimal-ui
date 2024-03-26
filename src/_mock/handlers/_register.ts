/* eslint-disable import/no-extraneous-dependencies */
import { http, HttpResponse } from 'msw';

import { endpoints } from 'src/utils/axios.util';

// ----------------------CONSTANTS------------------------------------------------
const MOCK_REGISTER_API_REQUEST_VALID = {
  national_code: '1234567890',
  mobile_number: '09123456789',
  referrer_code: '123456',
} as const;

const MOCK_REGISTER_API_RESPONSE_VALID = {
  message: 'کد بازیابی به شماره موبایل شما ارسال شد',
  status: 'ok',
} as const;
const MOCK_REGISTER_API_RESPONSE_INVALID = {
  message: 'کد ملی با شماره موبایل مطابقت ندارد',
  status: 'failed',
} as const;
// ------------------------Types----------------------------------------------
type MockRegisterApiStatus = 'ok' | 'failed';
type MockRegisterApiParams = {
  national_code: string;
  mobile_number: string;
};

type MockRegisterApiRequestBody = {
  national_code: string;
  mobile_number: string;
  referrer_code: string;
};

type MockRegisterApiResponseBody = {
  message: string;
  status: MockRegisterApiStatus;
};

// ------------------------Handlers----------------------------------------------

export const mockRegisterApi = http.post<
  MockRegisterApiParams,
  MockRegisterApiRequestBody,
  MockRegisterApiResponseBody
>(endpoints.auth.register, async ({ params, request }) => {
  const { national_code, mobile_number, referrer_code } = await request.json();

  console.log(
    'national_code:',
    national_code,
    'mobile_number:',
    mobile_number,
    'referrer_code:',
    referrer_code,
    'slkdfjslkfa'
  );
  if (
    national_code !== MOCK_REGISTER_API_REQUEST_VALID.national_code ||
    mobile_number !== MOCK_REGISTER_API_REQUEST_VALID.mobile_number ||
    (referrer_code !== undefined && referrer_code !== MOCK_REGISTER_API_REQUEST_VALID.referrer_code)
  ) {
    return HttpResponse.json(MOCK_REGISTER_API_RESPONSE_INVALID, {
      status: 401,
      statusText: 'Unauthorized',
    });
  }

  return HttpResponse.json(MOCK_REGISTER_API_RESPONSE_VALID);
});
