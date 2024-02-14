import { Helmet } from 'react-helmet-async';

import { useTranslate } from 'src/locales';

import { ModernLoginView } from 'src/sections/auth';

// ----------------------------------------------------------------------

export default function LoginPage() {
  const { t } = useTranslate();

  return (
    <>
      <Helmet>
        <title>
          {t('app_name')} - {t('login')}
        </title>
      </Helmet>

      <ModernLoginView />
    </>
  );
}
