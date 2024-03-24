/* eslint-disable import/no-extraneous-dependencies */

import { mockLogin } from './_login';
import { mockForgetPassword } from './_forgetPassword-step-1';

export const handlers = [mockLogin, mockForgetPassword];
