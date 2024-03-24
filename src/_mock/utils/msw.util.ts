/* eslint-disable consistent-return */
/* eslint-disable import/no-extraneous-dependencies */

// Browser integration
export async function enableMockingServiceWorker() {
  if (process.env.NODE_ENV !== 'development') {
    return;
  }

  const { worker } = await import('src/_mock/servers/browser');

  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  return worker.start({
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
