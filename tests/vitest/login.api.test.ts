/* eslint-disable import/no-extraneous-dependencies */
import { it, expect, describe } from 'vitest';

import { REQUEST_VALID, REQUEST_INVALID } from 'src/_mock/handlers/_login';

import { loginApi } from '../../src/api/login.api';

class LoginApiTest {
  static async testLoginWithValidCredentials() {
    const response = await loginApi(REQUEST_VALID.email, REQUEST_VALID.password);

    expect(response.status).toBe(200);
  }

  static async testLoginWithInvalidCredentials() {
    const response = await loginApi(REQUEST_INVALID.email, REQUEST_INVALID.password);

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
