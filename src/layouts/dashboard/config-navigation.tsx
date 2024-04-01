import { useMemo } from 'react';

import { paths } from 'src/routes/paths.constant';

import { useTranslate } from 'src/locales';

import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
  // OR
  // <Iconify icon="fluent:mail-24-filled" />
  // https://icon-sets.iconify.design/solar/
  // https://www.streamlinehq.com/icons
);

const ICONS = {
  persons: icon('ic_persons'),
  transactions: icon('ic_transactions'),
  home: icon('ic_home'),
  job: icon('ic_job'),
  blog: icon('ic_blog'),
  chat: icon('ic_chat'),
  mail: icon('ic_mail'),
  user: icon('ic_user'),
  file: icon('ic_file'),
  lock: icon('ic_lock'),
  tour: icon('ic_tour'),
  order: icon('ic_order'),
  label: icon('ic_label'),
  blank: icon('ic_blank'),
  kanban: icon('ic_kanban'),
  folder: icon('ic_folder'),
  banking: icon('ic_banking'),
  booking: icon('ic_booking'),
  invoice: icon('ic_invoice'),
  product: icon('ic_product'),
  calendar: icon('ic_calendar'),
  disabled: icon('ic_disabled'),
  external: icon('ic_external'),
  menuItem: icon('ic_menu_item'),
  ecommerce: icon('ic_ecommerce'),
  analytics: icon('ic_analytics'),
  dashboard: icon('ic_dashboard'),
  support: icon('ic_support'),
};

// ----------------------------------------------------------------------

export function useNavData() {
  const { t } = useTranslate();

  const mainNavigation = useMemo(
    () => [
      {
        subheader: '',
        items: [
          {
            title: t('home'),
            path: paths.dashboard.root,
            icon: ICONS.home,
          },
          {
            title: t('score_records'),
            path: paths.dashboard.general.ecommerce,
            icon: ICONS.dashboard,
          },
          {
            title: t('credit'),
            path: paths.dashboard.general.analytics,
            icon: ICONS.banking,
          },
          {
            title: t('brokerages'),
            path: paths.dashboard.general.banking,
            icon: ICONS.job,
          },
          {
            title: t('transactions'),
            path: paths.dashboard.general.booking,
            icon: ICONS.transactions,
          },
          {
            title: t('performance_reports'),
            path: paths.dashboard.general.file,
            icon: ICONS.analytics,
          },
          {
            title: t('introduce_to_friends'),
            path: paths.dashboard.general.file,
            icon: ICONS.persons,
          },
        ],
      },
    ],
    [t]
  );

  const bottomNavigation = useMemo(
    () => [
      {
        subheader: '',
        items: [
          {
            title: t('support'),
            path: paths.dashboard.general.support,
            icon: ICONS.support,
          },
        ],
      },
    ],
    [t]
  );

  return { mainNavigation, bottomNavigation };
}
