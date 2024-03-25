import { Profiler } from 'react';
import { Helmet } from 'react-helmet-async';

import { useTranslate } from 'src/locales';

import { ModernRegisterView } from 'src/sections/auth';

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
  console.log('Profiling data for register_page:', {
    id,
    phase,
    actualDuration,
    baseDuration,
    startTime,
    commitTime,
    interactions,
  });
};

export default function RegisterPage() {
  const { t } = useTranslate();

  return (
    <Profiler id="register_page_profiler" onRender={onRenderCallback}>
      <>
        <Helmet>
          <title>
            {t('app_name')} - {t('register')}
          </title>
        </Helmet>

        <ModernRegisterView />
      </>
    </Profiler>
  );
}
