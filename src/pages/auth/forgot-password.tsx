import { Helmet } from 'react-helmet-async';

import { useTranslate } from 'src/locales';

import { ModernForgotPasswordView } from 'src/sections/auth';

// ----------------------------------------------------------------------

export default function ForgotPasswordPage() {
  const { t } = useTranslate();

  return (
    <>
      <Helmet>
        <title>
          {t('app_name')} - {t('forget_password')}
        </title>
      </Helmet>

      <ModernForgotPasswordView />
    </>
  );
}
