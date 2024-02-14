import { Helmet } from 'react-helmet-async';

import { useTranslate } from 'src/locales';

import { ModernNewPasswordView } from 'src/sections/auth';

// ----------------------------------------------------------------------

export default function NewPasswordPage() {
  const { t } = useTranslate();

  return (
    <>
      <Helmet>
        <title>
          {t('app_name')} - {t('new_password')}
        </title>
      </Helmet>

      <ModernNewPasswordView />
    </>
  );
}
