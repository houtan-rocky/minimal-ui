import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';

import { _appInvoices } from 'src/__mock';
import { useTranslate } from 'src/locales';
import { SeoIllustration } from 'src/assets/illustrations';

import { useSettingsContext } from 'src/components/settings';

import HomeWelcome from '../home-welcome.component';
import CreditScore from '../home-credit-score.component';
import HomeNewInvoice from '../home-new-invoice.component';
import HomeWidgetSummary from '../home-widget-summary.component';
import HomeSuggestedPackage from '../home-suggested-package.component';

// ----------------------------------------------------------------------

export default function OverviewAppView() {
  const { t } = useTranslate();

  const theme = useTheme();

  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Grid container spacing={3}>
        <Grid xs={12} md={4}>
          <CreditScore creditHistoryImageUrl="" creditScoreImageUrl="" />
        </Grid>

        <Grid display="flex" flexDirection="column" gap={2} xs={12} md={8}>
          <HomeWelcome
            title={t('home_page.welcome_title')}
            description={t('home_page.welcome_description')}
            img={<SeoIllustration />}
            action={
              <Button variant="contained" color="primary">
                {t('ask_for_credit')}
              </Button>
            }
          />

          <HomeSuggestedPackage
            list={[
              {
                refundDeadlineInDays: 3,
                balance: 1000000,
                cardNumber: '12345',
                cardType: 'visa',
                cardValid: '12/34',
                id: '1234',
              },
            ]}
          />
        </Grid>

        <Grid xs={12} lg={8}>
          <HomeNewInvoice
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

        <Grid
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          xs={12}
          md={4}
          columnSpacing={1}
        >
          <Grid xs={12} md={8}>
            <HomeWidgetSummary
              title={t('home_page.monthly_finance_charge')}
              percent={2.6}
              total={340_000_000}
              chart={{
                series: [5, 18, 12, 51, 68, 11, 39, 37, 27, 20],
              }}
            />
          </Grid>

          <Grid xs={12} md={4}>
            <HomeWidgetSummary
              title={t('home_page.monthly_transaction_sum')}
              percent={0.2}
              total={340_000_000}
              chart={{
                colors: [theme.palette.info.light, theme.palette.info.main],
                series: [20, 41, 63, 33, 28, 35, 50, 46, 11, 26],
              }}
            />
          </Grid>

          <Grid xs={12} md={4}>
            <HomeWidgetSummary
              title={t('home_page.guaranteed_value')}
              percent={-0.1}
              total={340_000_000}
              chart={{
                colors: [theme.palette.warning.light, theme.palette.warning.main],
                series: [8, 9, 31, 8, 16, 37, 8, 33, 46, 31],
              }}
            />
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
