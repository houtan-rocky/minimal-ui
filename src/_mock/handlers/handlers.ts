/* eslint-disable import/no-extraneous-dependencies */

import { mockLoginApi } from './auth/_login';
import { mockVerifyApi } from './auth/_verify';
import { mockRegisterApi } from './auth/_register';
import { mockVerifyLoginApi } from './auth/_verify-login';
import { mockSetNewPasswordApi } from './auth/_new-password';
import { mockForgetPasswordApi } from './auth/_forgetPassword';
import { mockVerifyRegisterApi } from './auth/_verify-register';
import { mockGetActiveBrokersApi } from './auth/_broker-select-get-user-active-brokers';
import { mockGetAvailableBrokersApi } from './auth/_broker-signup-get-available-brokers';
import { mockRegisterSetUsernamePasswordApi } from './auth/_register-set-username-password';

export const handlers = [
  mockGetActiveBrokersApi,
  mockGetAvailableBrokersApi,
  mockLoginApi,
  mockForgetPasswordApi,
  mockVerifyApi,
  mockVerifyLoginApi,
  mockRegisterSetUsernamePasswordApi,
  mockVerifyRegisterApi,
  mockSetNewPasswordApi,
  mockRegisterApi,
];
