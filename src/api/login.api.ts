import axios, { endpoints } from 'src/utils/axios.util';

// ----------------------------------------------------------------------

export async function loginApi(email: string, password: string) {
  const response = await axios.post(endpoints.auth.login, { email, password });
  const { access_token: accessToken, user } = response.data;

  return { accessToken, user, status: response.status };
}
