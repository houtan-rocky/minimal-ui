import axiosInstance, { endpoints } from 'src/utils/axios.util';

// ----------------------------------------------------------------------

export async function registerSetUsernamePasswordApi(
  username: string,
  password: string,
  confirm_password: string
) {
  const response = await axiosInstance.post(endpoints.auth.newPassword, {
    username,
    password,
    confirm_password,
  });
  const { message, status } = response.data;

  return { message, status };
}
