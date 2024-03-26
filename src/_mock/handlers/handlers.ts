/* eslint-disable import/no-extraneous-dependencies */

import { mockLoginApi } from './_login';
import { mockVerifyApi } from './_verify';
import { mockRegisterApi } from './_register';
import { mockVerifyLoginApi } from './_verify-login';
import { mockSetNewPasswordApi } from './_new-password';
import { mockForgetPasswordApi } from './_forgetPassword';
import { mockVerifyRegisterApi } from './_verify-register';
import { mockGetActiveBrokersApi } from './_broker-select-get-user-active-brokers';
import { mockGetAvailableBrokersApi } from './_broker-signup-get-available-brokers';
import { mockRegisterSetUsernamePasswordApi } from './_register-set-username-password';

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
