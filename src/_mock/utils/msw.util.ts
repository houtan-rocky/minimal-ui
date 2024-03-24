/* eslint-disable consistent-return */
/* eslint-disable import/no-extraneous-dependencies */

// Browser integration
export async function enableMockingServiceWorker() {
  const __DEV__ = process.env.NODE_ENV === 'development';
  if (!__DEV__) {
    return;
  }

  const { worker } = await import('src/_mock/servers/browser');

  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  // eslint-disable-next-line @typescript-eslint/return-await
  await new Promise((resolve) => {
    worker
      .start({
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
      })
      .then(() => setTimeout(resolve, 100));
  });
  // return await worker.start({
  //   onUnhandledRequest: 'warn',
  //   serviceWorker: {
  //     url: '/mockServiceWorker.js',
  //   },
  //   findWorker(scriptUrl, mockServiceWorkerUrl) {
  //     if (scriptUrl.includes(mockServiceWorkerUrl)) {
  //       return true;
  //     }
  //     return false;
  //   },
  // });
}
