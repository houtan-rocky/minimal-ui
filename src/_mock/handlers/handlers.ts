/* eslint-disable import/no-extraneous-dependencies */

import { mockLogin } from './_login';
import { mockVerify } from './_verify';
import { mockRegister } from './_register';
import { mockSetNewPassword } from './_new-password';
import { mockForgetPassword } from './_forgetPassword';
import { mockVerifyRegister } from './_verify-register';

export const handlers = [
  mockLogin,
  mockForgetPassword,
  mockVerify,
  mockVerifyRegister,
  mockSetNewPassword,
  mockRegister,
];
