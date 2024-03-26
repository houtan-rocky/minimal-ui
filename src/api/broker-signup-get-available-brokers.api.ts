import useSWR from 'swr';

import axios, { endpoints } from 'src/utils/axios.util';

// ----------------------------------------------------------------------

type IBroker = {
  id: string;
  name: string;
  image_src: string;
  is_active: boolean;
  link: string;
};
type IReturnType = {
  data: { brokers: IBroker[] | undefined };
  isLoading: boolean;
  isError: boolean;
};
export function useAvailableBrokers(userId?: string): IReturnType {
  const fetcher = async () => {
    const response = await axios.get(endpoints.users.getAvailableBrokers(userId));
    const { data } = response;
    return data;
  };

  const { data, error } = useSWR(endpoints.users.getAvailableBrokers, fetcher);

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
}
