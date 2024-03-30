import { Profiler } from 'react';
import { Helmet } from 'react-helmet-async';

import { useTranslate } from 'src/locales';

import { ModernLoginView } from 'src/sections/auth';

// ----------------------------------------------------------------------

export default function LoginPage() {
  const { t } = useTranslate();

  // Callback function that will receive profiling data
  const onRenderCallback = (
    id: string, // the "id" prop of the Profiler tree that has just committed
    phase: 'mount' | 'update' | 'nested-update', // either "mount" (if the tree just mounted) or "update" (if it re-rendered)
    actualDuration: number, // time spent rendering the committed update
    baseDuration: number, // estimated time to render the entire subtree without memoization
    startTime: number, // when React began rendering this update
    commitTime: number // when React committed this update
  ) => {
    console.log('Profiling data for login_page:', {
      id,
      phase,
      actualDuration,
      baseDuration,
      startTime,
      commitTime,
    });
  };

  return (
    <Profiler id="login_page_profiler" onRender={onRenderCallback}>
      <>
        <Helmet>
          <title>
            {t('app_name')} - {t('login')}
          </title>
        </Helmet>
        <ModernLoginView />
      </>
    </Profiler>
  );
}
