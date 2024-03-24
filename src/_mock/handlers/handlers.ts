/* eslint-disable import/no-extraneous-dependencies */

import { mockLogin } from './_login';
import { mockVerify } from './_verify';
import { mockSetNewPassword } from './_newPassword';
import { mockForgetPassword } from './_forgetPassword';

export const handlers = [mockLogin, mockForgetPassword, mockVerify, mockSetNewPassword];
