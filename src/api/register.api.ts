import axios, { endpoints } from 'src/utils/axios';

// ----------------------------------------------------------------------

export async function registerApi(
  national_code: string,
  mobile_number: string,
  referralCode: string
) {
  const response = await axios.post(endpoints.auth.register, {
    national_code,
    mobile_number,
    referral_code: referralCode,
  });
  const { data } = response;

  return data;
}
