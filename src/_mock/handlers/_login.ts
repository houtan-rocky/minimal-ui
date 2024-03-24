/* eslint-disable import/no-extraneous-dependencies */
import { http, HttpResponse } from 'msw';

import { endpoints } from 'src/utils/axios';

// ----------------------CONSTANTS------------------------------------------------
const ACCESS_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE4OTM0NTYwMDAsInVzZXIiOiJleGFtcGxlX3VzZXIifQ.UywE7SiVKaTs93c1-yF1zPA8TjznF-l0VJoQ8IqU_hY';
const REQUEST_VALID = {
  email: 'demo@minimals.cc',
  password: 'demo1234',
};
const RESPONSE_VALID = {
  access_token: ACCESS_TOKEN,
  message: 'Logged In',
  user: {
    email: REQUEST_VALID.email,
    display_name: 'Demo User',
    photo_url: '/static/mock-images/avatars/avatar_default.jpg',
    role: 'admin',
  },
};
const RESPONSE_INVALID = {
  message: 'نام کاربری یا رمز عبور اشتباه است',
};
// ------------------------Types----------------------------------------------

type Params = {};

type RequestBody = {
  email: string;
  password: string;
};

type ResponseBody = {
  access_token: AccessToken;
  user: {
    email: string;
    display_name: string;
    photo_url: string;
    role: string;
  };
};
type AccessToken = string;

// ------------------------Handlers----------------------------------------------

export const mockLogin = http.post<Params, RequestBody, ResponseBody>(
  endpoints.auth.login,
  // @ts-ignore
  async ({ params, request }) => {
    const { email, password } = await request.json();

    if (email !== REQUEST_VALID.email || password !== REQUEST_VALID.password) {
      return HttpResponse.json(RESPONSE_INVALID, {
        status: 401,
        statusText: 'Unauthorized',
      });
    }

    return HttpResponse.json(RESPONSE_VALID);
  }
);
