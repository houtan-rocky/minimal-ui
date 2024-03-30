import { Profiler } from 'react';
import { Helmet } from 'react-helmet-async';

import { useTranslate } from 'src/locales';

import ModernRegisterSetUsernamePasswordView from 'src/sections/auth/modern-register-set-username-password.view';

// ----------------------------------------------------------------------
const onRenderCallback = (
  id: string,
  phase: 'mount' | 'update' | 'nested-update',
  actualDuration: number,
  baseDuration: number,
  startTime: number,
  commitTime: number
) => {
  console.log('Profiling data for register_set_new_username_password:', {
    id,
    phase,
    actualDuration,
    baseDuration,
    startTime,
    commitTime,
  });
};
export default function RegisterSetUsernamePasswordPage() {
  const { t } = useTranslate();

  return (
    <Profiler id="register_set_new_username_password_page_profiler" onRender={onRenderCallback}>
      <>
        <Helmet>
          <title>
            {t('app_name')} - {t('register_set_new_username_password')}
          </title>
        </Helmet>

        <ModernRegisterSetUsernamePasswordView />
      </>
    </Profiler>
  );
}
