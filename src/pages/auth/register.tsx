import { Helmet } from 'react-helmet-async';

import { useTranslate } from 'src/locales';

import { ModernRegisterView } from 'src/sections/auth';

// ----------------------------------------------------------------------

export default function RegisterPage() {
  const { t } = useTranslate();

  return (
    <>
      <Helmet>
        <title>
          {t('app_name')} - {t('register')}
        </title>
      </Helmet>

      <ModernRegisterView />
    </>
  );
}
