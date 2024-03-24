import axiosInstance, { endpoints } from 'src/utils/axios';

// ----------------------------------------------------------------------

export async function setNewPasswordApi(password: string, confirm_password: string) {
  const response = await axiosInstance.post(endpoints.auth.newPassword, {
    password,
    confirm_password,
  });
  const { message, status } = response.data;

  return { message, status };
}
