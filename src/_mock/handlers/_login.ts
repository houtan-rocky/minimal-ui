/* eslint-disable import/no-extraneous-dependencies */
import { http, HttpResponse } from 'msw';

import { endpoints } from 'src/utils/axios';

// ----------------------CONSTANTS------------------------------------------------
const MOCK_LOGIN_API_ACCESS_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE4OTM0NTYwMDAsInVzZXIiOiJleGFtcGxlX3VzZXIifQ.UywE7SiVKaTs93c1-yF1zPA8TjznF-l0VJoQ8IqU_hY';
export const REQUEST_VALID = {
  email: 'demo@minimals.cc',
  password: 'demo1234',
};
export const MOCK_LOGIN_API_REQUEST_INVALID = {
  email: '',
  password: '',
};
export const MOCK_LOGIN_API_RESPONSE_VALID = {
  access_token: MOCK_LOGIN_API_ACCESS_TOKEN,
  message: 'Logged In',
  user: {
    email: REQUEST_VALID.email,
    display_name: 'Demo User',
    photo_url: '/static/mock-images/avatars/avatar_default.jpg',
    role: 'admin',
  },
};
export const MOCK_LOGIN_API_RESPONSE_INVALID = {
  message: 'نام کاربری یا رمز عبور اشتباه است',
};
// ------------------------Types----------------------------------------------

type MockLoginApiParams = {};

type MockLoginApiRequestBody = {
  email: string;
  password: string;
};

type MockLoginApiResponseBody = {
  access_token?: MockLoginApiAccessToken;
  message: string;
  user?: {
    email: string;
    display_name: string;
    photo_url: string;
    role: string;
  };
};
type MockLoginApiAccessToken = string;

// ------------------------Handlers----------------------------------------------

export const mockLoginApi = http.post<
  MockLoginApiParams,
  MockLoginApiRequestBody,
  MockLoginApiResponseBody
>(endpoints.auth.login, async ({ params, request }) => {
  const { email, password } = await request.json();

  if (email !== REQUEST_VALID.email || password !== REQUEST_VALID.password) {
    return HttpResponse.json(MOCK_LOGIN_API_RESPONSE_INVALID, {
      status: 401,
      statusText: 'Unauthorized',
    });
  }

  return HttpResponse.json(MOCK_LOGIN_API_RESPONSE_VALID);
});
