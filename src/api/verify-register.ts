import axios, { endpoints } from 'src/utils/axios.util';

// ----------------------------------------------------------------------

export async function verifyRegister(code: string) {
  const response = await axios.post(endpoints.auth.verifyRegister, { code });
  const { message, status, user, access_token: accessToken } = response.data;
  return { message, status, user, accessToken };
}
