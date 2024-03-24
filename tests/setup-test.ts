/* eslint-disable import/no-extraneous-dependencies */
import { afterAll, afterEach, beforeAll } from 'vitest';

import { server } from '../src/_mock/handlers/server';

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});

server.events.on('request:start', ({ request }) => {
  console.log('MSW intercepted:', request.method, request.url);
});
