import axios, { endpoints } from 'src/utils/axios.util';

// ----------------------------------------------------------------------

export async function verifyApi(code: string) {
  const response = await axios.post(endpoints.auth.verify, { code });
  const { message, status } = response.data;

  return { message, status };
}
