import axiosInstance, { endpoints } from 'src/utils/axios.util';

// ----------------------------------------------------------------------

export async function LoginVerifyDisableApi(username: string, password: string, captcha: string) {
  const response = await axiosInstance.post(endpoints.auth.loginVerifyDisable, {
    username,
    password,
    captcha,
  });
  const { access_token: accessToken, user, mobile_number, status } = response.data;

  return {
    accessToken: accessToken || '',
    user,
    status,
    mobile_number,
  };
}
