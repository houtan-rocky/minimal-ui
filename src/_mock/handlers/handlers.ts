/* eslint-disable import/no-extraneous-dependencies */

import { mockLoginApi } from './_login';
import { mockVerifyApi } from './_verify';
import { mockRegisterApi } from './_register';
import { mockSetNewPasswordApi } from './_new-password';
import { mockForgetPasswordApi } from './_forgetPassword';
import { mockVerifyRegisterApi } from './_verify-register';

export const handlers = [
  mockLoginApi,
  mockForgetPasswordApi,
  mockVerifyApi,
  mockVerifyRegisterApi,
  mockSetNewPasswordApi,
  mockRegisterApi,
];
