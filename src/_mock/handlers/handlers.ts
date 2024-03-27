/* eslint-disable import/no-extraneous-dependencies */

import { mockLoginApi } from './sections/auth/_login';
import { mockVerifyApi } from './sections/auth/_verify';
import { mockRegisterApi } from './sections/auth/_register';
import { mockVerifyLoginApi } from './sections/auth/_verify-login';
import { mockSetNewPasswordApi } from './sections/auth/_new-password';
import { mockForgetPasswordApi } from './sections/auth/_forgetPassword';
import { mockVerifyRegisterApi } from './sections/auth/_verify-register';
import { mockLoginVerifyDisable } from './sections/auth/_login-verify-disable';
import { mockGetActiveBrokersApi } from './sections/auth/_broker-select-get-user-active-brokers';
import { mockGetAvailableBrokersApi } from './sections/auth/_broker-signup-get-available-brokers';
import { mockRegisterSetUsernamePasswordApi } from './sections/auth/_register-set-username-password';

export const handlers = [
  mockGetActiveBrokersApi,
  mockGetAvailableBrokersApi,
  mockLoginApi,
  mockLoginVerifyDisable,
  mockForgetPasswordApi,
  mockVerifyApi,
  mockVerifyLoginApi,
  mockRegisterSetUsernamePasswordApi,
  mockVerifyRegisterApi,
  mockSetNewPasswordApi,
  mockRegisterApi,
];
