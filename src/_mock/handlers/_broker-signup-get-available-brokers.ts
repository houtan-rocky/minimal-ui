import { http, HttpResponse } from 'msw';

import { endpoints } from 'src/utils/axios.util';

import {
  ErrorScenarioConfig,
  CommonErrorScenarios,
  handleCommonErrorScenarios,
} from './utils/handle-common-errors.util';

/* eslint-disable import/no-extraneous-dependencies */

// ----------------------CONSTANTS------------------------------------------------
// const MOCK_GET_AVAILABLE_BROKERS_API_REQUEST_VALID = {
//   userId: '1234567890',
// } as const;

const MOCK_GET_AVAILABLE_BROKERS_API_RESPONSE_VALID = {
  status: 'ok',
  brokers: [
    {
      id: 'broker_agah',
      name: 'آگاه',
      image_src: '/_mock/agah-icon.logo.svg',
      is_active: false,
      link: 'https://ex.agah.com/login',
    },
    {
      id: 'broker_mofid',
      name: 'مفید',
      image_src: '/_mock/hafez-icon.logo.svg',
      is_active: false,
      link: 'https://account.emofid.com/Register',
    },
    {
      id: 'broker_hafez',
      name: 'حافظ',
      image_src: '/_mock/mofid-icon.logo.svg',
      is_active: false,
      link: 'https://customer.hafezbroker.ir/',
    },
  ] as const,
} as const;
const MOCK_GET_AVAILABLE_BROKERS_API_RESPONSE_INVALID = {
  message: 'Invalid user ID',
  status: 'failed',
} as const;
// ------------------------Types----------------------------------------------
type MockGetAvailableBrokersApiStatus = 'ok' | 'failed';
type MockGetAvailableBrokersApiParams = {
  userId: string;
};

type GetAvailableBrokersRequestApiParams = {
  userId: string;
};

type GetAvailableBrokersResponseApiBody = {
  brokers?: readonly {
    id: string;
    name: string;
  }[];
  status: MockGetAvailableBrokersApiStatus;
};

// ------------------------Handlers----------------------------------------------

export const mockGetAvailableBrokersApi = http.get<
  MockGetAvailableBrokersApiParams,
  GetAvailableBrokersRequestApiParams,
  GetAvailableBrokersResponseApiBody
>(endpoints.users.getAvailableBrokers(), async ({ params }) => {
  const pageParams = new URLSearchParams(window.location.search);
  const scenario = pageParams.get('scenario') as unknown as CommonErrorScenarios;

  // -------------------- Error scenarios --------------------------------------
  const errorScenarios: ErrorScenarioConfig[] = [
    {
      scenario: 'error',
      response: MOCK_GET_AVAILABLE_BROKERS_API_RESPONSE_INVALID,
      responseStatus: { status: 401, statusText: 'Unauthorized' },
    },
  ];

  const commonErrorResponse = handleCommonErrorScenarios(scenario, errorScenarios);

  if (commonErrorResponse !== null) {
    return commonErrorResponse;
  }

  // ----------------------Success scenarios-------------------------------------
  return HttpResponse.json(MOCK_GET_AVAILABLE_BROKERS_API_RESPONSE_VALID);
});
