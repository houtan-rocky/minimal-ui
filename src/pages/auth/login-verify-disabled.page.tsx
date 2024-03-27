import { Profiler } from 'react';
import { Helmet } from 'react-helmet-async';

import { useTranslate } from 'src/locales';

import ModernLoginDisableVerifyView from 'src/sections/auth/modern-login-disable-verify.view';

// ----------------------------------------------------------------------
const onRenderCallback = (
  id: string,
  phase: 'mount' | 'update' | 'nested-update',
  actualDuration: number,
  baseDuration: number,
  startTime: number,
  commitTime: number,
  interactions: any
  // interactions: Set<React.ProfilerInteraction> // the Set of interactions belonging to this update
) => {
  console.log('Profiling data for verify_login_page:', {
    id,
    phase,
    actualDuration,
    baseDuration,
    startTime,
    commitTime,
    interactions,
  });
};

export default function LoginVerifyDisabledPage() {
  const { t } = useTranslate();

  return (
    <Profiler id="verify_login_page_profiler" onRender={onRenderCallback}>
      <>
        <Helmet>
          <title>
            {t('app_name')} - {t('verify')}
          </title>
        </Helmet>

        <ModernLoginDisableVerifyView />
      </>
    </Profiler>
  );
}
