import axios, { endpoints } from 'src/utils/axios.util';

// ----------------------------------------------------------------------

export async function verifyLoginApi(code: string) {
  const response = await axios.post(endpoints.auth.verifyLogin, { code });
  const { message, status, user, access_token: accessToken } = response.data;
  return { message, status, user, accessToken };
}
