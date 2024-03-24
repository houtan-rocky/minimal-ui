/* eslint-disable import/no-extraneous-dependencies */
import { http, HttpResponse } from 'msw';

import { endpoints } from 'src/utils/axios';

// ----------------------CONSTANTS------------------------------------------------
const ACCESS_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE4OTM0NTYwMDAsInVzZXIiOiJleGFtcGxlX3VzZXIifQ.UywE7SiVKaTs93c1-yF1zPA8TjznF-l0VJoQ8IqU_hY';
const REQUEST_VALID_STEP_1 = {
  national_code: '1234567890',
  mobile_number: '09123456789',
};
const RESPONSE_VALID = {
  access_token: ACCESS_TOKEN,
  message: 'کد بازیابی به شماره موبایل شما ارسال شد',
};
const RESPONSE_INVALID_STEP_1 = {
  message: 'کد ملی با شماره موبایل مطابقت ندارد',
};

// ------------------------Types----------------------------------------------

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
};

// ------------------------Handlers----------------------------------------------

export const mockForgetPassword = http.post<Params, RequestBody, ResponseBody>(
  endpoints.auth.forgetPassword,
  async ({ params, request }) => {
    const { national_code, mobile_number } = await request.json();

    if (
      national_code !== REQUEST_VALID_STEP_1.national_code ||
      mobile_number !== REQUEST_VALID_STEP_1.mobile_number
    ) {
      return HttpResponse.json(RESPONSE_INVALID_STEP_1, {
        status: 401,
        statusText: 'Unauthorized',
      });
    }

    return HttpResponse.json(RESPONSE_VALID);
  }
);
