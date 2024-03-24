import { http, HttpResponse } from 'msw';

import { endpoints } from 'src/utils/axios';

/* eslint-disable import/no-extraneous-dependencies */

// ----------------------CONSTANTS------------------------------------------------
const ACCESS_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE4OTM0NTYwMDAsInVzZXIiOiJleGFtcGxlX3VzZXIifQ.UywE7SiVKaTs93c1-yF1zPA8TjznF-l0VJoQ8IqU_hY';

const REQUEST_VALID = {
  code: '1376',
} as const;

const RESPONSE_VALID = {
  status: 'ok',
  access_token: ACCESS_TOKEN,
  message: 'Logged In',
  user: {
    email: 'demo@minimals.cc',
    display_name: 'Demo User',
    photo_url: '/static/mock-images/avatars/avatar_default.jpg',
    role: 'admin',
  },
} as const;

const RESPONSE_INVALID = {
  message: 'کد درست نیست!',
  status: 'failed',
} as const;

// ------------------------Types----------------------------------------------
type Status = 'ok' | 'failed';
type Params = {
  code: string;
};

type RequestBody = {
  code: string;
};

type ResponseBody = {
  status: Status;
};

// ------------------------Handlers----------------------------------------------

export const mockVerifyRegister = http.post<Params, RequestBody, ResponseBody>(
  endpoints.auth.verifyRegister,
  async ({ params, request }) => {
    const { code } = await request.json();

    if (code !== REQUEST_VALID.code) {
      return HttpResponse.json(RESPONSE_INVALID, {
        status: 401,
        statusText: 'Unauthorized',
      });
    }

    return HttpResponse.json(RESPONSE_VALID);
  }
);
