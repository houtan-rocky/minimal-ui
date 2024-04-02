import { Helmet } from 'react-helmet-async';

import { useTranslate } from 'src/locales';

import MemberHomeView from 'src/sections/member/home/view/home.view';

// ----------------------------------------------------------------------

export default function HomePage() {
  const { t } = useTranslate();
  return (
    <>
      <Helmet>
        <title>
          {t('app_name')} - {t('home')}
        </title>
      </Helmet>

      <MemberHomeView />
    </>
  );
}
