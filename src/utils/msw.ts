/* eslint-disable import/no-extraneous-dependencies */

import { server } from 'src/_mock/handlers/server';

// Browser integration
export async function enableMockingServiceWorker() {
  if (process.env.NODE_ENV !== 'development') {
    return;
  }

  const { worker } = await import('src/_mock/handlers/browser');

  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  await worker.start({
    onUnhandledRequest: 'warn',
    serviceWorker: {
      url: '/mockServiceWorker.js',
    },
    findWorker(scriptUrl, mockServiceWorkerUrl) {
      if (scriptUrl.includes(mockServiceWorkerUrl)) {
        return true;
      }
      return false;
    },
  });
}

// Server integration
/* eslint-disable import/no-extraneous-dependencies */
export async function enableMockingServer() {
  if (process.env.NODE_ENV !== 'development') {
    return;
  }

  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  server.listen({
    onUnhandledRequest: 'warn',
  });
}
