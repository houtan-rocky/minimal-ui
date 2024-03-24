import { http, HttpResponse } from 'msw';

import { endpoints } from 'src/utils/axios';

/* eslint-disable import/no-extraneous-dependencies */

// ----------------------CONSTANTS------------------------------------------------
const REQUEST_VALID = {
  code: '1376',
} as const;

const RESPONSE_VALID = {
  status: 'ok',
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

export const mockVerify = http.post<Params, RequestBody, ResponseBody>(
  endpoints.auth.verify,
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
