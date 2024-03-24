/* eslint-disable import/no-extraneous-dependencies */
import { http, HttpResponse } from 'msw';
import { passwordStrength } from 'check-password-strength';

import { endpoints } from 'src/utils/axios';

// ----------------------CONSTANTS------------------------------------------------
const RESPONSE_VALID = {
  message: 'رمز عبور شما بازنشانی شد.',
  status: 'ok',
} as const;
const RESPONSE_INVALID = {
  message: 'رمز عبور باید حداقل ۸ کاراکتر و شامل حروف بزرگ و کوچک و عدد باشد.',
  status: 'failed',
} as const;
// ------------------------Types----------------------------------------------
type Status = 'ok' | 'failed';
type Params = {
  national_code: string;
  mobile_number: string;
};

type RequestBody = {
  password: string;
  confirm_password: string;
};

type ResponseBody = {
  message: string;
  status: Status;
};

// ------------------------Handlers----------------------------------------------

export const mockSetNewPassword = http.post<Params, RequestBody, ResponseBody>(
  endpoints.auth.newPassword,
  async ({ params, request }) => {
    const { password, confirm_password } = await request.json();

    const passwordData = passwordStrength(password);
    if (
      password !== confirm_password ||
      !passwordData.contains.includes('number') ||
      !passwordData.contains.includes('uppercase') ||
      !passwordData.contains.includes('lowercase') ||
      password.length < 8
    ) {
      return HttpResponse.json(RESPONSE_INVALID, {
        status: 401,
        statusText: 'Unauthorized',
      });
    }

    return HttpResponse.json(RESPONSE_VALID);
  }
);
