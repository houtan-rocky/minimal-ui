import { Profiler } from 'react';
import { Helmet } from 'react-helmet-async';

import { useTranslate } from 'src/locales';

import { ModernBrokerSignUp } from 'src/sections/auth';

// ----------------------------------------------------------------------
const onRenderCallback = (
  id: string,
  phase: 'mount' | 'update' | 'nested-update',
  actualDuration: number,
  baseDuration: number,
  startTime: number,
  commitTime: number
) => {
  console.log('Profiling data for broker_sign_up_page:', {
    id,
    phase,
    actualDuration,
    baseDuration,
    startTime,
    commitTime,
  });
};
export default function BrokerSignUpPage() {
  const { t } = useTranslate();

  return (
    <Profiler id="broker_sign_up_page_profiler" onRender={onRenderCallback}>
      <>
        <Helmet>
          <title>
            {t('app_name')} - {t('new_password')}
          </title>
        </Helmet>

        <ModernBrokerSignUp />
      </>
    </Profiler>
  );
}
