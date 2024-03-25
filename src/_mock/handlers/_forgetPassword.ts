/* eslint-disable import/no-extraneous-dependencies */
import { http, HttpResponse } from 'msw';

import { endpoints } from 'src/utils/axios';

// ----------------------CONSTANTS------------------------------------------------
const REQUEST_VALID = {
  national_code: '1234567890',
  mobile_number: '09123456789',
} as const;

const RESPONSE_VALID = {
  message: 'کد بازیابی به شماره موبایل شما ارسال شد',
  status: 'ok',
} as const;
const RESPONSE_INVALID = {
  message: 'کد ملی با شماره موبایل مطابقت ندارد',
  status: 'failed',
} as const;
// ------------------------Types----------------------------------------------
type Status = 'ok' | 'failed';
type Params = {
  national_code: string;
  mobile_number: string;
};

type RequestBody = {
  national_code: string;
  mobile_number: string;
};

type ResponseBody = {
  message: string;
  status: Status;
};

// ------------------------Handlers----------------------------------------------

export const mockForgetPassword = http.post<Params, RequestBody, ResponseBody>(
  endpoints.auth.forgetPassword,
  async ({ params, request }) => {
    const { national_code, mobile_number } = await request.json();

    if (
      national_code !== REQUEST_VALID.national_code ||
      mobile_number !== REQUEST_VALID.mobile_number
    ) {
      return HttpResponse.json(RESPONSE_INVALID, {
        status: 401,
        statusText: 'Unauthorized',
      });
    }

    return HttpResponse.json(RESPONSE_VALID);
  }
);
