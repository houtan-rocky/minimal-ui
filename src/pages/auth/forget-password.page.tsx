import { Profiler } from 'react';
import { Helmet } from 'react-helmet-async';

import { useTranslate } from 'src/locales';

import { ModernForgotPasswordView } from 'src/sections/auth/view';

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
  console.log('Profiling data for forgot_password_page:', {
    id,
    phase,
    actualDuration,
    baseDuration,
    startTime,
    commitTime,
    interactions,
  });
};

export default function ForgetPasswordPage() {
  const { t } = useTranslate();

  return (
    <Profiler id="forgot_password_page_profiler" onRender={onRenderCallback}>
      <>
        <Helmet>
          <title>
            {t('app_name')} - {t('forget_password')}
          </title>
        </Helmet>

        <ModernForgotPasswordView />
      </>
    </Profiler>
  );
}
