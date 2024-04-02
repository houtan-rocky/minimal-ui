import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';

import { _appInvoices } from 'src/__mock';
import { useTranslate } from 'src/locales';
import { SeoIllustration } from 'src/assets/illustrations';

import { useSettingsContext } from 'src/components/settings';

import AppWelcome from '../app-welcome';
import AppNewInvoice from '../app-new-invoice';
import AppWidgetSummary from '../app-widget-summary';
import BankingCurrentBalance from '../../banking/banking-current-balance';

// ----------------------------------------------------------------------

export default function OverviewAppView() {
  const { t } = useTranslate();

  const theme = useTheme();

  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Grid container spacing={3}>
        <Grid xs={12} md={4}>
          Emtiaz etebare shoma
        </Grid>

        <Grid xs={12} md={8}>
          <AppWelcome
            title={t('home_page.welcome_title')}
            description={t('home_page.welcome_description')}
            img={<SeoIllustration />}
            action={
              <Button variant="contained" color="primary">
                {t('ask_for_credit')}
              </Button>
            }
          />
        </Grid>

        <Grid xs={12} lg={8}>
          <AppNewInvoice
            title={t('home_page.requests_records')}
            tableData={_appInvoices}
            tableLabels={[
              { id: 'id', label: t('home_page.request_type') },
              { id: 'date', label: t('date') },
              { id: 'time', label: t('hour') },
              { id: 'status', label: t('status') },
            ]}
          />
        </Grid>

        <Grid xs={12} lg={4}>
          <BankingCurrentBalance
            list={[
              {
                cardHolder: 'موجودی کل',
                balance: 1000000,
                cardNumber: '12345',
                cardType: 'visa',
                cardValid: '12/34',
                id: '1234',
              },
            ]}
          />
        </Grid>
        <Grid
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          gap={2}
          xs={12}
          md={4}
          columnSpacing={1}
        >
          <Grid xs={12} md={8}>
            <AppWidgetSummary
              title="Total Active Users"
              percent={2.6}
              total={18765}
              chart={{
                series: [5, 18, 12, 51, 68, 11, 39, 37, 27, 20],
              }}
            />
          </Grid>
          <Grid xs={12} md={4}>
            <AppWidgetSummary
              title="Total Installed"
              percent={0.2}
              total={4876}
              chart={{
                colors: [theme.palette.info.light, theme.palette.info.main],
                series: [20, 41, 63, 33, 28, 35, 50, 46, 11, 26],
              }}
            />
          </Grid>
          <Grid xs={12} md={4}>
            <AppWidgetSummary
              title="Total Downloads"
              percent={-0.1}
              total={678}
              chart={{
                colors: [theme.palette.warning.light, theme.palette.warning.main],
                series: [8, 9, 31, 8, 16, 37, 8, 33, 46, 31],
              }}
            />
          </Grid>
          GrB
        </Grid>
      </Grid>
    </Container>
  );
}
