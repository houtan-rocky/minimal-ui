import axios, { endpoints } from 'src/utils/axios.util';

// ----------------------------------------------------------------------

export async function loginApi(email: string, password: string) {
  const response = await axios.post(endpoints.auth.login, { email, password });
  const { access_token: accessToken, user, has2fa, mobile_number, time } = response.data;

  return {
    accessToken: accessToken || '',
    user,
    status: response.status,
    has2fa,
    mobile_number,
    time,
  };
}
