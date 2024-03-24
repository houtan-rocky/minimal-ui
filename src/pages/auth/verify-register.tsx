import { Helmet } from 'react-helmet-async';

import { useTranslate } from 'src/locales';

import ModernVerifyRegisterView from 'src/sections/auth/modern-verify-register';

// ----------------------------------------------------------------------

export default function VerifyRegisterPage() {
  const { t } = useTranslate();

  return (
    <>
      <Helmet>
        <title>
          {t('app_name')} - {t('verify')}
        </title>
      </Helmet>

      <ModernVerifyRegisterView />
    </>
  );
}
