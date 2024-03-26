import { Profiler } from 'react';
import { Helmet } from 'react-helmet-async';

import { useTranslate } from 'src/locales';

import { ModernBrokerSelectView } from 'src/sections/auth';

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
  console.log('Profiling data for broker_select_page:', {
    id,
    phase,
    actualDuration,
    baseDuration,
    startTime,
    commitTime,
    interactions,
  });
};
export default function BrokerSelectPage() {
  const { t } = useTranslate();

  return (
    <Profiler id="broker_select_page_profiler" onRender={onRenderCallback}>
      <>
        <Helmet>
          <title>
            {t('app_name')} - {t('new_password')}
          </title>
        </Helmet>

        <ModernBrokerSelectView />
      </>
    </Profiler>
  );
}
