/* eslint-disable no-restricted-syntax */
import { HttpResponse } from 'msw';

export type ErrorScenarioConfig = {
  scenario: string;
  response: any;
  responseStatus: {
    status: number;
    statusText: string;
  };
};

export type CommonErrorScenarios =
  | 'network_error'
  | 'error'
  | 'invalid'
  | 'valid'
  | 'not_found'
  | 'unauthorized';

export type CommonScenarios = 'has2fa' | 'has2fa_phone_number' | CommonErrorScenarios;

/**
 * Handle common error scenarios in mock APIs.
 * @param {CommonErrorScenarios} currentScenario Current scenario to match.
 * @param {ErrorScenarioConfig[]}  scenarios Error scenarios to match.
 * @returns {any}
 */
export function handleCommonErrorScenarios(
  currentScenario: CommonErrorScenarios,
  scenarios: ErrorScenarioConfig[]
): any {
  for (const { scenario, response, responseStatus } of scenarios) {
    if (scenario === 'network_error') {
      return HttpResponse.error() as any;
    }

    if (currentScenario === scenario) {
      return HttpResponse.json(response, responseStatus);
    }
  }

  // Scenario not found, return null to indicate no error scenario was matched.
  return null;
}
