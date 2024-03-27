import axiosInstance, { endpoints } from 'src/utils/axios.util';

// ----------------------------------------------------------------------

export async function LoginVerifyDisable(username: string, password: string, captcha: string) {
  const response = await axiosInstance.post(endpoints.auth.loginVerifyDisable, {
    username,
    password,
    captcha,
  });
  const { message, status } = response.data;

  return { message, status };
}
