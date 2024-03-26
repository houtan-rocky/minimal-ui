/* eslint-disable import/no-extraneous-dependencies */
import { it, expect, describe } from 'vitest';

import {
  MOCK_LOGIN_API_REQUEST_VALID,
  MOCK_LOGIN_API_REQUEST_INVALID,
} from 'src/_mock/handlers/sections/auth/_login';

import { loginApi } from '../../src/api/login.api';

class LoginApiTest {
  static async testLoginWithValidCredentials() {
    const response = await loginApi(
      MOCK_LOGIN_API_REQUEST_VALID.email,
      MOCK_LOGIN_API_REQUEST_VALID.password
    );

    expect(response.status).toBe(200);
  }

  static async testLoginWithInvalidCredentials() {
    const response = await loginApi(
      MOCK_LOGIN_API_REQUEST_INVALID.email,
      MOCK_LOGIN_API_REQUEST_INVALID.password
    );

    expect(response.status).toBe(401);
  }
}

describe.todo('LoginApiTest', () => {
  it('should login with valid credentials', async () => {
    await LoginApiTest.testLoginWithValidCredentials(); // Use await here
  });

  it('should not login with invalid credentials', async () => {
    await LoginApiTest.testLoginWithInvalidCredentials(); // Use await here
  });
});
