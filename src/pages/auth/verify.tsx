import { Helmet } from 'react-helmet-async';

import { useTranslate } from 'src/locales';

import { ModernVerifyView } from 'src/sections/auth';

// ----------------------------------------------------------------------

export default function VerifyPage() {
  const { t } = useTranslate();

  return (
    <>
      <Helmet>
        <title>
          {t('app_name')} - {t('verify')}
        </title>
      </Helmet>

      <ModernVerifyView />
    </>
  );
}
