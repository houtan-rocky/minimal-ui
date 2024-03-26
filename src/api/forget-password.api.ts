import axios, { endpoints } from 'src/utils/axios.util';

// ----------------------------------------------------------------------

export async function forgetPasswordApi(national_code: string, mobile_number: string) {
  const response = await axios.post(endpoints.auth.forgetPassword, {
    national_code,
    mobile_number,
  });
  const { data } = response;

  return data;
}
