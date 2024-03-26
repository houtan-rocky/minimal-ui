import useSWR from 'swr';

import axios, { endpoints } from 'src/utils/axios.util';

// ----------------------------------------------------------------------

type IBroker = {
  id: string;
  name: string;
  image_src: string;
  is_active: boolean;
};
type IReturnTypeUseActiveBrokers = {
  data: { brokers: IBroker[] | undefined };
  isLoading: boolean;
  isError: boolean;
};
export function useActiveBrokers(userId: string): IReturnTypeUseActiveBrokers {
  const fetcher = async () => {
    const response = await axios.get(endpoints.users.getActiveBrokers(userId));
    const { data } = response;
    return data;
  };

  const { data, error } = useSWR(endpoints.users.getActiveBrokers, fetcher);

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
}
