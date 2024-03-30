import { Profiler } from 'react';
import { Helmet } from 'react-helmet-async';

import { useTranslate } from 'src/locales';

import { ModernVerifyLoginView } from 'src/sections/auth';

// ----------------------------------------------------------------------
const onRenderCallback = (
  id: string,
  phase: 'mount' | 'update' | 'nested-update',
  actualDuration: number,
  baseDuration: number,
  startTime: number,
  commitTime: number
) => {
  console.log('Profiling data for verify_login_page:', {
    id,
    phase,
    actualDuration,
    baseDuration,
    startTime,
    commitTime,
  });
};

export default function VerifyLoginPage() {
  const { t } = useTranslate();

  return (
    <Profiler id="verify_login_page_profiler" onRender={onRenderCallback}>
      <>
        <Helmet>
          <title>
            {t('app_name')} - {t('verify')}
          </title>
        </Helmet>

        <ModernVerifyLoginView />
      </>
    </Profiler>
  );
}
