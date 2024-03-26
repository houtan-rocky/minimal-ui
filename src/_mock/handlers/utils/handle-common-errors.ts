/* eslint-disable no-restricted-syntax */
import { HttpResponse } from 'msw';

export type ErrorScenarioConfig = {
  scenario: string;
  response: any; // Adjust this type according to your response structure
  responseStatus: {
    status: number;
    statusText: string;
  };
};

// Utility function to handle common error scenarios in mock APIs.
export function handleCommonErrorScenarios(
  currentScenario: string | null,
  scenarios: ErrorScenarioConfig[]
) {
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
